<script setup>
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';

const route = useRoute();
const routeName = ref( route.name );

watch( route, ( newRoute ) => {
    routeName.value = newRoute.name;
})
</script>

<template>

    <div class="min-h-screen py-8 lg:py-12 max-w-[450px] px-12 lg:px-20 xl:px-32 sm:container mx-auto flex flex-col">

        <NavBar />

            <div class="grow pt-10 py-16 flex items-center">
                <RouterView />
            </div>

        <MainFooter v-if="routeName != 'about'" />


    </div>

</template>