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
import android.os.Environment
import android.provider.MediaStore
import android.webkit.GeolocationPermissions
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.compose.runtime.remember
import androidx.core.content.FileProvider
import com.neszha.artour.store.WebServer
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.Date

class MainActivity : ComponentActivity() {
    private val REQUEST_CODE_POST_NOTIFICASSION = 102
    private val REQUEST_CODE_READ_STORAGE = 103
    private val REQUEST_CODE_WRITE_STORAGE = 104
    private val REQUEST_CODE_FINE_LOCATION = 105
    private val REQUEST_CODE_CAMERA_ACCESS = 106
    private val REQUEST_CODE_FILE_CHOOSER  = 2002
    private var fileChooserCallback: ValueCallback<Array<Uri>>? = null
    private var cameraPhotoUri: Uri? = null

    /**
     * Create activity.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Render content.
        val host: String = WebServer.Config.host
        val port: String = WebServer.Config.port.toString()
        val webViewUrl = "http://$host:$port/index.html#/auth"
//        val webViewUrl = "http://$host:$port/index.html#/contribution/places"
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

    /**
     * Handle event on activity results.
     */
    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_CODE_FILE_CHOOSER) {
            if (resultCode == RESULT_OK) {
                if (cameraPhotoUri !== null) { // From camera capture.
                    val results = this.getCameraCaptureFiles(data)
                    fileChooserCallback?.onReceiveValue(results)
                    cameraPhotoUri = null
                } else { // From gallery selected.
                    val results = this.getGallerySelectedFiles(data)
                    fileChooserCallback?.onReceiveValue(results)
                }
                fileChooserCallback = null
            }
            fileChooserCallback?.onReceiveValue(null)
        }
    }

    /**
     * Handle event request permissions.
     */
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
            this.requestPermission("fine-location")
        }
        if (requestCode == REQUEST_CODE_FINE_LOCATION) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(this, "GPS permission granted!", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "GPS permission denied!", Toast.LENGTH_SHORT).show()
            }
            this.requestPermission("camera-access")
        }
        if (requestCode == REQUEST_CODE_CAMERA_ACCESS) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(this, "Camera permission granted!", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "Camera permission denied!", Toast.LENGTH_SHORT).show()
            }
        }
    }

    /**
     * Setup and custom web view client.
     */
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

    /**
     * Setup and custom chrome web client.
     */
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

            // Handle permission GPS request.
            override fun onGeolocationPermissionsShowPrompt(
                origin: String,
                callback: GeolocationPermissions.Callback
            ) {
                callback.invoke(origin, true, false)
            }

            // Handle permission request.
            override fun onPermissionRequest(request: PermissionRequest?) {
                request?.grant(request.resources)
            }

            // Handle open file.
            @SuppressLint("QueryPermissionsNeeded")
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

                // Open live capture via camera.
                if (fileChooserParams?.isCaptureEnabled == true) {
                    val captureImageIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE).also { intentCapture ->
                        intentCapture.resolveActivity(packageManager).also {
                            val photoFile: File? = try {
                                createImageFile()
                            } catch (ex: IOException) {
                                null
                            }
                            photoFile?.also {
                                cameraPhotoUri = FileProvider.getUriForFile(
                                    this@MainActivity,
                                    "$packageName.provider",
                                    it
                                )
                                intentCapture.putExtra(MediaStore.EXTRA_OUTPUT, cameraPhotoUri)
                            }
                        }
                    }
                    val pickFileIntent = Intent(Intent.ACTION_GET_CONTENT).apply {
                        type = "image/*"
                        putExtra(Intent.EXTRA_ALLOW_MULTIPLE, false)
                    }
                    val chooserIntent = Intent(Intent.ACTION_CHOOSER).apply {
                        putExtra(Intent.EXTRA_INTENT, pickFileIntent)
                        putExtra(Intent.EXTRA_TITLE, "Select or Take a Picture")
                        putExtra(Intent.EXTRA_INITIAL_INTENTS, arrayOf(captureImageIntent))
                    }
                    startActivityForResult(chooserIntent, REQUEST_CODE_FILE_CHOOSER)
                    fileChooserCallback = filePathCallback
                    return true
                }

                // Start open file.
                startActivityForResult(Intent.createChooser(intent, "Select File"), REQUEST_CODE_FILE_CHOOSER)
                fileChooserCallback = filePathCallback
                return true
            }
        }
    }

    /**
     * Handle request permissions.
     */
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
            this.requestPermission("fine-location")
        }

        // Ask fine location.
        if (permissionName == "fine-location") {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), REQUEST_CODE_FINE_LOCATION)
                return
            }
            this.requestPermission("camera-access")
        }

        // Ask camera access.
        if (permissionName == "camera-access") {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), REQUEST_CODE_CAMERA_ACCESS)
                return
            }
        }
    }

    /**
     * Save capture image to applocation local data.
     */
    @SuppressLint("SimpleDateFormat")
    @Throws(IOException::class)
    private fun createImageFile(): File {
        val timeStamp: String = SimpleDateFormat("yyyyMMdd_HHmmss").format(Date())
        val storageDir: File = getExternalFilesDir(Environment.DIRECTORY_PICTURES)!!
        return File.createTempFile(
            "JPEG_${timeStamp}_",
            ".jpg",
            storageDir
        ).apply {
            cameraPhotoUri = Uri.fromFile(this)
        }
    }

    /**
     * Get image data from selected gallery.
     */
    private fun getGallerySelectedFiles(intent: Intent?): Array<Uri>? {
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

    /**
     * Get image paths form camera capture.
     */
    private fun getCameraCaptureFiles(data: Intent?): Array<Uri>? {
        val results: Array<Uri>? = when {
            data == null || data.data == null -> {
                // Case where no data URI but camera photo URI exists
                cameraPhotoUri?.let { arrayOf(it) }
            }
            data.clipData != null -> {
                // Multiple files selected
                val clipData = data.clipData
                Array(clipData!!.itemCount) { i -> clipData.getItemAt(i).uri }
            }
            else -> {
                // Single file selected
                data.data?.let { arrayOf(it) }
            }
        }
        return results
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun WebViewScreen(webUrl: String) {
    val contextActivity = LocalContext.current as MainActivity
    val webView = remember { WebView(contextActivity) }

    // Handle back press event.
    BackHandler(enabled = true) {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            contextActivity.finish()
        }
    }

    Box (
        contentAlignment = Alignment.Center,
        modifier = Modifier
            .fillMaxSize()
    ) {
        AndroidView(
            modifier = Modifier.fillMaxSize(),
            factory = {
                webView.apply {
                    webViewClient = contextActivity.createWebViewClient()

                    // Web view settings.
                    settings.javaScriptEnabled = true
                    settings.loadWithOverviewMode = true
                    settings.useWideViewPort = true
                    settings.textZoom = 100
                    settings.domStorageEnabled = true
                    settings.mediaPlaybackRequiresUserGesture = false

                    // Custom chrome function.
                    webChromeClient = contextActivity.createWebChromeClient()

                    // Add javascript interface.
                    addJavascriptInterface(JavaScriptInterface(context, contextActivity, this), "Android")

                    // Load web content.
                    loadUrl(webUrl)
                }
            },
        )
    }
}