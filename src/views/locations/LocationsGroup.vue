<template>
    <div class="w-full">
        <router-view v-slot="{ Component }">
            <keep-alive include="LocationsView">
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>