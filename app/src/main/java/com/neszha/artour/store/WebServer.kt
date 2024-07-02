package com.neszha.artour.store

object WebServer {
    var localHttpServerIsRunning: Boolean = false

    object Config {
        const val host = "127.0.0.1"
        const val port = 1999
        const val resourcePath = "assets/web-view"
    }
}