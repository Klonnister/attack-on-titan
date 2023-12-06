<script setup>
import { Icon } from '@iconify/vue';
import Paginator from 'primevue/paginator';
import { ref, watch } from 'vue';
import trailersList from '@/composables/useTrailersList';
import useFiltersList from '@/composables/useFiltersList';
import scrollToTop from '@/composables/useScroll'

const loading = ref(true);

// Request information
const pagesInfo = ref(null);
const episodes = ref(null);

// Filters variables
const filtersList = useFiltersList;
const search = ref(null);
const season = ref('Season 1');

// Season requests
const prevSeason = ref( 0 )
const nextSeason = ref( 2 )

// Paginator variables
const newPage = ref(1);
const firstItem = ref(0);

// Episode api request
const getEpisodes = async() => {
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
            queries.value = queries.value + '&episode=' + filtersList.seasonsList.values[filtersList.seasonsList.names.indexOf(season.value)];
        } else {
            queries.value = `?episode=${filtersList.seasonsList.values[filtersList.seasonsList.names.indexOf(season.value)]}`
        }
    }

    try {
    
        const response = await fetch(`https://api.attackontitanapi.com/episodes${queries.value}`).then( r => r.json());
        
        pagesInfo.value = response.info
        episodes.value = response.results;
        loading.value = false;   

    } catch (error) {
        
        episodes.value = null;
        loading.value = false;

    }

}

getEpisodes();

// Dropdown filter watchers
watch(season, ( newSeason ) => {
    if( newSeason === 'All' ) {
        season.value = null;
    } 

    newPage.value = 1;
    firstItem.value = 0;
    getEpisodes();
}) 

// Search request
const clearFilters = () => {
    newPage.value = 1;
    firstItem.value = 0;
    search.value = ''

    getEpisodes();
}

// Search request
const searchEpisodes = () => {
    newPage.value = 1;
    firstItem.value = 0;

    getEpisodes();
}

// Pagination requests
const onPaginate = ( event ) => {
    firstItem.value = event.first;
    newPage.value = event.page + 1;
    

    getEpisodes();
    scrollToTop();
}


const getNextSeason = () => {
    if( nextSeason.value <= 4 ) {
        search.value = '';
        season.value = `Season ${ nextSeason.value }`;
        prevSeason.value = prevSeason.value + 1;
        nextSeason.value = nextSeason.value + 1;
        getEpisodes();
    }
}

const getPrevSeason = () => {
    if( prevSeason.value ) {
        search.value = '';
        season.value = `Season ${ prevSeason.value }`;
        prevSeason.value = prevSeason.value - 1;
        nextSeason.value = nextSeason.value - 1;
        getEpisodes();
    }
}

</script>

<template>
    <div class="my-8 w-full flex flex-col gap-28">
            
        <div class="w-full text-xs text-center flex flex-col items-center gap-8">
            <div class="flex items-center mb-10 gap-8">
                <button
                  class="p-3 rounded-full transition-all ease-in-out duration-300"
                  :class=" { 'hover:bg-[#232323]': prevSeason } "
                  @click="getPrevSeason"
                >
                    <Icon 
                      icon="ep:arrow-left-bold"
                      class="w-4 h-4"
                      :class="prevSeason ? 'text-[#C0C1C3]' : 'text-[#606060]'"
                    />
                </button>

                <h2 class="text-2xl lg:text-3xl text-[#D8D8D8] uppercase font-montserrat 
                font-bold text-center"> {{ season }} </h2>

                <button
                  class="p-3 rounded-full transition-all ease-in-out duration-300"
                  :class=" { 'hover:bg-[#232323]': nextSeason <= 4 } "
                  @click="getNextSeason"
                >
                    <Icon 
                      icon="ep:arrow-right-bold"
                      class="w-4 h-4 text-[#C0C1C3]"
                      :class="nextSeason <= 4 ? 'text-[#C0C1C3]' : 'text-[#606060]'"
                    />
                </button>
            </div>

            <p class="font-semibold font-montserrat text-center uppercase text-base md:text-lg lg:text-xl">Trailer</p>

            <div class="w-full max-w-xl flex flex-col items-center">
                <iframe
                class="w-full h-56 min-[475px]:h-80 lg:h-80"
                :src="trailersList[season].url"
                title="Youtube Video Player"
                frameborder="0"
                allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                >
                </iframe>
                
                <p class="text-sm mt-4" v-if="trailersList[season].type === 'fanmade'">
                    {{ trailersList[season].title }}
                    fan-made trailer by
                    <a
                    :href="trailersList[season].channel"
                    class="text-[#FFFFFF]"
                    >
                    {{ trailersList[season].author }}
                    </a>
                </p>

                <p class="text-sm mt-2" v-else>
                    {{ trailersList[season].title }}
                    Official Trailer
                </p>
            </div>

        </div>

        <div class="flex flex-col gap-12 lg:gap-14">
            <div class="flex flex-col gap-4">
                <p class="font-semibold font-montserrat text-center uppercase text-base md:text-lg lg:text-xl mb-4" id="listTitle">Episodes list</p>

                <div class="mx-auto w-full md:max-w-lg 2xl:max-w-xl flex">
                    <input
                        v-model="search"
                        id="search"
                        type="search"
                        placeholder="Search name..."
                        class="grow py-2 bg-[#202020] px-2 min-[350px]:px-4 rounded-s-lg text-sm lg:text-base"
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

                <button
                  v-if="search"
                  class="px-2 py-1 rounded-lg text-sm w-max mx-auto"
                  @click="clearFilters"
                >
                    Clear filters
                </button>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 md:gap-x-10 gap-y-10 xl:gap-12 2xl:gap-16" v-if="!loading && episodes">
                <a
                    v-for="episode in episodes"
                    :key="episode.id"
                    href="https://www.crunchyroll.com/es-es/series/GR751KNZY/attack-on-titan"
                    target="_blank"
                    class="flex justify-center"
                >
                    <EpisodeCard 
                        :code="episode.episode"
                        :name="episode.name"
                        :img="episode.img"
                    />  
                </a>
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
    </div>
</template>