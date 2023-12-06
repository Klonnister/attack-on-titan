<script setup>
import useFiltersList from '@/composables/useFiltersList';
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';
import { scrollToTopRough } from '@/composables/useScroll'

// Response data
const loading = ref(true);
const titans = ref(null);
const pagesInfo = ref(null);

// Filters variables
const filtersList = useFiltersList;
const showFilters = ref( false );
const search = ref('')
const allegiance = ref(null);

// Paginator variables
const newPage = ref(1);
const firstItem = ref(0);

// Titans request to API
const getTitans = async () => {
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

    if ( allegiance.value ) {
        if( queries.value.startsWith('?') ) {
            queries.value = queries.value + '&allegiance=' + allegiance.value.toLowerCase();
        } else {
            queries.value = `?allegiance=${allegiance.value.toLowerCase()}`
        }
    }
    try {
        const response = await fetch(`https://api.attackontitanapi.com/titans${queries.value}`).then( r => r.json() );
    
        titans.value = response.results;
        pagesInfo.value = response.info;
        loading.value = false;
        scrollToTopRough();

    } catch (error) {
        titans.value = null;
        loading.value = false;
    }
}

getTitans();

// Filter dropdown watchers
watch(allegiance, ( newAllegiance ) => {
    if( newAllegiance === 'All' ) {
        allegiance.value = null
    }

    newPage.value = 1;
    firstItem.value = 0
    getTitans();
})

// Filters methods
const toggleShowFilters = () => {
    showFilters.value = !showFilters.value
}

const clearFilters = () => {
    search.value = ''
    allegiance.value = null;
    newPage.value = 1;
    getTitans();
}

// Search method
const searchTitan = () => {
    newPage.value = 1;
    firstItem.value = 0;

    getTitans();
}

// Paginate method
const onPaginate = ( event ) => {
    newPage.value = event.page + 1;
    firstItem.value = event.first;

    getTitans();
}

</script>

<template>
    
    <div class="w-full my-4">
        <h2 class="text-2xl lg:text-3xl text-[#D8D8D8] uppercase font-montserrat font-bold text-center mb-6">Titans</h2>

        <div class="mx-auto w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl flex mb-2">
            <input
              v-model="search"
              id="search"
              type="search"
              placeholder="Search name..."
              class="grow py-3 bg-[#202020] px-2 min-[350px]:px-4 rounded-s-lg text-sm lg:text-base"
              @keyup.enter="searchTitan"
            >
            <button
              class="bg-[#202020] px-3 rounded-e-lg border-s border-s-2 border-[#000000]"
              @click="searchTitan"
            >
                <Icon
                  icon="bx:search-alt-2"
                  class="w-6 h-6"
                />
            </button>
        </div>

        <div>
            <Transition name="fade">
                <div class="flex justify-center flex-wrap gap-2 sm:max-w-xs md:mx-auto" v-if="showFilters">
                    <Dropdown
                      v-model="allegiance"
                      :options="filtersList.allegiancesList"
                      placeholder="Allegiance"
                      class="grow md:min-w-sm rounded-lg"
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
                  v-if="allegiance || search"
                >
                    Clear filters
                </button>
            </div>
        </div>
        

        <div v-if="!loading && titans" class="flex flex-col">
            <div class="py-10 lg:py-20 grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-12 xl:gap-20">
                <router-link
                    v-for="titan in titans"
                    :key="titan.id"
                    :to="{ name: 'titans-id', params: { id: titan.id } }"
                >
                    <CharacterCard 
                        :name="titan.name"
                        :img="titan.img || '' "
                        :status="titan.status"
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