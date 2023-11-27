<script setup>
import useViewStore from '@/stores/viewStore'

const viewStore = useViewStore()
</script>

<template>

    <div class="min-h-screen py-8 lg:py-12 max-w-[450px] px-12 lg:px-20 xl:px-32 sm:container mx-auto flex flex-col">

        <NavBar />

            <div class="grow py-10 flex items-center">
                <RouterView />
            </div>

        <MainFooter v-if="viewStore.showFooter" />


    </div>

</template>