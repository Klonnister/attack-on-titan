<script setup>
import links from '@/composables/useLinks';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

// Links composable
const useLinks = links

// Small screen navigation menu
const showMenu = ref( false )

const openMenu = () => {
    showMenu.value = true
}

const closeMenu = () => {
    showMenu.value = false
}

</script>

<template>
    <header>
        <nav class="w-full flex justify-between items-center 2xl:px-4">

            <div
              class="absolute left-0 top-0 w-full transition-all ease-in-out duration-200 lg:-translate-y-full"
              :class="showMenu ? '' : '-translate-y-full blur'"
            >
                <div class="bg-black opacity-[95%] min-h-screen z-10 flex items-center justify-center relative p-16">
                    <button class="absolute right-10 top-10" @click="closeMenu">
                        <Icon
                            icon="mingcute:close-fill"
                            class="w-7 h-7 text-white"
                        />
                    </button>

                    <div class="flex flex-col w-full max-w-xs">
                        <router-link
                            v-for="link in useLinks"
                            :key="link.id"
                            :to="link.url"
                            @click="closeMenu"
                            class="font-montserrat uppercase font-semibold transition-all ease-in-out duration-100 text-center py-6 border-b"
                        >
                            {{ link.name }}
                        </router-link>
                        <router-link
                            :to="{ name: 'about' }"
                            @click="closeMenu"
                            class="font-montserrat uppercase font-semibold transition-all ease-in-out duration-100 text-center py-6"
                        >
                            About
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-6 xl:gap-8 2xl:gap-12">    
                <router-link :to="{ name: 'home' }">
                    <img
                        src="/title.png"
                        alt=""
                        class="w-40 sm:w-44 lg:w-52 xl:w-56"
                    >
                </router-link>
        
                <div class="hidden lg:flex gap-6 xl:gap-9 2xl:gap-10">
                    <router-link
                        v-for="link in useLinks"
                        :key="link.id"
                        :to="link.url"
                        class="font-montserrat uppercase font-semibold hover:-translate-y-[2px] hover:text-[#FFFFFF] border-b border-[#000000] transition-all ease-in-out duration-300"
                    >
                        {{ link.name }}
                    </router-link>
                </div>
            </div>

            <router-link
                :to="{ name: 'about' }"
                class="hidden lg:block font-montserrat uppercase font-semibold hover:-translate-y-[2px] hover:text-[#FFFFFF] transition-all ease-in-out duration-300 border-b border-[#000000]"
            >
                About
            </router-link>

            <button
              class="left-0 lg:hidden"
              @click="openMenu"
            >
                <Icon
                    icon="ooui:menu"
                    class="w-7 h-7"
                />
            </button>
        </nav>
    </header>
</template>

<style scoped>

.router-link-exact-active {
    background-color: #131313;
}

@media screen and ( min-width: 1024px ) {
    .router-link-exact-active {
        color: #FFFFFF;
        border-bottom: 2px solid #01458C;
    }
}

</style>