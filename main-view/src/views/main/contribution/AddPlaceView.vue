<script setup lang="ts">
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
import MapPreviewMarker from '@components/maps/MapPreviewMarker.vue'
</script>

<template>
    <HeaderNavbar nav-title="Tambahkan Tempat" :nav-back-to="{name: 'contribution'}" />

    <!-- main content -->
    <section class="mt-4 mb-3">
        <form action="#" class="container-fluid">
            <div class="row">

                <div class="col-12">
                    <div class="mb-3">
                        <h4 class="mb-1">Detail Tempat</h4>
                        <p class="text-sm text-muted">Masukan informasi tentang tempat ini yang akan ditampilkan secara publik.</p>
                    </div>
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Nama Tempat <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="Tambahkan nama tempat" required>
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Deskripsi Tempat <span class="text-danger">*</span></label>
                    <textarea name="" class="form-control" required placeholder="Deskripsi tempat"></textarea>
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Ketegori <span class="text-danger">*</span></label>
                    <select class="form-select" required>
                        <option value="">-- Pilih Kategory --</option>
                        <option v-for="(category) in placeCategories" :key="category.id">{{ category.name }}</option>
                    </select>
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Alamat <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="Masukan detail alamat" required>
                </div>

                <div class="col-12 pt-2">
                    <!-- <div class="mb-3">
                        <h4 class="mb-1">Koordinat Tempat</h4>
                        <p class="text-sm text-muted">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    </div> -->
                    <div class="col-12 mb-3">
                        <MapPreviewMarker />
                    </div>
                </div>

                <div class="col-12 pt-2">
                    <div class="mb-3">
                        <h4 class="mb-1">Detail Lainnya</h4>
                        <p class="text-sm text-muted">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    </div>
                    <div class="col-12 mb-3">
                        <label class="form-label">Website</label>
                        <input type="text" class="form-control" placeholder="Situs web" required>
                    </div>
                    <div class="col-12 mb-3">
                        <label class="form-label">Kontak</label>
                        <input type="text" class="form-control" placeholder="Nomor telepon" required>
                    </div>
                    <div class="col-12 mb-3">
                        <label class="form-label">Jam Buka</label>
                        <input type="text" class="form-control" placeholder="Jam Buka" required>
                    </div>
                    <div class="col-12 mb-3">
                        <label class="form-label">Biaya Pengunjung</label>
                        <input type="text" class="form-control" placeholder="Biaya (Rp.)" required>
                    </div>
                </div>

                <div class="col-12 pt-2">
                    <div class="mb-3">
                        <h4 class="mb-1">Foto Tempat</h4>
                        <p class="text-sm text-muted">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    </div>
                    <div class="col-12 mb-3">
                        <a href="#" class="btn btn-sm btn-neutral border-base" data-bs-toggle="modal">
                            <span class="pe-2">
                                <i class="bi bi-images"></i>
                            </span>
                            <span>Tambahkan foto</span>
                        </a>
                        <div class="card mt-3">
                            <div class="card-body text-center py-5">
                                Foto akan tampil di sini. coming soon!
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 pt-2">
                    <div class="mb-2">
                        <div class="d-flex gap-3 justify-content-center">
                            <div class="d-grid w-100">
                                <button class="btn btn-md btn-neutral border-base waves-effect waves-dark">Batal</button>
                            </div>
                            <div class="d-grid w-100">
                                <button class="btn btn-md btn-primary waves-effect waves-light">Kirim</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { usePlaceStore } from '@/stores/place.store'

export default {
    computed: {
        ...mapState(usePlaceStore, ['placeCategories'])
    },

    methods: {
        ...mapActions(usePlaceStore, ['getPlaceCategories'])
    },

    beforeMount () {
        this.getPlaceCategories()
    }
}
</script>
