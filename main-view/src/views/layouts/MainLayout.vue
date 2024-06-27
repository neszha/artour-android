<template>
    <div class="main-layout">
        <div class="main-content">
            <RouterView v-slot="{ Component }">
                <Component :is="Component" />
            </RouterView>
        </div>
        <div class="bottom-navigation-bar">
            <ul class="navigation-bar nav nav-tabs">
                <li class="nav-item text-muted">
                    <a class="nav-link active" href="javascript:void(0)">
                        <div class="box-icon">
                            <i class="bi-compass-fill"></i>
                        </div>
                        <span>Explore</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-muted" href="javascript:void(0)">
                        <div class="box-icon">
                            <i class="bi-geo-alt-fill"></i>
                        </div>
                        <span>Maps</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-muted" href="javascript:void(0)">
                        <div class="box-icon">
                            <i class="bi-vignette"></i>
                        </div>
                        <span>AR Maps</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-muted" href="javascript:void(0)">
                        <div class="box-icon">
                            <i class="bi-plus-square-fill"></i>
                        </div>
                        <span>Kontribusi</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-muted" href="javascript:void(0)">
                        <div class="box-icon">
                            <i class="bi-plus-square-fill"></i>
                        </div>
                        <span>Profile</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-layout {
    height: 100vh;

    .main-content {
        padding-bottom: 70px;
    }
}
.bottom-navigation-bar {
    position: fixed;
    z-index: 1000;
    background: #ffffff;
    width: 100%;
    margin: 0 auto;
    min-height: 60px;
    bottom: 0;
    border-top: 1px solid #e8e8e8;

    .navigation-bar {
        display: flex;
        justify-content: space-around;
        border: none;

        .nav-item {
            width: 60px;
            margin: 0;
            display: flex;
            justify-content: center;
            text-align: center;
            .box-icon {
                font-size: 16px;
            }
        }

        .nav-link {
            padding: 12px 0;
            font-size: 12px;
            &.active {
                color: var(--x-blue-600);
            }
        }
    }
}
</style>
