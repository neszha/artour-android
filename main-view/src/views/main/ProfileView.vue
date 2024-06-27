<script setup>
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
</script>

<template>
    <HeaderNavbar nav-title="Profile Saya" :nav-back-to="{name: 'explore'}" />

    <!-- profile card -->
    <section class="container-fluid pt-4 mb-3">
        <div class="card border-0">
            <div class="card-body">
                <div class="d-flex justify-content-center">
                    <a href="#" class="avatar avatar-xl rounded-circle">
                        <img alt="..."
                            src="https://images.unsplash.com/photo-1579463148228-138296ac3b98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80">
                    </a>
                </div>
                <div class="text-center my-3">
                    <span class="d-block h5 mb-0">Julienne Moore</span>
                    <span class="d-block text-sm text-muted">example@mail.com</span>
                </div>
            </div>
        </div>
    </section>

    <!-- navigation list -->
    <section class="mb-5">
        <div class="list-group list-group-flush border-top border-bottom">

            <div class="list-group-item position-relative hstack bg-light py-2">
                <span class="px-3">Akun</span>
            </div>

            <div class="list-group-item position-relative hstack flex-wrap waves-effect waves-dark">
                <div class="flex-1 px-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <RouterLink :to="{name: 'change-avatar'}" class="d-block h4 stretched-link">
                            <span>Ubah Foto</span>
                        </RouterLink>
                        <div class="icon text-end">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-group-item position-relative hstack flex-wrap waves-effect waves-dark">
                <div class="flex-1 px-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <RouterLink :to="{name: 'change-name'}" class="d-block h4 stretched-link">
                            <span>Ubah Nama</span>
                        </RouterLink>
                        <div class="icon text-end">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-group-item position-relative hstack flex-wrap waves-effect waves-dark">
                <div class="flex-1 px-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <a href="javascript:void(0)" class="d-block h4 stretched-link">
                            <span>Ulasan Saya</span>
                        </a>
                        <div class="icon text-end">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="list-group-item position-relative hstack bg-light py-2">
                <span class="px-3">Bantuan</span>
            </div>

            <div class="list-group-item position-relative hstack flex-wrap waves-effect waves-dark">
                <div class="flex-1 px-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <a href="javascript:void(0)" class="d-block h4 stretched-link">
                            <span>Informasi</span>
                        </a>
                        <div class="icon text-end">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-group-item position-relative hstack flex-wrap waves-effect waves-dark">
                <div class="flex-1 px-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <a href="javascript:void(0)" class="d-block h4 stretched-link">
                            <span>Tentang Aplikasi</span>
                        </a>
                        <div class="icon text-end">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- logout -->
    <section class="container-fluid">
        <div class="d-grid">
            <button type="button" class="btn btn-outline-danger waves-effect waves-dark">
                Logout
            </button>
        </div>
    </section>
</template>
