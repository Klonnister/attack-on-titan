<script setup>
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'

const route = useRoute();
const routeName = ref( route.name );

const loading = ref(false);
const showContent = ref(false);

const switchLoading = async () => {
    setTimeout( () => { loading.value = true }, 300)  
    setTimeout( () => { showContent.value = true }, 2900 ) 
    setTimeout( () => { loading.value = false }, 3000)
}

switchLoading();

watch( route, ( newRoute ) => {
    routeName.value = newRoute.name;
})

onBeforeRouteLeave( (to, from, next) => {
    showContent.value = false;
    setTimeout(() => { next() }, 300)
})
</script>

<template>
    <Transition name="fade">
        <div
          class="min-h-screen py-8 lg:py-12 max-w-[450px] px-12 lg:px-20 xl:px-32 sm:container mx-auto flex flex-col"
          v-if="showContent"
        >
    
            <NavBar />
    
                <div class="grow pt-10 py-16 flex justify-center items-center w-full">
                    <RouterView />
                </div>
    
            <MainFooter v-if="routeName != 'about'" />
        </div>
    </Transition>

    <div
        class="w-2/4 h-full flex justify-end items-center transition-all ease-in-out duration-300 fixed top-0 left-0 bg-black"
        :class="loading ? '' : '-translate-x-full'"
    >
        <img src="/bg-1.jpg" alt="" class="rounded-s-full">
    </div>

    <div
        class="w-2/4 h-full flex justify-start items-center transition-all ease-out duration-300 fixed top-0 bg-black right-0"
        :class="loading ? '' : 'translate-x-full'"
    >
        <img src="/bg-2.jpg" alt="" class="rounded-e-full">
    </div>

</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>