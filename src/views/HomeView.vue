<script setup>
import useScroll from '@/composables/useScroll'

const scrollToTop = useScroll
</script>

<template>
  <div class="my-8 lg:my-12 max-w-[450px] min-[450px]:px-10 lg:px-20 xl:px-32 sm:container mx-auto">
    <header class="mx-10 min-[450px]:mx-0 flex items-center justify-center relative">
      <img
        src="/title.png"
        alt="Attack on titan"
        class="w-36 min-[350px]:w-40 sm:w-72 lg:w-80"
      >
      <p class="text-xs sm:text-sm lg:text-base font-montserrat font-semibold uppercase absolute right-0 text-[#D8D8D8]">
        About
      </p>
    </header>

    <main>
      <HomeBody />
    </main>
    
    <footer class="pt-28 pb-4 px-10 min-[450px]:px-0 flex flex-col items-center gap-6 xl:gap-5">
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
  </div>
</template> 