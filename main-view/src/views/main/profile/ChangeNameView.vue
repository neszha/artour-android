<script setup>
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
</script>

<template>
    <HeaderNavbar nav-title="Ubah Nama" :nav-back-to="{name: 'profile'}" />

    <!-- form input  -->
    <section class="container-fluid mt-4">
        <form action="">
            <div class="mb-3">
                <label class="form-label">Nama</label>
                <input type="text" class="form-control" placeholder="Nama" value="Fanesa Hadi Pramana">
            </div>
            <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary waves-effect waves-light">Simpan</button>
            </div>
        </form>
    </section>
</template>
