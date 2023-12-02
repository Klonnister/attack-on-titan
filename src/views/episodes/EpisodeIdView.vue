<script setup>
import { ref } from 'vue';
import fixLink from '@/composables/useFixLink';
import trailersList from '@/composables/useTrailersList';
import { useRouter } from 'vue-router';

const props = defineProps({
    id: {
        type: [String, Number],
        required: true,
    }
})

const router = useRouter();
const loading = ref(true);
const episode =  ref(null);
const fixedLink = ref(null);
const season = ref(null)

const getEpisode = async() => {
    try {
        loading.value = true;
        const response = await fetch(`https://api.attackontitanapi.com/episodes/${props.id}`).then( r => r.json() )
    
        if( !Array.isArray( response ) ) {
            episode.value = response;
            season.value = episode.value.episode.slice( 0, 2 );
            fixedLink.value = fixLink( episode.value.img );
            loading.value = false;
        } else {
            router.push( { name: 'not-found' } )
        }
    } catch (error) {
        console.log( error );
        router.push( { name: 'not-found' } )
    }
}
getEpisode();

</script>

<template>
    <div class="w-full my-8 flex justify-center">
        <div class="flex flex-col gap-20 md:gap-28 w-full max-w-xl" v-if="!loading && episode">
            <div class="flex flex-col gap-4 text-center items-center font-montserrat max-w-lg mx-auto">
                <p class="font-montserrat text-lg md:text-2xl mb-4 uppercase font-semibold">
                    <span class="text-white font-semibold"> {{ episode.episode }} </span>
                    {{ episode.name }}
                </p>
                <img
                  :src="fixedLink"
                  alt=""
                  class="w-full max-w-[16rem]"
                >
                
            </div>

            <div class="text-center flex flex-col gap-4">
                <p class="font-semibold font-montserrat text-center uppercase text-base md:text-lg lg:text-xl">Where to watch</p>

                <div class="mt-6 flex justify-center items-center gap-6 sm:gap-12 lg:gap-20 xl:gap-24">
                    <a href="https://www.crunchyroll.com/es-es/series/GR751KNZY/attack-on-titan">
                        <img src="/crunchyroll.png" alt="" class="w-20 sm:w-24 hover:rotate-[-4deg] hover:scale-105 transition-all ease-in-out duration-300 h-auto">
                    </a>
                    <a href="https://www.amazon.com/-/es/gp/video/detail/B00NL5MRRU/ref=atv_dp_season_select_s101?language=es">
                        <img src="/primevideo.png" alt="" class="w-32 sm:w-40 hover:rotate-[-4deg] hover:scale-105 transition-all ease-in-out duration-300">
                    </a>
                </div>
            </div>

            <div class="w-full text-xs text-center flex flex-col gap-4">
                <h2 class="font-semibold lg:mb-16 font-montserrat text-center uppercase text-base md:text-lg lg:text-xl">Season trailer</h2>

                <div>
                    <iframe
                    class="w-full h-56 min-[475px]:h-80 lg:h-80"
                    :src="trailersList[season].url"
                    title="Youtube Video Player"
                    frameborder="0"
                    allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    >
                    </iframe>
                    
                    <p class="text-sm mt-2" v-if="trailersList[season].type === 'fanmade'">
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

            <EpisodeCharacters
                v-if="episode.characters.length"
                :members="episode.characters"
            />
        </div>
    </div>
</template>