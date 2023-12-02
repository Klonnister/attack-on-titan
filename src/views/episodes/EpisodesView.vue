<script setup>
import { Icon } from '@iconify/vue';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';
import { ref, watch } from 'vue';
import useFiltersList from '@/composables/useFiltersList';
import { scrollToTopRough } from '@/composables/useScroll'

const loading = ref(true);
const pagesInfo = ref(null);
const episodes = ref(null);

const filtersList = useFiltersList;
const showFilters = ref(false);
const search = ref(null);
const season = ref(null);

// Paginator variables
const newPage = ref(1);
const firstItem = ref(0);


const getEpisodes = async() => {
    loading.value = true;
    const queries = ref('');
    try {
        if ( newPage.value > 1 ) {
            if( queries.value.startsWith('?') ) {
                queries.value = queries.value + '&page=' + newPage.value;
            } else {
                queries.value = `?page=${newPage.value}`
            }
        }
    
        if ( search.value ) {
            if( queries.value.startsWith('?') ) {
                if( search.value.startsWith('S') && search.value.indexOf('E') === 2 ) {
                    queries.value = queries.value + '&episode=' + search.value.toLowerCase();
                } else {
                    queries.value = queries.value + '&name=' + search.value.toLowerCase();
                }
            } else {
                if( search.value.startsWith('S') && search.value.indexOf('E') === 2 ) {
                    queries.value = queries.value + '?episode=' + search.value.toLowerCase();
                } else {
                    queries.value = queries.value + '?name=' + search.value.toLowerCase();
                }
            }
        }
    
        if ( season.value ) {
            if( queries.value.startsWith('?') ) {
                queries.value = queries.value + '&episode=' + season.value.toLowerCase();
            } else {
                queries.value = `?episode=${season.value.toLowerCase()}`
            }
        }
    
        const response = await fetch(`https://api.attackontitanapi.com/episodes${queries.value}`).then( r => r.json());
        
        pagesInfo.value = response.info
        episodes.value = response.results;
        loading.value = false;   

    } catch (error) {
        
        console.log(error)
        episodes.value = null;
        loading.value = false;

    }
}

getEpisodes();

watch(season, ( newSeason ) => {
    if( newSeason === 'All' ) {
        season.value = null;
    } 

    newPage.value = 1;
    firstItem.value = 0;
    getEpisodes();
}) 

const searchEpisodes = () => {
    newPage.value = 1;
    firstItem.value = 0;

    getEpisodes();
}

const onPaginate = ( event ) => {
    firstItem.value = event.first;
    newPage.value = event.page + 1;
    

    getEpisodes();
    scrollToTopRough();
}

const toggleShowFilters = () => {
    showFilters.value = !showFilters.value
}

const clearFilters = () => {
    search.value = '';
    season.value = '';
}

</script>

<template>
    <div class="w-full my-4">
        <h2 class="text-2xl lg:text-3xl text-[#D8D8D8] uppercase font-montserrat font-bold text-center mb-6">Episodes</h2>

        <div class="mx-auto w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl flex mb-2">
            <input
              v-model="search"
              id="search"
              type="search"
              placeholder="Search name or code..."
              class="grow py-3 bg-[#202020] px-2 min-[350px]:px-4 rounded-s-lg text-sm lg:text-base"
              @keyup.enter="searchEpisodes"
            >
            
            <button
              class="bg-[#202020] px-3 rounded-e-lg border-s border-s-2 border-[#000000]"
              @click="searchEpisodes"
            >
            
                <Icon
                  icon="bx:search-alt-2"
                  class="w-6 h-6"
                />
            </button>
        </div>

        <div class="w-full flex flex-col items-center">
            <div class="w-full flex justify-center" v-if="showFilters">
                <Dropdown
                  v-model="season"
                  :options="filtersList.seasonsList"
                  placeholder="Season"
                  class="grow sm:max-w-[12rem] rounded-lg"
                  :loading="loading"
                />
            </div>
            
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
                  v-if="search || season"
                >
                    Clear filters
                </button>
            </div>
        </div>
        

        <div v-if="!loading && episodes" class="flex flex-col">

            <div class="py-10 lg:py-20 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 md:gap-x-10 gap-y-10 xl:gap-12 2xl:gap-16">
                <router-link
                    v-for="episode in episodes"
                    :key="episode.id"
                    :to="{ name: 'episodes-id', params: { id: episode.id } }"
                    class="flex justify-center"
                >
                    <EpisodeCard 
                        :code="episode.episode"
                        :name="episode.name"
                        :img="episode.img"
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

.p-highlight {
    color: #FFFFFF;
    background-color: #303030;
}

.paginator-page {
    color: #C0C1C3;
}
</style>