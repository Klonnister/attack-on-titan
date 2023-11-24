<script setup>
import useScroll from '@/composables/useScroll'

const scrollToTop = useScroll
</script>

<template>
    <footer class="pb-4 flex flex-col items-center gap-6 xl:gap-5">
        <button
          class="text-sm md:text-base hover:lg:text-[17px] transition-all duration-300 ease-in-out underline"
          @click="scrollToTop"
        >
            Back to top
        </button>

        <a
          href="https://github.com/Klonnister"
          class="text-xs md:text-sm lg:text-base hover:lg:text-[17px] transition-all duration-300 ease-in-out uppercase font-montserrat flex justify-center items-center gap-2 md:gap-4"
        >
            <img
              src="/github.png"
              alt=""
              class="w-8 md:w-10"
            >

            <span>Klonnister</span>
         </a>

         <p class="text-xs lg:text-sm text-justify last-center" >This site is not official, filiate nor funded by Kodansha. It was made with the sole purpose of fun and practicing.</p>
    </footer>
</template>