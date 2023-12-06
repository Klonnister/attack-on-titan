<script setup>
import { ref } from 'vue'

const props = defineProps({
    title: String,
    members: Array
})

// Characters separation
const apiCharacters = ref([]);
const notFoundCharacters = ref([]);

// Character api request
const getCharacter = async( url ) => {
    const resp = await fetch( url ).then( r => r.json() )

    apiCharacters.value.push( resp )
}

if( props.members.length ) {
    props.members.forEach( member => {
        if( member.startsWith('https') && member.includes('characters') ) {
            getCharacter( member )
        } else if( !member.includes('titans') ) {
            notFoundCharacters.value.push( member )  
        }
    })
}

</script>

<template>
    <div class="my-6 flex flex-col w-full lg:col-span-2" v-if="props.members.length">
        <p class="font-semibold mb-8 md:mb-14 lg:mb-16 font-montserrat text-center uppercase text-base md:text-lg lg:text-xl">
            {{ props.title }}
        </p>

        <div
          class="flex gap-7 sm:gap-12 lg:gap-14 justify-center flex-wrap"
          
        >
            <router-link 
                v-for="character in apiCharacters" 
                :key="character.name"
                :to="{ name: 'character-id', params: { id: character.id } }"
            >
                <RelatedCard                      
                    :name="character.name"
                    :img="character.img ? character.img : ''"
                    :status="character.status"
                />
            </router-link>

            <RelatedCard                      
                v-for="character in notFoundCharacters" 
                :key="character"
                :name="character"
                :img="character.img ? character.img : ''"
            />
        </div>
    </div>
</template>
