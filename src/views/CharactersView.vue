<script setup>
import useCharactersStore from '@/stores/charactersStore.js'
import { ref } from 'vue'
import { Icon } from '@iconify/vue';
import Dropdown from 'primevue/dropdown';

const charactersStore = useCharactersStore();

const loading = ref(true);
const showFilters = ref( false );
const characters = ref(null);

const getCharacters = async () => {
    loading.value = true;

    const response = await fetch('https://api.attackontitanapi.com/characters').then( r => r.json() );

    characters.value = response.results;
    loading.value = false;

    characters.value.forEach( character => {
        if( !charactersStore.occupations.includes( character.occupation ) ) {
            charactersStore.occupations.push( character.occupation );
        }
    })
}

getCharacters();

const toggleShowFilters = () => {
    showFilters.value = !showFilters.value
}


</script>

<template>
    
    <div class="w-full">
        <h2 class="text-2xl lg:text-3xl text-[#D8D8D8] uppercase font-montserrat font-bold text-center mb-6">Characters</h2>

        <div class="w-full flex mb-2">
            <input
              type="search"
              placeholder="Buscar por nombre..."
              class="grow py-3 bg-[#131313] px-4 rounded-s-lg"
            >
            <button class="bg-[#131313] px-2 rounded-e-lg">
                <Icon
                  icon="bx:search-alt-2"
                  class="w-6 h-6"
                />
            </button>
        </div>

        <!-- <div class="w-full flex justify-center mb-2">
            <button
              class="underline px-2 rounded-lg"
              @click="toggleShowFilters"
            >
                {{ showFilters ? 'Hide Filters' : 'Show Filters'  }} 
            </button>
        </div> -->

        <div class="flex flex-wrap gap-2" v-if="showFilters">
            <Dropdown
              v-model="charactersStore.gender"
              :options="['All genders', 'Male', 'Female']"
              placeholder="Gender"
              class="grow md:w-14rem rounded-lg"
              :loading="loading"
            />

            <Dropdown
              v-model="charactersStore.status"
              :options="['All status', 'Alive', 'Deceased', 'Unknown']"
              placeholder="Status"
              class="grow md:w-14rem rounded-lg"
              :loading="loading"
            />

            <Dropdown
              v-model="charactersStore.occupation"
              :options="charactersStore.occupations"
              placeholder="Organization"
              class="w-full md:w-14rem rounded-lg"
              :loading="loading"
            />
        </div>

        <div v-if="!loading" class="py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-10">
            <CharacterCard 
                v-for="character in characters"
                :key="character.id"
                :name="character.name"
                :img="character.img || '' "
                :status="character.status"
            />
        </div>

        <div
            class="grow"
            v-else
            >
                Loading...
        </div>
    </div>
    
</template>

<style>
.p-inputtext {
    padding: 0.5rem 1rem;
}

.p-dropdown {
    background-color: #131313;
}

.p-dropdown-item {
    padding: 0.5rem 1rem;
}
</style>