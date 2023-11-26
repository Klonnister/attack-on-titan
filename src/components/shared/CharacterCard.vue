<script setup>
import { ref } from 'vue'

const props = defineProps({
    name: { type: String, required: true },
    img: { type: String, required: true },
    status: { type: String, required: true },
})

const fixedLink = ref(null)

if( props.img ) {
    fixedLink.value = props.img.slice(0, (props.img.indexOf('revision') - 1))
}
    
</script>

<template>
    <div class="flex flex-col gap-2 items-center">
        <img
          v-if="props.img"
          :src="fixedLink"
          alt=""
          :class="props.status === 'Deceased' ? 'grayscale px-2' : ' px-2'"
        >

        <div
            class="h-full w-full text-center flex items-center justify-center"
            v-else
        >
            <p class="text-sm font-martel">No image</p>
        </div>

        <p class="text-xs font-martel">{{ props.name }}</p>
    </div>
</template>