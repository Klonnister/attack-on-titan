<template>
    <div class="w-full">
        <router-view v-slot="{ Component }">
            <keep-alive include="CharactersView">
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>