<script setup>
import { ref } from 'vue';

const props = defineProps({
    groups: Array,
});

const regiment = ref(null);

if( props.groups.length ) {
    const { name } = props.groups[0]

    if( name.includes('Regiment') ) {
        regiment.value = name.slice(0, name.indexOf(' ')).toLowerCase()
    }
}

</script>

<template>
    <div
        class="w-full bg-gray-800 p-4 lg:p-8 flex flex-col justify-center gap-4"
        v-if="props.groups.length"
    >
        <p class="font-semibold mb-2 font-montserrat text-center md:text-lg lg:text-xl">Groups</p>

        <div class="flex flex-col items-center gap-4" v-if="regiment">
            <img
                :src="`/${regiment}.png`"
                alt=""
                class="max-w-[80px] sm:max-w-[100px]"
            >
            <p class="text-sm md:text-base mb-2 text-white"> {{ props.groups[0].name }} </p>
        </div>

        <div v-else>
            <p class="text-xl lg:text-2xl font-semibold text-center text-white my-4 md:my-6">
                {{ props.groups[0].name }} 
            </p>
        </div>

        <div v-if=" props.groups[0].sub_groups">
            <p
                class="text-xs md:text-sm mb-2 flex flex-col text-center gap-1"
                v-if=" props.groups[0].sub_groups.length"
            >
                Subgroup
                <span class="text-xs md:text-sm text-white">{{ props.groups[0].sub_groups[0] }}</span>
            </p>
        </div>
    </div>
</template>