<script setup lang="ts">
import PageSpinner from '@components/common/PageSpinner.vue'
</script>

<template>
    <PageSpinner :show="showPageSpinner" />
    <div ref="authForm" class="auth-form container bg-surface-secondary d-flex">
        <div class="auth-header d-flex align-items-center justify-content-center">
            <div class="d-flex justify-content-center">
                <img src="/logo/box_logo.png" alt="img">
            </div>
        </div>
        <div class="auth-content pb-5">
            <div class="text-center">
                <h1 class="title lh-tight ls-tighter font-bolder h2 mb-2 px-3">
                    Cari Tempat Wisata Terdekat di Sekitar Anda
                </h1>
                <p class="mb-5">
                    Masuk dengan akun google anda.
                </p>
                <div class="d-grid px-3">
                    <button @click="loginWithGoogle" :disabled="authGoogle.loading" type="button" class="btn-login btn btn-sm btn-square btn-neutral btn-lg w-100">
                        <img class="me-2" src="@/assets/authentication/google.svg" alt="img">
                        <span>Login with Google</span>
                        <span v-if="authGoogle.loading">...</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="auth-footer pb-4">
            <p class="m-0 w-100 text-center">
                <span>Lorem ipsum dolor sit, amet consectetur dolor adipisicing Lorem, ipsum dolor elit.</span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia'
import { useTaskStore } from '@/stores/task.store'
import axios, { axiosUpdateAuthorization } from '@/helpers/axios.helper'
import { API_URL_AUTH_GOOGLE_MOBILE_CALLBACK } from '@/constants/api-url'
import { GOOGLE_AUTH_CLIENT_ID, API_BASE_URL } from '@/constants/environment'

export default {

    methods: {
        ...mapActions(useTaskStore, ['getTasks']),

        async checkAuthSession () {
            await new Promise(resolve => {
                const accessToken = localStorage.getItem('access_token')
                if (accessToken !== null) {
                    localStorage.setItem('access_token', accessToken)
                    axiosUpdateAuthorization()
                }
                setTimeout(() => {
                    this.showPageSpinner = false
                }, 500)
                resolve(null)
            })
        },

        loginWithGoogle () {
            this.authGoogle.loading = true

            // Auth with Google in Android.
            if (window.Android !== undefined) {
                window.Android.loginWithGoogle(GOOGLE_AUTH_CLIENT_ID)
                return
            }

            // Auth with Google in Web.
            const url = new URL(`${API_BASE_URL}/auth/google`)
            window.location.href = url.toString()
        },

        async handleAccessTokenQuery () {
            const url = new URL(window.location.href.replace('/#', ''))
            const accessToken = url.searchParams.get('accessToken')
            if (accessToken !== null) {
                localStorage.setItem('access_token', accessToken)
                axiosUpdateAuthorization()
                this.$router.push({ name: 'explore' })
                return
            }
            setTimeout(() => {
                this.showPageSpinner = false
            }, 500)
        },

        async authGoogleAndroidCallback (token: string): Promise<void> {
            this.authGoogle.loading = true
            try {
                const url = new URL(`${API_BASE_URL}${API_URL_AUTH_GOOGLE_MOBILE_CALLBACK}`)
                url.searchParams.append('code', token)
                const response = await axios.get(url.toString())
                const authToken = response.data.data.authToken as string
                localStorage.setItem('access_token', authToken)
                axiosUpdateAuthorization()
                await this.getTasks()
                this.$router.push({ name: 'home' })
            } catch (error) {
                window.Android.showToast('Failed to login. Please try again.')
                this.authGoogle.loading = false
            }
        }
    },

    async beforeMount () {
        window.authGoogleAndroidCallback = this.authGoogleAndroidCallback
        await this.checkAuthSession()
        this.handleAccessTokenQuery()
    },

    mounted () {
        const height = window.innerHeight
        const authForm = this.$refs.authForm as HTMLElement
        if (authForm !== undefined) {
            authForm.style.height = `${height}px`
        }
    },

    data () {
        return {
            showPageSpinner: true,
            authGoogle: {
                loading: false
            }
        }
    }
}
</script>

<style scoped lang="scss">
.auth-form {
    min-height: 700px;
    height: 100vh;
    flex-direction: column;

    .auth-header {
        flex-grow: 1;

        img {
            width: 170px;
        }
    }

    .auth-content {
        .title {
            font-size: 32px;
            font-weight: bold;
        }
        .btn-login {
            border-radius: 16px;
            font-size: 18px;

            img {
                width: 22px;
            }
        }
    }
}
</style>
