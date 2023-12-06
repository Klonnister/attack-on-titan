<script setup>
import { Icon } from '@iconify/vue';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';
import { ref, watch } from 'vue';
import useFiltersList from '@/composables/useFiltersList';
import { scrollToTopRough } from '@/composables/useScroll'

const loading = ref(true);

// Api request info
const pagesInfo = ref(null);
const locations = ref(null);

// Filter variables
const filtersList = useFiltersList;
const showFilters = ref(false);
const search = ref(null);
const region = ref(null);
const territory = ref(null);

// Paginator variables
const newPage = ref(1);
const firstItem = ref(0);

// Location api request
const getLocations = async() => {
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
            queries.value = queries.value + '?name=' + search.value.toLowerCase();
        }
    }

    if ( region.value ) {
        if( queries.value.startsWith('?') ) {
            queries.value = queries.value + '&region=' + region.value.toLowerCase();
        } else {
            queries.value = `?region=${region.value.toLowerCase()}`
        }
    }

    if ( territory.value ) {
        if( queries.value.startsWith('?') ) {
            queries.value = queries.value + '&territory=' + territory.value.toLowerCase();
        } else {
            queries.value = `?territory=${territory.value.toLowerCase()}`
        }
    }

    try {
        const response = await fetch(`https://api.attackontitanapi.com/locations${queries.value}`).then( r => r.json());
        
        pagesInfo.value = response.info
        locations.value = response.results;
        loading.value = false;

    } catch (error) {
        
        console.log(error)
        locations.value = null;
        loading.value = false;

    }
}

getLocations();

// Filter dropdown watchers
watch(region, ( newRegion ) => {
    if( newRegion === 'All' ) {
        region.value = null;
    } 

    newPage.value = 1;
    firstItem.value = 0;
    getLocations();
})

watch(territory, ( newTerritory ) => {
    if( newTerritory === 'All' ) {
        territory.value = null;
    } 

    newPage.value = 1;
    firstItem.value = 0;
    getLocations();
})

// Filter methods
const toggleShowFilters = () => {
    showFilters.value = !showFilters.value
}

const clearFilters = () => {
    search.value = '';
    region.value = '';
    territory.value = '';
}

// Search method
const searchLocations = () => {
    newPage.value = 1;
    firstItem.value = 0;

    getLocations();
}

// Pagination methods
const onPaginate = ( event ) => {
    firstItem.value = event.first;
    newPage.value = event.page + 1;
    getLocations();
    scrollToTopRough();
}

</script>

<template>
    <div class="w-full my-4">
        <h2 class="text-2xl lg:text-3xl text-[#D8D8D8] uppercase font-montserrat font-bold text-center mb-6">Locations</h2>

        <div class="mx-auto w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl flex mb-2">
            <input
              v-model="search"
              id="search"
              type="search"
              placeholder="Search name or code..."
              class="grow py-3 bg-[#202020] px-2 min-[350px]:px-4 rounded-s-lg text-sm lg:text-base"
              @keyup.enter="searchLocations"  
            >
            
            
            <button
              class="bg-[#202020] px-3 rounded-e-lg border-s border-s-2 border-[#000000]"
              @click="searchLocations"  
            >
            
                <Icon
                  icon="bx:search-alt-2"
                  class="w-6 h-6"
                />
            </button>
        </div>

        <div>
            <div class="flex justify-center flex-wrap gap-2 md:max-w-lg lg:max-w-xl xl:max-w-2xl md:mx-auto" v-if="showFilters">
                <Dropdown
                  v-model="region"
                  :options="filtersList.regionsList"
                  placeholder="Region"
                  class="grow md:min-w-sm rounded-lg"
                  :loading="loading"
                />
    
                <Dropdown
                  v-model="territory"
                  :options="filtersList.territoriesList"
                  placeholder="Territory"
                  class="grow rounded-lg"
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
                  v-if="search || region || territory"
                >
                    Clear filters
                </button>
            </div>
        </div>
        

        <div v-if="!loading && locations" class="flex flex-col">

            <div class="py-12 lg:py-20 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 md:gap-x-10 gap-y-10 xl:gap-12 2xl:gap-16">
                <router-link
                    v-for="location in locations"
                    :key="location.id"
                    :to="{ name: 'locations-id', params: { id: location.id } }"
                    class="flex justify-center items-center"
                >
                    <LocationsCard
                        :name="location.name"
                        :img="location.img"
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