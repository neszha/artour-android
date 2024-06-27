<script setup>
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
</script>

<template>
    <HeaderNavbar nav-title="Ubah Foto" :nav-back-to="{name: 'profile'}" />

    <!-- avatar view -->
    <section class="container-fluid pt-4 mb-3">
        <div class="card border-0">
            <div class="card-body">
                <div class="d-flex justify-content-center">
                    <a href="#" class="avatar avatar-xl rounded-circle">
                        <img alt="..."
                            src="https://images.unsplash.com/photo-1579463148228-138296ac3b98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80">
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- form input  -->
    <section class="container-fluid">
        <div class="card">
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-center mb-2">
                    <button type="button" class="btn btn-md btn-neutral waves-effect waves-dark">Upload Foto</button>
                </div>
                <p class="text-sm text-muted text-center mb-0">
                    Upload file PNG/JPG/JPEG max 1MB
                </p>
            </div>
        </div>
    </section>
</template>
