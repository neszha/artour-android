package com.neszha.artour

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.webkit.PermissionRequest
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.neszha.artour.ui.theme.ITentixTheme
import android.Manifest
import android.widget.Toast

class MainActivity : ComponentActivity() {
    private val REQUEST_CODE_POST_NOTIFICASSION = 102
    private val REQUEST_CODE_READ_STORAGE = 103
    private val REQUEST_CODE_WRITE_STORAGE = 104
    private val REQUEST_CODE_FILE_CHOOSER  = 2002
    private var fileChooserCallback: ValueCallback<Array<Uri>>? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Render content.
        val host: String = WebServer.Config.host
        val port: String = WebServer.Config.port.toString()
        val webViewUrl = "http://$host:$port/index.html#/main"
        setContent {
            ITentixTheme {
                Surface(
                    color = MaterialTheme.colorScheme.background,
                    modifier = Modifier
                        .fillMaxSize()
                ) {
                    WebViewScreen(webUrl = webViewUrl)
                }
            }
        }
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, intent)
        if (requestCode == REQUEST_CODE_FILE_CHOOSER) {
            if (resultCode == RESULT_OK) {
                data?.let { intent ->
                    val results = this.getSelectedFiles(intent)
                    fileChooserCallback?.onReceiveValue(results)
                    fileChooserCallback = null
                }
            }
            fileChooserCallback?.onReceiveValue(null)
        }
    }

    @Deprecated("This method has been deprecated in favor of using the Activity Result API\n      which brings increased type safety via an {@link ActivityResultContract} and the prebuilt\n      contracts for common intents available in\n      {@link androidx.activity.result.contract.ActivityResultContracts}, provides hooks for\n      testing, and allow receiving results in separate, testable classes independent from your\n      activity. Use\n      {@link #registerForActivityResult(ActivityResultContract, ActivityResultCallback)} passing\n      in a {@link RequestMultiplePermissions} object for the {@link ActivityResultContract} and\n      handling the result in the {@link ActivityResultCallback#onActivityResult(Object) callback}.")
    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_CODE_POST_NOTIFICASSION) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(this, "Notification permission granted!", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "Notification permission denied!", Toast.LENGTH_SHORT).show()
            }
            this.requestPermission("read-storage")
        }
        if (requestCode == REQUEST_CODE_READ_STORAGE) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(this, "Read storage permission granted!", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "Read storage permission denied!", Toast.LENGTH_SHORT).show()
            }
            this.requestPermission("write-storage")
        }
        if (requestCode == REQUEST_CODE_WRITE_STORAGE) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(this, "Write storage permission granted!", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "Write storage permission denied!", Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun createWebViewClient(): WebViewClient {
        return object : WebViewClient() {
            private var finished: Boolean = false

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                if (this.finished) return
                this.finished = true
            }
        }
    }

    fun createWebChromeClient(): WebChromeClient {
        return object : WebChromeClient() {

            // Handle web alert.
            override fun onJsAlert(
                view: WebView?,
                url: String?,
                message: String?,
                result: android.webkit.JsResult?
            ): Boolean {
                AlertDialog.Builder(this@MainActivity)
                    .setTitle("Alert")
                    .setMessage(message)
                    .setPositiveButton(android.R.string.ok) { _, _ ->
                        result?.confirm()
                    }
                    .setCancelable(false)
                    .create()
                    .show()
                return true
            }

            // Handle permission request.
            override fun onPermissionRequest(request: PermissionRequest?) {
                request?.grant(request.resources)
            }

            // Handle open file.
            override fun onShowFileChooser(
                webView: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                val acceptTypes = fileChooserParams?.acceptTypes
                val intent = Intent(Intent.ACTION_GET_CONTENT)
                intent.addCategory(Intent.CATEGORY_OPENABLE)

                // Handle dynamic file type.
                acceptTypes?.let {
                    if (it.isNotEmpty()) {
                        intent.type = it[0]
                    }
                }
                if(intent.type?.isEmpty() == true) {
                    intent.type = "*/*"
                }

                // Handle dynamic multiple select.
                if (fileChooserParams?.mode?.toString() == "1") {
                    intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
                }

                // Start open file.
                startActivityForResult(Intent.createChooser(intent, "Select File"), REQUEST_CODE_FILE_CHOOSER)
                fileChooserCallback = filePathCallback
                return true
            }
        }
    }

    fun requestPermission(permissionName: String) {
        // Ask notification permission.
        if (permissionName == "notification") {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.POST_NOTIFICATIONS), REQUEST_CODE_POST_NOTIFICASSION)
                    return
                }
            } else {
                if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_NOTIFICATION_POLICY) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.ACCESS_NOTIFICATION_POLICY), REQUEST_CODE_POST_NOTIFICASSION)
                    return
                }
            }
            this.requestPermission("read-storage")
        }

        // Ask read storage permission.
        if (permissionName == "read-storage") {
            if(Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
                if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE), REQUEST_CODE_READ_STORAGE)
                    return
                }
            } else {
                if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.READ_MEDIA_IMAGES), REQUEST_CODE_READ_STORAGE)
                    return
                }
            }
            this.requestPermission("write-storage")
        }

        // Ask write storage.
        if (permissionName == "write-storage") {
            if(Build.VERSION.SDK_INT <= Build.VERSION_CODES.Q) {
                if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE), REQUEST_CODE_WRITE_STORAGE)
                    return
                }
            }
        }
    }

    private fun getSelectedFiles(intent: Intent?): Array<Uri>? {
        val clipData = intent?.clipData
        val singleFile = intent?.data
        return when {
            clipData != null -> {
                val count = clipData.itemCount
                val files = Array(count) { index ->
                    clipData.getItemAt(index).uri
                }
                files
            }
            singleFile != null -> arrayOf(singleFile)
            else -> null
        }
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun WebViewScreen(webUrl: String) {
    val contextActivity = LocalContext.current as MainActivity

    Box (
        contentAlignment = Alignment.Center,
        modifier = Modifier
            .fillMaxSize()
    ) {
        AndroidView(
            modifier = Modifier.fillMaxSize(),
            factory = { context ->
                WebView(context).apply {
                    webViewClient = contextActivity.createWebViewClient()

                    // Web view settings.
                    settings.javaScriptEnabled = true
                    settings.loadWithOverviewMode = true
                    settings.useWideViewPort = true
                    settings.textZoom = 100
                    settings.domStorageEnabled = true

                    // Custom chrome function.
                    webChromeClient = contextActivity.createWebChromeClient()

                    // Add javascript interface.
                    addJavascriptInterface(JavaScriptInterface(context, contextActivity, this), "Android")

                    // Load web content.
                    loadUrl(webUrl)
                }
            },
            update = { webView ->
                webView.loadUrl(webUrl)
            },
        )
    }
}