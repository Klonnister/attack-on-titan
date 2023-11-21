<script setup>
import useScroll from '@/composables/useScroll'

const scrollToTop = useScroll
</script>

<template>
  <div class="my-8">
    <header class="mx-10 flex items-center justify-center relative">
      <img
        src="/title.png"
        alt="Attack on titan"
        class="w-36 min-[350px]:w-40"
      >
      <p class="text-xs font-montserrat font-semibold uppercase absolute right-0">About</p>
    </header>

    <main>
      <HomeBody />
    </main>
    
    <footer class="pt-28 pb-4 px-10 flex flex-col items-center gap-6">
      <button
        class="text-sm underline"
        @click="scrollToTop"
      >
        Back to top
      </button>

      <a
        href="https://github.com/Klonnister"
        class="text-xs uppercase font-montserrat flex justify-center items-center gap-2"
      >
        <img
          src="/github.png"
          alt=""
          class="w-8"
        >
        <span>Klonnister</span>
      </a>

      <p class="text-xs text-justify last-center" >This site is not official, filiate nor funded by Kodansha. It was made with the sole purpose of fun and practicing.</p>
    </footer>
  </div>
</template> 