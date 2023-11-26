<script setup>
import { ref } from 'vue'

const characters = ref(null)

const getCharacters = async () => {
    const response = await fetch('https://api.attackontitanapi.com/characters').then( r => r.json() )

    characters.value = response.results
}

getCharacters()


</script>

<template>
    
    <div v-if="characters">
        <h2 class="text-xl sm:text-2xl lg:text-3xl text-[#D8D8D8] uppercase font-montserrat font-bold text-center">Characters</h2>

        <div class="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10">
            <CharacterCard 
                v-for="character in characters"
                :key="character.id"
                :name="character.name"
                :img="character.img || '' "
                :status="character.status"
            />
        </div>
    </div>
    
</template>