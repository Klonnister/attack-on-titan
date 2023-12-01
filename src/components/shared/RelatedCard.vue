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
        <img
          v-if="fixedLink"
          :src="fixedLink"
          alt=""
          :class="props.status === 'Deceased' 
            ? 'grayscale px-2 rounded-md h-28'
            : 'px-2 rounded-md h-28'"
        >

        <div
            class="text-center flex items-center justify-center h-28 w-28 w-full bg-[#202020]"
            v-else
        >
            <p class="text-sm font-martel">No image</p>
        </div>

        <p class="text-xs lg:text-sm font-martel text-center w-28">{{ props.name }}</p>
    </div>
</template>