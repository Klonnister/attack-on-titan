<script setup>
import { ref } from 'vue';
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
const location =  ref(null);
const fixedLink = ref(null);

const getEpisode = async() => {
    try {
        loading.value = true;
        const response = await fetch(`https://api.attackontitanapi.com/locations/${props.id}`).then( r => r.json() )
    
        if( !Array.isArray( response ) ) {
            location.value = response;
            fixedLink.value = fixLink( location.value.img );
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
        <div class="flex flex-col gap-20 md:gap-28 w-full max-w-xl" v-if="!loading && location">
            <div class="flex flex-col gap-4 text-center items-center font-montserrat max-w-lg mx-auto">
                <p class="font-montserrat text-lg md:text-2xl mb-4 uppercase font-semibold">
                    {{ location.name }}
                </p>
                <img
                  :src="fixedLink ? fixedLink : 'noimagewide.jpg'"
                  alt=""
                  class=""
                >
                
            </div>

            <!-- <EpisodeCharacters
                v-if="episode.characters.length"
                :members="episode.characters"
            /> -->
        </div>
    </div>
</template>