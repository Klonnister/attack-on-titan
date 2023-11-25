<script setup>
import { ref } from 'vue'

const characters = ref(null)
const character = ref(null)

const getCharacters = async () => {
    const resp = await fetch('https://api.attackontitanapi.com/characters').then( r => r.json() )

    characters.value = resp
    character.value = characters.value.results[1]
}
getCharacters()

</script>

<template>
    
    <div v-if="characters">
        <h2 class="text-xl sm:text-2xl lg:text-3xl text-[#D8D8D8] uppercase font-montserrat font-bold text-center mb-8">Characters</h2>

        <p class="text-sm md:text-base text-justify leading-8 sm:leading-9 md:leading-10 mb-10 sm:mb-6 md:mb-8">Attack on Titan series feature an extensive cast of fictional characters created by Hajime Isayama. The story initially centers on Eren Yeager with his childhood friends Mikasa Ackerman and Armin Arlert, who join the military to fight the Titans. They are part of the 104th Training Corps, whose graduates assume different positions in the Military, including the Garrison Regiment, the Survey Corps and the Military Police Brigade.</p>

        <p class="text-sm md:text-base text-justify leading-8 sm:leading-9 md:leading-10 mb-10 sm:mb-6 md:mb-8">It is later revealed that the area where the Walls are located is called Paradis and that there are other nations outside the walls of their mother womb, namely Marley which has infiltrated Paradis.</p>

        <div>
            <CharacterCard 
                :name="character.name"
                :img="character.img"
            />
        </div>
    </div>
    
</template>