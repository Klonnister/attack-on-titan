<script setup>
import { ref, watch } from 'vue';
import fixLink from '@/composables/useFixLink';
import useScroll from '@/composables/useScroll'
import { useRouter } from 'vue-router';

const props = defineProps({
    id: Number
})

const router = useRouter();

// Smooth scroll method
const scrollToTop = useScroll;
// Cut img url
const fixedLink = ref(null);


// Page info
const loading = ref(true);
const character = ref(null);

// Character api request
const getCharacter = async() => {
    loading.value = true;

    try {
        const resp = await fetch(`https://api.attackontitanapi.com/characters/${props.id}`).then( r => r.json() )
        
        if( !Array.isArray(resp) ) {
            character.value = resp

            if( character.value.img ) {
                if ( character.value.name !== 'Muller' ) {
                    fixedLink.value = fixLink( character.value.img );
                }
            } else {
                fixedLink.value = null;
            }
            loading.value = false;
        } else {
            router.push( { name: 'not-found'} )
        }
    } catch (error) {
        router.push( { name: 'not-found'} )
    }

}

getCharacter();

watch( () => props.id, () => {
    scrollToTop();
    getCharacter();
})

</script>

<template>
    <div class="w-full my-10 flex justify-center">
        <div v-if="!loading" class="w-full flex flex-col gap-8 lg:gap-16 items-center justify-center lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"> 
            <div class="flex flex-col gap-6 lg:col-span-2">
                <div class="relative flex justify-center items-center">               
                    <img
                      v-if="character"
                      :src="fixedLink ? fixedLink : '/noimage.jpg'"
                      alt=""
                      class="w-56 lg:w-64"
                    >
        
                    <span class="text-sm font-martel absolute" v-if="!fixedLink">
                        No image
                    </span>
                </div>
    
                <div class="flex flex-col items-center text-center text-base md:text-lg lg:text-xl gap-1">
                    <h3 class="text-2xl lg:text-3xl text-[#D8D8D8] uppercase font-montserrat font-bold"> {{ character.name }} </h3>
    
                    <p v-if="character.species.length > 1"> {{ character.species[0] }} - {{ character.species[1] }}</p>
                    <p v-else>{{ character.species[0] }}</p>
                </div>
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

        <div
          class="w-full py-20 flex justify-center font-montserrat text-lg "
          v-else-if="loading"
        >
            Loading...
        </div>
    </div>
</template>