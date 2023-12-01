<script setup>
import { ref, watch } from 'vue';
import fixLink from '@/composables/useFixLink';
import useScroll from '@/composables/useScroll'

const props = defineProps({
    id: Number
})

const scrollToTop = useScroll;
const loading = ref(true);
const character = ref(null);
const fixedLink = ref(null);


const getCharacter = async() => {
    if( Number( props.id ) ) {

        loading.value = true;
        const resp = await fetch(`https://api.attackontitanapi.com/characters/${props.id}`).then( r => r.json() )

        character.value = resp

        if( character.value.img ) {
            if ( character.value.name !== 'Muller' ) {
                fixedLink.value = fixLink( character.value.img );
            }
        }

        if( character.value.name === 'Eren Jaeger' ) {
            character.value.groups.push( { name: "Scout Regiment"} )
        }

        loading.value = false;
    }
}

getCharacter();

watch( () => props.id, () => {
    scrollToTop();
    getCharacter();
})

</script>

<template>
    <div class="w-full">
        <div v-if="!loading" class="flex flex-col gap-8 items-center justify-center"> 

            <img
              :src="fixedLink"
              alt=""
              class="w-56"
              v-if="fixedLink"
            >

            <div
                class="w-56 h-56 text-center flex items-center justify-center py-12 bg-[#202020] text-sm font-martel"
                v-else
            >
                No image
            </div>

            <div class="flex flex-col items-center text-center text-base md:text-lg gap-1">
                <h3 class="text-2xl lg:text-3xl text-[#D8D8D8] uppercase font-montserrat font-bold"> {{ character.name }} </h3>

                <p v-if="character.species.length > 1"> {{ character.species[0] }} - {{ character.species[1] }}</p>
                <p v-else>{{ character.species[0] }}</p>
            </div>

            <CharacterInfo              
                :gender="character.gender"
                :age="character.age"
                :height="character.height"
                :status="character.status"
                :birthplace="character.birthplace"
                :residence="character.residence"
                :occupation="character.occupation"
                :episodes="character.episodes"
            />

            <CharacterGroups              
                :groups="character.groups"
            />

            <CharacterAlias 
                v-if="character.alias.length || character.roles.length"
                :alias="character.alias"
                :roles="character.roles"
            />

            <CharacterTitans
                :character="character.name"
                :alias="character.alias"
            />

            <CharacterRelatives
                v-if="character.relatives.length"
                :character="character.name"
                :family="character.relatives[0].family"
                :members="character.relatives[0].members"
            />
        </div>
    </div>
</template>