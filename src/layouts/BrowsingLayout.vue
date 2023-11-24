<script setup>
// import { useRouter, RouterView } from 'vue-router';
// import { ref, watch } from 'vue'

// const router = useRouter();

// const url = ref(router.currentRoute.value.name)

// watch( url, ( newRoute ) => {  
//     url.value = newRoute
// } )

</script>

<template>

    <div class="min-h-screen py-8 lg:py-12 max-w-[450px] px-12 lg:px-20 xl:px-32 sm:container mx-auto flex flex-col">

        <NavBar />

        <RouterView />

        <MainFooter />


    </div>

</template>