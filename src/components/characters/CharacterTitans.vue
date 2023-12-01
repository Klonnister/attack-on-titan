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
    if( props.character !== 'Grisha Jaeger' ) {
        props.alias.forEach( alias => {
            if( titansList.includes( alias ) ) {
                getTitan( alias )
            }
        })  
    } else {
        getTitan('Attack titan')
    }

}
</script>

<template>
    <div
      v-if="characterTitans.length"
      class="my-6 flex flex-col w-full lg:col-span-2"
    >
        <p class="font-semibold mb-8 md:mb-10 lg:mb-16 font-montserrat text-center uppercase text-lg md:text-xl lg:text-2xl"> Inhenitor of </p>

        <div class="flex gap-7 sm:gap-12 lg:gap-12 justify-center flex-wrap">
            <RelatedCard                      
                v-for="titan in characterTitans" 
                :key="titan.name"
                :name="titan.name"
                :img="titan.img"
            />
        </div>
    </div>
</template>