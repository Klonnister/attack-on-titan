<script setup>
import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const loading = ref(false);
const showContent = ref(false);

const switchLoading = async () => {
    setTimeout( () => { loading.value = true }, 200)
    setTimeout( () => { showContent.value = true }, 2900 ) 
    setTimeout( () => { loading.value = false }, 3000)
}

switchLoading();

onBeforeRouteLeave( (to, from, next) => {
    showContent.value = false;
    setTimeout( () => { next() }, 300)
})


</script>

<template>

    <Transition name="fade">
        <HomeLayout v-if="showContent">
        
            <main>
                <div class="flex flex-col">
              
                    <h1 class="mt-12 sm:mt-16 lg:mt-20 text-xl sm:text-2xl lg:text-3xl text-[#D8D8D8] uppercase font-montserrat font-bold text-center">Shingeki no Kyojin</h1>
    
                    <HomeMain />
    
                    <HomeTrailer />
    
                    <HomeLinks />
              
                    <HomeFinalBanner />
            
                </div>
            </main>
    
        </HomeLayout>
    </Transition>
    

    <div
        class="w-2/4 h-full flex justify-end items-center transition-all ease-in-out duration-300 fixed top-0 left-0 bg-black"
        :class="loading ? '' : '-translate-x-full'"
    >
        <img src="/bg-1.jpg" alt="" class="rounded-s-full ps-4">
    </div>

    <div
        class="w-2/4 h-full flex justify-start items-center transition-all ease-out duration-300 fixed top-0 bg-black right-0"
        :class="loading ? '' : 'translate-x-full'"
    >
        <img src="/bg-2.jpg" alt="" class="rounded-e-full pe-4">
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