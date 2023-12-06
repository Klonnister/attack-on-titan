<script setup>
import useScroll from '@/composables/useScroll'

// Smooth scroll
const scrollToTop = useScroll
</script>

<template>
    <footer class="pb-4 flex flex-col items-center gap-4">
        <button
          class="text-sm md:text-base hover:lg:text-[17px] transition-all duration-300 ease-in-out underline"
          @click="scrollToTop"
        >
            Back to top
        </button>

        <a
          href="https://github.com/Klonnister"
          class="text-xs md:text-sm lg:text-base hover:scale-105 transition-all duration-500 ease-out uppercase font-montserrat flex justify-center items-center gap-2 md:gap-4 my-1"
        >
            <img
              src="/github.png"
              alt=""
              class="w-8"
            >

            <span>Klonnister</span>
         </a>

         <p class="text-xs lg:text-sm text-justify last-center" >This site is not official, filiate nor funded by Kodansha. It was made with the sole purpose of fun and practicing.</p>
    </footer>
</template>