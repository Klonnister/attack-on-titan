<script setup>
import links from '@/composables/useLinks'
import { Icon } from '@iconify/vue';

const useLinks = links
</script>

<template>
    <header class="mb-10">
        <nav class="relative w-full flex justify-center lg:justify-between items-center">
            <button class="absolute left-0">
                <Icon
                    icon="ooui:menu"
                    class="w-6 h-6 sm:w-7 sm:h-7 lg:hidden"
                />
            </button>

            <div class="flex items-center gap-6 xl:gap-8 2xl:gap-12">    
                <router-link :to="{ name: 'home' }">
                    <img
                        src="/title.png"
                        alt=""
                        class="w-36 sm:w-44 lg:w-52 xl:w-56"
                    >
                </router-link>
        
                <div class="hidden lg:flex gap-6 xl:gap-9 2xl:gap-10">
                    <router-link
                        v-for="link in useLinks"
                        :key="link.id"
                        :to="link.url"
                        class="font-montserrat uppercase font-semibold hover:text-[#FFFFFF] border-b border-[#000000] transition-all ease-in-out duration-100"
                    >
                        {{ link.name }}
                    </router-link>
                </div>
            </div>

            <router-link
                :to="{ name: 'about' }"
                class="hidden lg:block font-montserrat uppercase font-semibold hover:text-[#FFFFFF] transition-all ease-in-out duration-100 border-b border-[#000000]"
            >
                About
            </router-link>
        </nav>
    </header>
</template>

<style scoped>
.router-link-exact-active {
    color: #FFFFFF;
    border-bottom: 2px solid #01458C;
}
</style>