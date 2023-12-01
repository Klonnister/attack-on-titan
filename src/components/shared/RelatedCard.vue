<script setup>
import { ref } from 'vue';
import fixLink from '@/composables/useFixLink';

const props = defineProps({
    name: { type: String, required: true },
    img: { type: String, required: true },
    status: String,
})

const fixedLink = ref(null);

if( props.img ) {
    if ( props.name !== 'Muller' ) {
        fixedLink.value = fixLink( props.img );
    }
}
</script>

<template>
    <div class="flex flex-col gap-3 items-center">
        <div class="relative flex justify-center items-center">
            <img
              :src="fixedLink ? fixedLink : '/noimage.jpg'"
              alt=""
              class="max-w-[125px] sm:max-w-[150px] lg:max-w-[px]"
              :class="props.status === 'Deceased' 
                ? 'grayscale'
                : ''"
            >
            <p class="absolute text-sm font-martel cursor-default" v-if="!fixedLink">No image</p>
        </div>
        <p class="text-[0.62rem] min-[350px]:text-xs md:text-sm lg:text-base font-martel text-center w-28">{{ props.name }}</p>
    </div>
</template>