<script setup>
const props = defineProps({
    alias: Array,
    roles: Array
})
</script>

<template>
    <div class="w-full h-full grid grid-cols-1 min-[350px]:grid-cols-2 gap-2 ">
        <div
            v-if="props.alias.length"
            class="bg-gray-800 p-4 lg:p-8 flex flex-col"
            :class="{ 'col-span-2': !props.roles.length }"
        >
            <p class="font-semibold mb-3 font-montserrat text-center md:text-lg lg:text-xl">Alias</p>
            <ul>
                <li
                    v-for="alias in props.alias"
                    :key="alias"
                    class="text-xs md:text-sm lg:text-base mb-2 flex justify-center text-center text-white"
                >
                    {{ alias }}
                </li>
            </ul>
        </div>

        <div
            v-if="props.roles.length"
            class="bg-gray-800 p-4 lg:p-8 flex flex-col"
            :class="{ 'col-span-2': !props.alias.length }"
        >
            <p class="font-semibold mb-3 font-montserrat text-center md:text-lg lg:text-xl">Roles</p>
            <ul>
                <li                          
                    v-for="role in props.roles"
                    :key="role"
                    class="mb-2 flex justify-center text-center text-white"
                    :class="role.includes('Regiment Commanders') ? 'text-sm md:text-base lg:text-lg' : 'text-xs md:text-sm lg:text-base'"
                >
                    {{ role || 'Royal Government' }}
                </li>
            </ul>
        </div>
    </div>
</template>