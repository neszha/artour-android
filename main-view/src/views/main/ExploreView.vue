<template>
    <!-- header  -->
    <section class="home-header">
        <nav class="navbar navbar-light px-0 py-1">
            <div class="container-xl">
                <a class="navbar-brand" href="#">
                    <img src="/logo/box_logo.png" class="h-8 me-2" alt="...">
                </a>
                <button class="navbar-toggler" type="button">
                    <i class="bi bi-bell"></i>
                </button>
            </div>
        </nav>
    </section>

    <!-- search  -->
    <section class="pt-2">
        <div class="container">
            <form wire:submit.prevent="search()" class="w-full w-lg-96">
                <div class="input-group input-group-md input-group-inline shadow-none">
                    <span class="input-group-text pe-2 rounded-start-pill">
                        <i class="bi bi-geo-alt"></i>
                    </span>
                    <input type="text"
                        class="form-control text-md shadow-none rounded-end-pill"
                        placeholder="Apa yang sedang anda cari?" aria-label="Search">
                </div>
            </form>
        </div>
    </section>
</template>

<style scoped lang="scss">
.navbar {
    .navbar-toggler {
        font-size: 22px;
        &:focus {
            color: #6B7B93;
        }
    }
}
.navbar-brand {
    img {
        height: 33px;
    }
}
</style>
