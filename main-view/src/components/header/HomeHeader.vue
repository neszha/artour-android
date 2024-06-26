<template>
    <header class="pc-header border-bottom">
        <div class="header-wrapper">
            <div class="me-auto d-flex align-items-center">
                <a href="javascript:void(0);" class="b-brand text-primary">
                    <img src="/logo/itentix-text-logo-color.png" id="brand-logo" class="img-fluid ps-2" alt="logo">
                </a>
            </div>
            <div class="ms-auto d-flex align-items-center">
                <ul class="list-unstyled">
                    <li class="dropdown header-user-profile">
                        <a class="pc-head-link dropdown-toggle arrow-none me-0">
                            <img src="https://app.itentix.com/avatars/avatar-1.jpg" alt="user-image" class="user-avtar">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
.pc-header {
    min-height: 60px;
    backdrop-filter: blur(0px);
    background-color: var(--bs-body-bg);
    top: 0;
    left: 0 !important;

    .header-wrapper {
        padding: 0 15px !important;
    }
}
.b-brand {
    img {
        height: 24px;
    }
}
.header-user-profile {
    img {
        height: 38px;
    }
}
</style>
