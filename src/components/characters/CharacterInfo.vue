<script setup>
const props = defineProps({
    gender: { type: String, required: true },
    age: { type: [Number,  String], required: true },
    height: { type: [Number,  String], required: true },
    status: { type: String, required: true },
    birthplace: { type: String, required: true },
    residence: { type: String, required: true },
    occupation: { type: String, required: true },
    episodes: { type: Array, required: true },
})

</script>

<template>
    <ul class="w-full grid grid-cols-2 gap-2 text-xs md:text-sm lg:text-base">
        <li class="flex flex-col px-3.5 py-3 md:py-4 bg-[#202020] text-center justify-center">
            <p>Gender:</p>
            <p class="text-white">{{ props.gender === 'Ambiguous[9]' ? 'Ambiguous' : props.gender }}</p>
        </li>

        <li class="flex flex-col px-3.5 py-3 md:py-4 bg-[#202020] text-center justify-center">
            <p>Age:</p>
            <p class="text-white">{{ props.age }}</p>
        </li>

        <li class="flex flex-col px-3.5 py-3 md:py-4 bg-[#202020] text-center justify-center">
            <p>Height:</p>
            <p class="text-white">{{ props.height }}</p>
        </li>

        <li
            class="flex flex-col px-3.5 py-3 md:py-4 text-center  justify-center"
            :class="props.status === 'Deceased' ? 'bg-[#201818]' : 'bg-[#202020]'"
        >
            <p>Status:</p>
            <p class="text-white">{{ props.status }}</p>
        </li>

        <li class="flex flex-col px-3.5 py-3 md:py-4 bg-[#202020] text-center justify-center">
            <p>Birthplace:</p>
            <p class="text-white">{{ props.birthplace }}</p>
        </li>

        <li class="flex flex-col px-3.5 py-3 md:py-4 bg-[#202020] text-center justify-center">
            <p>Residence:</p>
            <p class="text-white">{{ props.residence }}</p>
        </li>

        <li class="flex flex-col px-3.5 py-3 md:py-4 bg-[#202020] text-center justify-center">
            <p>Occupation:</p>
            <p class="text-white">{{ props.occupation }}</p>
        </li>
        
        <li class="flex flex-col px-3.5 py-3 md:py-4 bg-[#202020] text-center justify-center">
            <p>Appearences:</p>
            <p class="text-white">{{ props.episodes.length }} episodes</p>
        </li>
    </ul>
</template>