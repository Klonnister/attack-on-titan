<script setup>
import useFiltersList from '@/composables/useFiltersList';
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';
import { scrollToTopRough } from '@/composables/useScroll';
import { useRouter } from 'vue-router';

const router = useRouter();

// Response data
const loading = ref(true);
const characters = ref(null);
const pagesInfo = ref(null);

// Filters variables
const filtersList = useFiltersList;
const showFilters = ref( false );
const search = ref('')
const gender = ref(null);
const status = ref(null);
const occupation = ref(null);

// Paginator variables
const newPage = ref(1)
const firstItem = ref(0)

// Characters request to API
const getCharacters = async () => {
    loading.value = true;

    const queries = ref('');

    if ( newPage.value > 1 ) {
        if( queries.value.startsWith('?') ) {
            queries.value = queries.value + '&page=' + newPage.value;
        } else {
            queries.value = `?page=${newPage.value}`
        }
    }

    if ( search.value ) {
        if( queries.value.startsWith('?') ) {
            queries.value = queries.value + '&name=' + search.value.toLowerCase();
        } else {
            queries.value = `?name=${search.value.toLowerCase()}`
        }
    }

    if ( gender.value ) {
        if( queries.value.startsWith('?') ) {
            queries.value = queries.value + '&gender=' + gender.value.toLowerCase();
        } else {
            queries.value = `?gender=${gender.value.toLowerCase()}`
        }
    }

    if ( status.value ) {
        if( queries.value.startsWith('?') ) {
            queries.value = queries.value + '&status=' + status.value.toLowerCase();
        } else {
            queries.value = `?status=${status.value.toLowerCase()}`
        }
    }

    if ( occupation.value ) {
        if( queries.value.startsWith('?') ) {
            queries.value = queries.value + '&occupation=' + occupation.value.toLowerCase();
        } else {
            queries.value = `?occupation=${occupation.value.toLowerCase()}`
        }
    }
    
    try {
        const response = await fetch(`https://api.attackontitanapi.com/characters${queries.value}`).then( r => r.json() );
    
        characters.value = response.results;
        pagesInfo.value = response.info;
        loading.value = false;
        scrollToTopRough();
    } catch (error) {
        characters.value = null;
        loading.value = false;
    }
}

getCharacters();

// Filters dropdown watchers
watch(gender, ( newGender ) => {
    if( newGender === 'All' ) {
        gender.value = null
    }

    newPage.value = 1;
    firstItem.value = 0
    getCharacters();
})

watch(status, ( newStatus ) => {
    if( newStatus === 'All' ) {
        status.value = null
    }

    newPage.value = 1;
    firstItem.value = 0
    getCharacters();
})

watch(occupation, ( newOccupation ) => {
    if( newOccupation === 'All' ) {
        occupation.value = null
    }

    newPage.value = 1;
    firstItem.value = 0
    getCharacters();
})

// Filter methods
const toggleShowFilters = () => {
    showFilters.value = !showFilters.value
}

const clearFilters = () => {
    search.value = ''
    gender.value = null;
    status.value = null;
    occupation.value = null;
    newPage.value = 1;
    getCharacters();
}

// Search method
const searchCharacter = () => {
    newPage.value = 1;
    firstItem.value = 0;

    getCharacters();
}

// Pagination method
const onPaginate = ( event ) => {
    newPage.value = event.page + 1;
    firstItem.value = event.first;

    getCharacters();
}

</script>

<template>
    
    <div class="w-full my-4">
        <h2 class="text-2xl lg:text-3xl text-[#D8D8D8] uppercase font-montserrat font-bold text-center mb-6">Characters</h2>

        <div class="mx-auto w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl flex mb-2">
            <input
              v-model="search"
              id="search"
              type="search"
              placeholder="Search name..."
              class="grow py-3 bg-[#202020] px-2 min-[350px]:px-4 rounded-s-lg text-sm lg:text-base"
              @keyup.enter="searchCharacter"
            >
            <button
              class="bg-[#202020] px-3 rounded-e-lg border-s border-s-2 border-[#000000]"
              @click="searchCharacter"
            >
                <Icon
                  icon="bx:search-alt-2"
                  class="w-6 h-6"
                />
            </button>
        </div>

        <div>
            <Transition name="fade">
                <div class="flex justify-center flex-wrap gap-2 md:max-w-lg lg:max-w-xl xl:max-w-2xl md:mx-auto" v-if="showFilters">
                    <Dropdown
                      v-model="gender"
                      :options="filtersList.gendersList"
                      placeholder="Gender"
                      class="grow md:min-w-sm rounded-lg"
                      :loading="loading"
                    />
        
                    <Dropdown
                      v-model="status"
                      :options="filtersList.statusList"
                      placeholder="Status"
                      class="grow rounded-lg"
                      :loading="loading"
                    />
        
                    <Dropdown
                      v-model="occupation"
                      :options="filtersList.occupationsList"
                      placeholder="Occupation"
                      class="w-full md:w-max md:grow md:w-14rem rounded-lg"
                      :loading="loading"
                    />
                </div>
            </Transition>
            
            <div class="w-full flex justify-center gap-2 mb-2">
                <button
                  class="px-2 py-1 my-1 rounded-lg text-sm"
                  @click="toggleShowFilters"
                >
                    {{ showFilters ? 'Hide Filters' : 'Show Filters'  }} 
                </button>
    
                <button
                  class="px-2 py-1 my-1 rounded-lg text-sm"
                  @click="clearFilters"
                  v-if="gender || status || occupation || search"
                >
                    Clear filters
                </button>
            </div>
        </div>
        

        <div v-if="!loading && characters" class="flex flex-col">
            <div class="py-10 lg:py-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 sm:gap-12 2xl:gap-16">
                <router-link
                    v-for="character in characters"
                    :key="character.id"
                    :to="{ name: 'character-id', params: { id: character.id }}"
                >
                    <CharacterCard 
                        :name="character.name"
                        :img="character.img ? character.img : ''"
                        :status="character.status"
                    />
                </router-link>
            </div>

            <div class="card md:mx-auto">
                <Paginator
                    :template="{
                        '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                        '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                        '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                    }"
                    :rows="20"
                    :totalRecords="pagesInfo.count"
                    v-model:first="firstItem"
                    :pageLinkSize="7"
                    @page="onPaginate"
                    class="md:max-w-2xl"
                    >
                </Paginator>
            </div>
        </div>

        

        <div
          class="w-full py-20 flex justify-center font-montserrat text-lg "
          v-else-if="loading"
        >
            Loading...
        </div>

        <div
          class="w-full py-28 flex justify-center font-montserrat text-lg "
          v-else
        >
            No results found
        </div>
    </div>
    
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
