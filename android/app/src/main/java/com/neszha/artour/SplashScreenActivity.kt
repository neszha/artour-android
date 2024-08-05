package com.neszha.artour

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.neszha.artour.ui.theme.ColorDark
import com.neszha.artour.ui.theme.ITentixTheme
import com.neszha.artour.ui.theme.poppinsFontFamily
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@SuppressLint("CustomSplashScreen")
class SplashScreenActivity: ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Get app version.
        val packageInfo = this.packageManager.getPackageInfo(this.packageName, 0)
        val versionName = packageInfo.versionName ?: "x.x.x"

        // Delay and open main activity.
        CoroutineScope(Dispatchers.Default).launch {
            delay(1_500)
            val intent = Intent(this@SplashScreenActivity, MainActivity::class.java)
            this@SplashScreenActivity.startActivity(intent)
            this@SplashScreenActivity.finish()
        }

        // Render content.
        setContent {
            ITentixTheme {
                Surface(
                    color = MaterialTheme.colorScheme.background,
                    modifier = Modifier
                        .fillMaxSize()
                ) {
                    SplashScreen(versionName)
                }
            }
        }
    }
}

@Composable
fun SplashScreen(versionName: String, modifier: Modifier = Modifier) {
    Box (
        contentAlignment = Alignment.Center,
        modifier = modifier
            .fillMaxSize()
    ) {
        Image(
            painter = painterResource(id = R.drawable.box_logo),
            contentDescription = null,
            modifier = modifier
                .size(200.dp)
        )
    }
    Box(
        contentAlignment = Alignment.BottomCenter,
        modifier = modifier
            .fillMaxSize()
            .padding(bottom = 21.dp)
    ) {
        Text(
            text = "Version $versionName",
            color = ColorDark,
            fontFamily = poppinsFontFamily,
            modifier = modifier
        )
    }
}

@Preview(showBackground = true)
@Composable
fun SplashScreenPreview() {
    ITentixTheme {
        SplashScreen("x.x.x")
    }
}