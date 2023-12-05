<script setup>
import useFiltersList from '@/composables/useFiltersList';
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';
import { scrollToTopRough } from '@/composables/useScroll'
import { onBeforeRouteLeave } from 'vue-router';

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
    
    const response = await fetch(`https://api.attackontitanapi.com/characters${queries.value}`).then( r => r.json() );

    characters.value = response.results;
    pagesInfo.value = response.info;
    loading.value = false;
    scrollToTopRough();
}

getCharacters();

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

const searchCharacter = () => {
    newPage.value = 1;
    firstItem.value = 0;

    getCharacters();
}

const onPaginate = ( event ) => {
    newPage.value = event.page + 1;
    firstItem.value = event.first;

    getCharacters();
}

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

onBeforeRouteLeave( (to, from, next) => {
    loading.value = true;
    setTimeout( () => { next() }, 300)
})
</script>

<template>
    <Transition name="fade-view">
        <div class="w-full my-4" v-if="!loading">
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
            
            <div v-if="characters" class="flex flex-col">
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
                class="w-full py-20 lg:py-28 flex justify-center font-montserrat text-lg "
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
    </Transition>
    
</template>

<style>
.p-inputtext {
    padding: 0.5rem 1rem;
    font-size: 14px;
}

.p-dropdown {
    background-color: #202020;
}

.p-dropdown-item {
    padding: 0.5rem 1rem;
    font-size: 14px;
}

.p-paginator-current {
    font-size: 14px;
}

.p-paginator {
    padding: 1px 16px;
}

.p-link {
    transition: all 0.3s ease-in-out;
}

.p-link:hover {
    background-color: #282828;
}

.p-highlight {
    color: #FFFFFF;
    background-color: #303030;
}

.p-highlight:hover {
    color: #FFFFFF;
    background-color: #303030;
}

.paginator-page {
    color: #C0C1C3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-view-enter-active,
.fade-view-leave-active {
  transition: opacity 0.2s ease;
}

.fade-view-enter-from,
.fade-view-leave-to {
  opacity: 0;
}

</style>
