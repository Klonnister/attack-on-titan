<script setup>
import { homeLinks } from '@/composables/useLinks'

const useHomeLinks = homeLinks
</script>

<template>
    <div class="my-12 sm:my-16 lg:my-20 text-center flex flex-col gap-8">
            
            <h2 class="font-montserrat font-bold text-xl md:text-2xl text-[#D8D8D8] uppercase">What you'll find here</h2>
            <p class="text-sm md:text-base text-justify leading-8 sm:leading-9 md:leading-10 sm:text-center">Select one of the options below to start browsing. Note that the information shown on this page is up to the second to last episode of the anime. Please be aware, before progressing any further, that this site contains heavy spoilers.</p>

            <div class="my-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-8">
                <router-link
                    v-for="link in useHomeLinks"
                    :key="link.id"
                    :to="link.url"
                    class="hover:xl:scale-105 transition-all duration-500 ease-out"
                >
                    <div
                      :class="`w-full h-48 sm:h-36 md:h-48 lg:h-56 xl:h-44 bg-no-repeat bg-cover bg-center rounded-3xl mb-3 transition-all duration-500 ease-out ${link.id}`"
                      alt=""
                    ></div>
                    <p class="text-[13px] min-[475px]:text-sm xl:text-base font-montserrat uppercase font-semibold">{{ link.name }}</p>
                </router-link>
            </div>
        </div>
</template>

<style scoped>
.characters {
    background-image: url('/characters.gif');
}

.episodes {
    background-image: url('/episodes.gif');
}

.locations {
    background-image: url('/locations.gif');
}

.titans {
    background-image: url('/titans.gif');
}

@media screen and (min-width: 1024px) {
    .characters {
        background-image: url('/characters-gray.jpg');
    }

    .characters:hover {
        background-image: url('/characters.gif');
    }

    .episodes {
        background-image: url('/episodes-gray.jpg');
    }

    .episodes:hover {
        background-image: url('/episodes.gif');
    }

    .locations {
        background-image: url('/locations-gray.jpg');
    }

    .locations:hover {
        background-image: url('/locations.gif');
    }

    .titans {
        background-image: url('/titans-gray.jpg');
    }

    .titans:hover {
        background-image: url('/titans.gif');
    }
}

</style>