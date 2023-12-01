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
    <div class="flex flex-col gap-2 items-center h-full">
        <img
          v-if="fixedLink"
          :src="fixedLink"
          alt=""
          :class="{ 'grayscale':props.status === 'Deceased'} "
        >

        <div
            class="h-full w-full text-center flex items-center justify-center py-10  min-[350px]:py-12 bg-[#202020]"
            v-else
        >
            <p class="text-sm font-martel">No image</p>
        </div>

        <p class="text-[0.62rem] min-[350px]:text-xs lg:text-sm font-martel text-center">{{ props.name }}</p>
    </div>
</template>