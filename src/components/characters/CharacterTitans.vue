<script setup>
import { ref } from 'vue';

const props = defineProps({
    alias: Array,
    character: String
})

const titansList = [
    'Colossal Titan',
    'Armored Titan',
    'Female Titan',
    'Cart Titan',
    'Jaw Titan',
    'Beast Titan',
    'Attack Titan',
    'Founding Titan',
    'War Hammer Titan',
]

const characterTitans = ref([]);


const getTitan = async( titan ) => {
    try {
        const resp = await fetch(`https://api.attackontitanapi.com/titans?name=${titan}`).then( r => r.json() )

        characterTitans.value.push( resp.results[0] )

    } catch (err) {
        console.log(err)
    }
}

if( props.alias.length ) {
    props.alias.forEach( alias => {
        if( titansList.includes( alias ) ) {
            getTitan( alias )
        }
    })  
}
</script>

<template>
    <div
      v-if="characterTitans.length"
      class="my-6 flex flex-col w-full lg:col-span-2"
    >
        <p class="font-semibold mb-8 md:mb-10 lg:mb-16 font-montserrat text-center uppercase text-lg md:text-xl lg:text-2xl"> Inheritor of </p>

        <div class="flex gap-7 sm:gap-12 lg:gap-12 justify-center flex-wrap">
            <router-link
              v-for="titan in characterTitans"
              :key="titan.name"
              :to=" { name: 'titans-id', params: { id: titan.id } } "
            >
                <RelatedCard                     
                    :name="titan.name"
                    :img="titan.img"
                />
            </router-link>
        </div>
    </div>
</template>