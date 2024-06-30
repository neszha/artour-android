export {}

declare global {
    interface AndroidInterface {
        setupPermissions: () => void
        loginWithGoogle: (clientId: string) => void
        showToast: (message: string) => void
    }

    interface Window {
        Android: AndroidInterface
        authGoogleAndroidCallback: (token: string) => void
        AFRAME: any
    }
}
