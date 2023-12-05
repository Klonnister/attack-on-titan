<template>
    <div class="my-20 w-full flex flex-col items-center gap-4">
        <div class="w-[16rem] h-[19rem] flex justify-center items-center relative">
            <img
              src="/notfound.png"
              alt=""
              class="max-w-[15rem] opacity-80"
            >
            <div class="absolute top-0 black-gradient w-full h-full"></div>
        </div>
        <p class="text-4xl font-montserrat font-semibold">404</p>
        <p class="text-center">We couldn't find the page you're looking for.</p>
    </div>
</template>

<style scoped>
.black-gradient {
    background-image: radial-gradient(circle, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), black, black);
}

</style>