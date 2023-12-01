<script setup>
import { ref } from 'vue'

const props = defineProps({
    character: String,
    family: String,
    members: Array
})

const firstName = props.character.slice(0, props.character.indexOf(' '))
const apiCharacters = ref([]);
const notFoundCharacters = ref([]);

const getCharacter = async( url ) => {
    const resp = await fetch( url ).then( r => r.json() )

    apiCharacters.value.push( resp )
}

const getUnnamedCharacter = async( mainCharacter, relationship, relative ) => {
    try {
        const resp = await fetch(`https://api.attackontitanapi.com/characters?name=${mainCharacter}'s ${relationship}`).then( r => r.json() )
        
        apiCharacters.value.push( resp.results[0] )

    } catch {
        notFoundCharacters.value.push( relative )
    }
}

if( props.members.length ) {
    props.members.forEach( member => {

        if( member.startsWith('https') ) {
            getCharacter( member )

        } else if( member.includes('grandfather') ) {

            getUnnamedCharacter( firstName, 'grandfather', member)

        } else if( member.includes('mother') ) {

            getUnnamedCharacter( firstName, 'mother', member)

        } else if( member.includes('father') ) {

            getUnnamedCharacter( firstName, 'father', member)

        } else {
            notFoundCharacters.value.push( member )  
        }
    })
}

</script>

<template>
    <div class="my-6 flex flex-col w-full">
        <p class="font-semibold mb-8 font-montserrat text-center uppercase text-lg lg:text-xl">
            {{ props.family }}
        </p>

        <div
          class="grid gap-12"
          :class="props.members.length > 1 ? 'grid-cols-2' : 'grid-cols-1'"
        >
            <router-link 
                v-for="relative in apiCharacters" 
                :key="relative.name"
                :to="{ name: 'character-id', params: { id: relative.id } }"
            >
                <RelatedCard                      
                    :name="relative.name"
                    :img="relative.img"
                    :status="relative.status"
                />
            </router-link>

            <RelatedCard                      
                v-for="relative in notFoundCharacters" 
                :key="relative"
                :name="relative"
                img=""
            />
        </div>
    </div>
</template>
