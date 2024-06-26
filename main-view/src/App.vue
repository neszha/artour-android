<template>
    <RouterView v-slot="{ Component }">
        <Component :is="Component" />
    </RouterView>
</template>
