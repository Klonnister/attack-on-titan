<script setup>
import { ref } from 'vue';
// import { Icon } from '@iconify/vue';
import fixLink from '@/composables/useFixLink';

const props = defineProps({
    name: { type: String, required: true },
    img: { type: String, required: true },
    code: { type: String, required: true },
})

const fixedLink = ref(null);

fixedLink.value = fixLink( props.img );
</script>

<template>
    <div class="flex flex-col gap-3 items-center h-full max-w-[165px] sm:max-w-[200px]" v-if="fixedLink">
        <div class="relative flex justify-center items-center">
            <img
              :src="fixedLink ? fixedLink : '/noimage.jpg'"
              alt=""
            >

            <!-- <Icon
              icon="ph:play-fill"
              class="absolute text-white bottom-2 right-2 w-5 h-5 opacity-80"
              v-if="fixedLink"
            /> -->
            <p class="text-sm font-martel absolute" v-if="!fixedLink">No image</p>
        </div>

        <p class="text-[0.65rem] lg:text-sm font-montserrat text-start">
            <span class="text-white font-semibold">{{ props.code }}</span>
            {{ props.name }}
        </p>
    </div>
</template>