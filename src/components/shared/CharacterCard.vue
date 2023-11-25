<script setup>
    const props = defineProps({
        name: { type: String, required: true },
        img: { type: String, required: true },
    })
</script>

<template>
    <div>
        <img :src="props.img" alt="">
        <p>{{ props.name }}</p>
    </div>
</template>