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
    <div class="flex flex-col gap-3 items-center h-full hover:-translate-y-1 transition-all duration-300 ease-out">
        <div class="relative flex justify-center items-center">
            <img
              :src="fixedLink ? fixedLink : '/noimage.jpg'"
              alt=""
              class="px-2"
              :class="{ 'grayscale':props.status === 'Deceased'} "
            >
            <p class="text-sm font-martel absolute" v-if="!fixedLink">No image</p>
        </div>

        <p class="text-[0.62rem] min-[350px]:text-xs lg:text-sm font-martel text-center">{{ props.name }}</p>
    </div>
</template>