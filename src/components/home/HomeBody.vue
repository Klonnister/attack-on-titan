<script setup>
import { homeLinks } from '@/composables/useLinks'

const useHomeLinks = homeLinks
</script>

<template>
    <div class="flex flex-col">
        
        <h1 class="mt-12 sm:mt-16 lg:mt-20 text-xl sm:text-2xl lg:text-3xl text-[#D8D8D8] uppercase font-montserrat font-bold text-center">Shingeki no Kyojin</h1>

        <div class="my-10 sm:my-16 text-sm md:text-base text-justify leading-8 sm:leading-9 md:leading-10">
            <img
                src="/portrait.jpeg"
                alt=""
                class="w-full sm:w-72 md:w-80 lg:w-96 2xl:w-[25rem] xl:w-80 mb-12 sm:mb-0 sm:ms-7 lg:ms-10 2xl:ms-20 sm:float-right sm:py-2"
            >

            <p class="mb-10 sm:mb-6 md:mb-8">
                Attack on Titan (Japanese: 進撃の巨人, Hepburn: Shingeki no Kyojin 'The Attacking Giant') is a Japanese manga series written and illustrated by 

                <a
                    href="https://en.wikipedia.org/wiki/Hajime_Isayama"
                    class="text-[#FFFFFF]"
                >
                    Hajime Isayama
                </a>
                .
            </p>
    
            <p class="mb-10 sm:mb-6 md:mb-8">
                It is set in a post-apocalyptic world where the remains of humanity live behind walls protecting them from giant humanoid Titans, Attack on Titan follows protagonist Eren Yeager, along with friends Mikasa Ackerman and Armin Arlert. When a Colossal Titan breaches the wall of their hometown, Titans destroy the city and eat Eren's mother. Vowing vengeance, Eren joins the elite Survey Corps, a group of soldiers who fight against Titans. It chronicles Eren's journey with the Survey Corps as they fight against the Titans while investigating their origin and history.
            </p>

            <p>
                An anime television series was produced by Wit Studio (seasons 1-3) and MAPPA (season 4). The series premiered on April 7, 2013, and concluded on November 5, 2023.  In North America, the series has been streamed on Crunchyroll, Funimation, and Hulu. Attack on Titan has also aired on Adult Swim's Toonami programming block in the United States.
            </p>
        </div>

        <div class="my-10 sm:my-16 w-full text-xs text-center flex flex-col gap-2">
            <iframe
              class="w-full h-64 min-[475px]:h-96 lg:h-[28rem] xl:h-[31rem]"
              src="https://www.youtube.com/embed/LV-nazLVmgo?si=B41_14QtFp3KBHee"
              title="Youtube Video Player"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            >
            </iframe>
            
            <p>
                Season 1 fan-made trailer by 
                <a
                  href="https://www.youtube.com/@BRASStv"
                  class="text-[#FFFFFF]"
                >
                  BRASStv
                </a>
            </p>
        </div>

        <div class="my-12 sm:my-16 lg:my-20 text-center flex flex-col gap-8">
            
            <h2 class="font-montserrat font-bold text-xl md:text-2xl text-[#D8D8D8] uppercase">What you'll find here</h2>
            <p class="text-sm md:text-base text-justify leading-8 sm:leading-9 md:leading-10 sm:text-center">Select one of the options below to start browsing. Note that the information shown on this page is up to the second to last episode of the anime.</p>

            <div class="my-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-8">
                <router-link
                    v-for="link in useHomeLinks"
                    :key="link.id"
                    :to="link.url"
                >
                    <div
                      :class="`w-full h-48 sm:h-36 md:h-48 lg:h-56 hover:lg:h-60 xl:h-44 hover:xl:h-[11.5rem] bg-no-repeat bg-cover bg-center rounded-3xl mb-3 transition-all duration-500 ease-out ${link.id}`"
                      alt=""
                    ></div>
                    <p class="text-[13px] min-[475px]:text-sm xl:text-base font-montserrat uppercase font-semibold">{{ link.name }}</p>
                </router-link>
            </div>
        </div>

        <div class="my-8 xl:my-12 text-center flex flex-col gap-6 text-sm md:text-base text-justify leading-8 sm:leading-9 md:leading-10">
            <h2 class="font-montserrat font-bold text-center text-xl md:text-2xl text-[#D8D8D8] uppercase">Where to watch</h2>

            <div class="my-8 md:my-12 xl:my-16 flex justify-center items-center gap-6 sm:gap-12 lg:gap-20 xl:gap-24">
                <a href="https://www.crunchyroll.com/es-es/series/GR751KNZY/attack-on-titan">
                    <img src="/crunchyroll.png" alt="" class="w-20 sm:w-28 hover:sm:rotate-[-4deg] transition-all ease-in-out duration-300 h-auto">
                </a>
                <a href="https://www.amazon.com/-/es/gp/video/detail/B00NL5MRRU/ref=atv_dp_season_select_s101?language=es">
                    <img src="/primevideo.png" alt="" class="w-32 sm:w-48 hover:sm:rotate-[-4deg] transition-all ease-in-out duration-300">
                </a>
            </div>

            <p>
                Since its debut in 2013, Attack on Titan has received widespread critical acclaim, multiple accolades, and is considered as one of the greatest anime series of all time. Critics and audiences have praised the show for its storytelling, animation, action sequences, characters, voice acting (both original and dubbed), soundtrack and dark themes. The show is noted for its appeal beyond its genre and enormous global popularity, being cited as key in bringing anime into mainstream culture.
            </p>
        </div>
    </div>
</template>

<style scoped>
.characters {
    background-image: url('/characters.gif');
}

.episodes {
    background-image: url('/episodes.gif');
}

.locations {
    background-image: url('/locations.gif');
}

.titans {
    background-image: url('/titans.gif');
}

@media screen and (min-width: 1024px) {
    .characters {
        background-image: url('/characters-gray.jpg');
    }

    .characters:hover {
        background-image: url('/characters.gif');
    }

    .episodes {
        background-image: url('/episodes-gray.jpg');
    }

    .episodes:hover {
        background-image: url('/episodes.gif');
    }

    .locations {
        background-image: url('/locations-gray.jpg');
    }

    .locations:hover {
        background-image: url('/locations.gif');
    }

    .titans {
        background-image: url('/titans-gray.jpg');
    }

    .titans:hover {
        background-image: url('/titans.gif');
    }
}

</style>