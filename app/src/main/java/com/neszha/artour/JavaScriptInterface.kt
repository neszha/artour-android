package com.neszha.artour

import android.content.ContentValues.TAG
import android.content.Context
import android.content.Intent
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.widget.Toast
import androidx.credentials.CredentialManager
import androidx.credentials.GetCredentialRequest
import androidx.credentials.exceptions.GetCredentialException
import com.google.android.libraries.identity.googleid.GetGoogleIdOption
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.util.UUID

class JavaScriptInterface(
    private val context: Context,
    private val contextActivity: MainActivity,
    private val webView: WebView
) {

    @JavascriptInterface
    fun setupPermissions() {
        contextActivity.requestPermission("notification")
    }

    @JavascriptInterface
    fun loginWithGoogle(clientId: String) {
        val credentialManager = CredentialManager.create(context)

        // Create request options.
        val nonceId = UUID.randomUUID().toString()
        val googleIdOption: GetGoogleIdOption = GetGoogleIdOption.Builder()
            .setFilterByAuthorizedAccounts(true)
            .setServerClientId(clientId)
            .setAutoSelectEnabled(true)
            .setNonce(nonceId)
            .build()

        // Make request credential.
        val request: GetCredentialRequest = GetCredentialRequest.Builder()
            .addCredentialOption(googleIdOption)
            .build()

        // Parsing and validate the request and result data.
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val result = credentialManager.getCredential(
                    request = request,
                    context = context,
                )
                val googleIdToken = GoogleIdTokenCredential
                    .createFrom(result.credential.data)
                    .idToken
                Log.i(TAG, "Google Token ID: $googleIdToken")
                webView.post {
                    webView.evaluateJavascript("window.authGoogleAndroidCallback('${googleIdToken}');") {}
                }
            } catch (e: GetCredentialException) {
                if (e.message != null) Log.e(TAG, e.message.toString())
                Toast.makeText(context, e.message, Toast.LENGTH_LONG).show()
                webView.post {
                    webView.evaluateJavascript("window.authGoogleAndroidCallback(null);") {}
                }
            }
        }
    }

    @JavascriptInterface
    fun showToast(message: String) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }

}