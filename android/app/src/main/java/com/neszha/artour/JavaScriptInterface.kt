package com.neszha.artour

import android.content.ContentValues.TAG
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Environment
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.widget.Toast
import androidx.core.content.FileProvider
import androidx.credentials.CredentialManager
import androidx.credentials.GetCredentialRequest
import androidx.credentials.exceptions.GetCredentialException
import com.google.android.libraries.identity.googleid.GetGoogleIdOption
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.io.File
import java.io.FileOutputStream
import java.net.URL
import java.util.UUID

class JavaScriptInterface(
    private val context: Context,
    private val contextActivity: MainActivity,
    private val webView: WebView
) {

    /**
     * Initial trigger to activate all permission form main view.
     */
    @JavascriptInterface
    fun setupPermissions() {
        contextActivity.requestPermission("notification")
    }

    /**
     * Login google with oAuth2.
     */
    @JavascriptInterface
    fun loginWithGoogle(clientId: String) {
        val credentialManager = CredentialManager.create(context)

        // Create request options.
        val nonceId = UUID.randomUUID().toString()
        val googleIdOption: GetGoogleIdOption = GetGoogleIdOption.Builder()
            .setFilterByAuthorizedAccounts(false)
            .setServerClientId(clientId)
            .setAutoSelectEnabled(false)
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

    /**
     * Open link with external browser.
     */
    @JavascriptInterface
    fun openExternalLink(link: String) {
        val intent = Intent(Intent.ACTION_VIEW)
        intent.data = Uri.parse(link)
        context.startActivity(intent)
    }

    /**
     * Open share content
     */
    @JavascriptInterface
    fun openShareContent(textContent: String, imageCoverUrl: String) {
        // Download image.
        val input = URL(imageCoverUrl).openStream()
        val bitmap = BitmapFactory.decodeStream(input)

        // Save to local storage app.
        val imagesDir = File(context.getExternalFilesDir(Environment.DIRECTORY_PICTURES), "SharedImages")
        if (!imagesDir.exists()) {
            imagesDir.mkdirs()
        }
        val imageFile = File(imagesDir, "shared_image.jpg")
        val fos = FileOutputStream(imageFile)
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fos)
        fos.flush()
        fos.close()
        val fileUri = FileProvider.getUriForFile(context, "${context.packageName}.provider", imageFile)
        Log.i(TAG, fileUri.toString())

        // Create an intent to share content
        val intent = Intent(Intent.ACTION_SEND)
        intent.type = "text/plain"

        // Set the text content to share
        intent.putExtra(Intent.EXTRA_TEXT, textContent)

        // If there is an image URL, set it as an extra
        if (imageCoverUrl.isNotEmpty()) {
            intent.putExtra(Intent.EXTRA_STREAM, fileUri)
            intent.type = "image/*"
        }

        // Star activity.
        contextActivity.startActivity(Intent.createChooser(intent, "Share Place"))
    }

    /**
     * Show toast in android activity.
     */
    @JavascriptInterface
    fun showToast(message: String) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }

}