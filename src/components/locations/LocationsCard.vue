<script setup>
import { ref } from 'vue';
import fixLink from '@/composables/useFixLink';

const props = defineProps({
    name: { type: String, required: true },
    img: { type: String, required: true },
})

const fixedLink = ref(null);

if ( props.img !== 'unknown' ){
    fixedLink.value = fixLink( props.img );
}
</script>

<template>
    <div class="flex flex-col gap-3 items-center h-full justify-center hover:-translate-y-1 transition-all duration-300 ease-out">
        <div class="relative flex justify-center items-center">
            <img
              :src="fixedLink ? fixedLink : '/noimagewide.jpg'"
              alt=""
            >

            <p class="text-sm font-martel absolute" v-if="!fixedLink">No image</p>
        </div>

        <p class="text-xs lg:text-sm font-montserrat text-center">
            {{ props.name }}
        </p>
    </div>
</template>