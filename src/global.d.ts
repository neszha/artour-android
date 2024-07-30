export {}

declare global {

    interface AndroidInterface {
        setupPermissions: () => void
        loginWithGoogle: (clientId: string) => void
        openExternalLink: (link: string) => void
        openShareContent: (content: string) => void
        showToast: (message: string) => void
    }

    interface Window {
        Android: AndroidInterface
        authGoogleAndroidCallback: (token: string) => void
        openGoogleMapDirectionLink: (latitude: number, longitude: number) => void
        AFRAME: any
        $: any
    }
}
