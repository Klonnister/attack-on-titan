<script setup>
import { ref, watch } from 'vue';
import fixLink from '@/composables/useFixLink';
import useScroll from '@/composables/useScroll'
import { useRouter } from 'vue-router'

const props = defineProps({
    id: Number
})

const router = useRouter();
const scrollToTop = useScroll;
const loading = ref(true);
const fixedLink = ref(null);
const titan = ref(null);
const currentInheritor = ref(null)


const getTitan = async() => {
    loading.value = true;

    try {
        const resp = await fetch(`https://api.attackontitanapi.com/titans/${props.id}`).then( r => r.json() )

        const current = await fetch( resp.current_inheritor ).then( r => r.json() )
        
        if( !Array.isArray(resp) ) {

            titan.value = resp
            currentInheritor.value = current
            fixedLink.value = fixLink( titan.value.img );
            loading.value = false;
            
        } else {
            router.push( { name: 'not-found'} )
        }
    } catch (error) {
        router.push( { name: 'not-found'} )
    }

}

getTitan();

watch( () => props.id, () => {
    scrollToTop();
    getTitan();
})

</script>

<template>
    <div class="w-full my-10 flex justify-center">
        <div v-if="!loading" class="w-full flex flex-col gap-8 lg:gap-16 items-center justify-center lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"> 
            <div class="flex flex-col gap-6 lg:col-span-2">
                <div class="relative flex justify-center items-center">               
                    <img
                      v-if="titan"
                      :src="fixedLink ? fixedLink : '/noimage.jpg'"
                      alt=""
                      class="w-56 lg:w-64"
                    >
        
                    <span class="text-sm font-martel absolute" v-if="!fixedLink">
                        No image
                    </span>
                </div>

                <p class="font-montserrat text-xl md:text-2xl mb-4 uppercase font-bold text-center"> {{  titan.name }} </p>
            </div>

            <div class="w-full h-full grid grid-cols-1 min-[350px]:grid-cols-2 gap-2">
                <div
                    v-if="titan.height"
                    class="bg-[#232323] p-4 lg:p-8 flex flex-col"
                    :class="{ 'col-span-2': !titan.allegiance }"
                >
                    <p class="mb-2 font-montserrat text-center md:text-lg lg:text-xl">Height</p>

                    <p class="text-sm font-montserrat md:text-base text-center text-white">
                        {{ titan.height }}
                    </p>
                </div>

                <div
                    v-if="titan.height"
                    class="bg-[#232323] p-4 lg:p-8 flex flex-col"
                    :class="{ 'col-span-2': !titan.allegiance }"
                >
                    <p class="mb-2 font-montserrat text-center md:text-lg lg:text-xl">Allegiance</p>
                    
                    <p class="text-sm md:text-base text-center text-white">
                        {{ titan.allegiance }}
                    </p>
                </div>

                <div
                    v-if="titan.abilities"
                    class="bg-[#232323] p-4 lg:p-8 flex flex-col items-center justify-center"
                    :class="{ 'col-span-2': !titan.current_inheritor }"
                >
                    <p class="mb-2 font-montserrat text-center md:text-lg lg:text-xl">Abilities</p>
                    
                    <ul>
                        <li
                            v-for="ability in titan.abilities"
                            :key="ability"
                            class="text-sm mb-3 md:text-base text-center text-white"
                        >
                            {{ ability }}
                        </li>
                    </ul>
                </div>

                <div
                    v-if="titan.current_inheritor"
                    class="bg-[#232323] p-4 lg:p-8 flex flex-col justify-center items-center"
                    :class="{ 'col-span-2': !titan.abilities.length }"
                >
                    <p class="mb-2 lg:mb-6 font-montserrat mb-5 text-center md:text-lg lg:text-xl">Current Inheritor</p>
                    
                    <router-link
                      :to=" { name: 'character-id', params: { id: currentInheritor.id } } "
                    >
                        <RelatedCard 
                            :name="currentInheritor.name"
                            :img="currentInheritor.img || '' "
                            :status="currentInheritor.status"
                        />
                    </router-link>
                </div>
            </div>

            <RelatedCharacters
                title="Former inheritors"
                v-if="titan.former_inheritors.length"
                :members="titan.former_inheritors"
            />
        </div>
    </div>
</template>