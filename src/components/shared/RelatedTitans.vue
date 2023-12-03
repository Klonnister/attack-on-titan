<script setup>
import { ref } from 'vue'

const props = defineProps({
    title: String,
    members: Array
})

const titans = ref([]);

const getTitan = async( url ) => {
    const resp = await fetch( url ).then( r => r.json() )

    titans.value.push( resp )
}

if( props.members.length ) {
    props.members.forEach( member => {
        if( member.startsWith('https') && member.includes('titans') ) {
            getTitan( member )
        }
    })
}

</script>

<template>
    <div class="my-6 flex flex-col w-full lg:col-span-2" v-if="props.members.length">
        <p class="font-semibold mb-8 md:mb-14 lg:mb-16 font-montserrat text-center uppercase text-base md:text-lg lg:text-xl">
            {{ props.title }}
        </p>

        <div class="flex gap-7 sm:gap-12 lg:gap-14 justify-center flex-wrap">
            <router-link 
                v-for="titan in titans" 
                :key="titan.name"
                :to="{ name: 'titans-id', params: { id: titan.id } }"
            >
                <RelatedCard                      
                    :name="titan.name"
                    :img="titan.img ? titan.img : ''"
                    :status="titan.status"
                />
            </router-link>
        </div>
    </div>
</template>
