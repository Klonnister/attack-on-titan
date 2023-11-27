<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';

import useViewStore from '@/stores/viewStore'

const viewStore = useViewStore()

onBeforeMount(() => {
    viewStore.showFooter = false
})

onBeforeUnmount(() => {
    viewStore.showFooter = true
})

</script>

<template>
    <div class="grow flex flex-col justify-center">
        <h2 class="text-xl sm:text-2xl lg:text-3xl text-[#D8D8D8] uppercase font-montserrat font-bold text-center mb-6">About</h2>
    
        <p class="text-sm md:text-base text-justify leading-8 sm:leading-9 md:leading-10 mb-10 sm:mb-6 md:mb-8">
            This is a fan made webpage created with the purpose of practicing web design and consuming APIs. All the information here is accessible at the <a href="https://www.attackontitanapi.com/" class="text-[#FFFFFF]">Attack on Titan API</a>.
        </p>
    
        <p class="text-sm md:text-base text-justify leading-8 sm:leading-9 md:leading-10 mb-10 sm:mb-6 md:mb-8">
            I used
            <a href="https://vuejs.org/" class="text-[#FFFFFF]">Vue.js</a> to create this page, you can checkout my code at <a href="https://github.com/Klonnister" class="text-[#FFFFFF]">Github</a>.
        </p>
    </div>

    <img
      src="/about.png"
      alt=""
      class="absolute bottom-0 right-0 w-44 min-[360px]:w-56 sm:w-72 lg:w-80 2xl:w-[30rem]"
    >
</template>