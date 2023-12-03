<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import fixLink from '@/composables/useFixLink';
import { useRouter } from 'vue-router';

const props = defineProps({
    id: {
        type: [String, Number],
        required: true,
    }
})

const router = useRouter();
const loading = ref(true);
const fixedLink = ref(null);
const location =  ref(null);
const debut = ref(null);

const getEpisode = async() => {
    try {
        loading.value = true;
        const response = await fetch(`https://api.attackontitanapi.com/locations/${props.id}`).then( r => r.json() );
    
        if( !Array.isArray( response ) ) {
            location.value = response;            
            
            if( location.value.debut.startsWith('https') ) {
                const episode = await fetch( location.value.debut ).then( r => r.json() );
                debut.value = episode;
            }

            if( location.value.img !== 'unknown' ) {
                fixedLink.value = fixLink( location.value.img );
            }

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
        <div class="flex flex-col gap-16 md:gap-20 w-full max-w-xl" v-if="!loading && location">
            <div class="flex flex-col gap-4 text-center items-center font-montserrat max-w-lg mx-auto">
                <p class="font-montserrat text-lg md:text-2xl mb-4 uppercase font-semibold">
                    {{ location.name }}
                </p>

                <a
                  v-if="fixedLink"
                  :href="fixedLink"
                  class="relative flex justify-center items-center hover:scale-105 transition-all ease-in-out duration-300 img-hoverable"
                  target="_blank"
                >
                    <img
                      :src="fixedLink ? fixedLink : '/noimage.jpg'"
                      alt=""
                    >
                    <Icon
                        icon="mdi:eye"
                        class="absolute text-gray-700 w-8 h-8 opacity-40 transition-all ease-in-out duration-300 img-icon"
                        v-if="fixedLink"
                    />
                </a>
                <div class="relative flex justify-center items-center" v-else>
                    <img
                      src="/noimagewide.jpg"
                      alt=""
                    >
        
                    <span class="text-sm font-martel absolute" v-if="!fixedLink">
                        No image
                    </span>
                </div>
                
            </div>

            <div class="w-full h-full grid grid-cols-1 min-[350px]:grid-cols-2 gap-2">
                <div
                    v-if="location.region"
                    class="bg-[#232323] p-3 lg:p-4 flex flex-col"
                    :class="{ 'col-span-2': !location.territory }"
                >
                    <p class="mb-1 font-montserrat text-center text-sm lg:text-base">Region</p>

                    <p class="text-sm font-montserrat lg:text-base text-center text-white">
                        {{ location.region }}
                    </p>
                </div>

                <div
                    v-if="location.territory"
                    class="bg-[#232323] p-3 lg:p-4 flex flex-col"
                    :class="{ 'col-span-2': !location.region }"
                >
                    <p class="mb-1 font-montserrat text-center text-sm lg:text-base">Territory</p>
                    
                    <p class="text-sm font-montserrat lg:text-base text-center text-white">
                        {{ location.territory }}
                    </p>
                </div>
            </div>
            
            <div class="flex flex-col items-center w-full lg:col-span-2" v-if="debut">
                <p class="font-semibold mb-8 md:mb-14 lg:mb-16 font-montserrat text-center uppercase text-base md:text-lg lg:text-xl">
                    Debut
                </p>

                <EpisodeCard 
                    :code="debut.episode"
                    :name="debut.name"
                    :img="debut.img"
                />  
            </div>

            <RelatedCharacters
                title="Notable Inhabitants"
                v-if="location.notable_inhabitants.length"
                :members="location.notable_inhabitants"
            />

            <RelatedCharacters
                title="Notable Former Inhabitants"
                v-if="location.notable_former_inhabitants.length"
                :members="location.notable_former_inhabitants"
            />

        </div>
    </div>
</template>

<style scoped>
.img-hoverable:hover > .img-icon {
    opacity: 80%;
}
</style>