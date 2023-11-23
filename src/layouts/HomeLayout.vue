<template>

<div class="my-8 lg:my-12 max-w-[450px] px-12 lg:px-20 xl:px-32 sm:container mx-auto">
    <header class="flex items-center justify-center relative">
      <img
        src="/title.png"
        alt="Attack on titan"
        class="w-36 min-[350px]:w-40 sm:w-72 lg:w-80"
      >
      
      <router-link
        class="text-xs sm:text-sm lg:text-base font-montserrat font-semibold uppercase absolute right-0 text-[#D8D8D8] hover:text-[#FFFFFF] hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
        :to="{ name: 'about' }"
      >
        About
      </router-link>
    </header>

    <slot/>

    <MainFooter />

  </div>

</template>