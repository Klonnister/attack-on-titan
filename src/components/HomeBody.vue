<script setup>
import { homeLinks } from '@/composables/useLinks'

const useHomeLinks = homeLinks
</script>

<template>
    <div class="flex flex-col">
        <h1 class="mt-12 text-2xl text-[#D8D8D8] uppercase font-montserrat font-bold text-center">Shingeki no Kyojin</h1>

        <img
          src="/portrait.jpeg"
          alt=""
          class="w-full mt-10"
        >

        <div class="flex flex-col gap-7 my-10 px-10 text-sm text-justify leading-8">
            <p>
                Attack on Titan (Japanese: 進撃の巨人, Hepburn: Shingeki no Kyojin 'The Attacking Giant') is a Japanese manga series written and illustrated by 

                <a
                  href="https://en.wikipedia.org/wiki/Hajime_Isayama"
                  class="text-[#FFFFFF]"
                >
                    Hajime Isayama
                </a>
                .
            </p>
    
            <p>
                It is set in a post-apocalyptic world where the remains of humanity live behind walls protecting them from giant humanoid Titans, Attack on Titan follows protagonist Eren Yeager, along with friends Mikasa Ackerman and Armin Arlert. When a Colossal Titan breaches the wall of their hometown, Titans destroy the city and eat Eren's mother. Vowing vengeance, Eren joins the elite Survey Corps, a group of soldiers who fight against Titans. It chronicles Eren's journey with the Survey Corps as they fight against the Titans while investigating their origin and history.
            </p>

            <p>
                An anime television series was produced by Wit Studio (seasons 1-3) and MAPPA (season 4). The series premiered on April 7, 2013, and concluded on November 5, 2023.  In North America, the series has been streamed on Crunchyroll, Funimation, and Hulu. Attack on Titan has also aired on Adult Swim's Toonami programming block in the United States.
            </p>
        </div>

        <div class="my-10 w-full text-xs text-center">
            <iframe
              class="w-full h-56"
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

        <div class="my-12 px-10 text-center flex flex-col gap-8">
            <h2 class="font-montserrat font-bold text-xl text-[#D8D8D8] uppercase">What you'll find here</h2>
            <p class="text-sm text-justify leading-8">Select one of the options below to start browsing. If you haven't watched the anime series and are planning to, you might get 'spoilers' in these sections, so beware.</p>

            <div class="my-8 flex flex-col gap-12">
                <router-link
                    v-for="link in useHomeLinks"
                    :key="link.name"
                    :to="link.url"
                >
                    <img
                      class="w-full h-42 object-cover rounded-3xl mb-3"
                      :src="link.img"
                      alt=""
                    >
                    <p class="text-[13px] font-montserrat uppercase font-semibold">{{ link.name }}</p>
                </router-link>
            </div>
        </div>

        <div class="my-8 px-10 text-center flex flex-col gap-6 text-sm text-justify leading-8">
            <h2 class="font-montserrat font-bold text-center text-xl text-[#D8D8D8] uppercase">Where to watch</h2>

            <div class="my-8 flex justify-center items-center gap-6">
                <a href="https://www.crunchyroll.com/es-es/series/GR751KNZY/attack-on-titan">
                    <img src="/crunchyroll.png" alt="" class="w-20 h-auto">
                </a>
                <a href="https://www.amazon.com/-/es/gp/video/detail/B00NL5MRRU/ref=atv_dp_season_select_s101?language=es">
                    <img src="/primevideo.png" alt="" class="w-32">
                </a>
            </div>

            <p>
                Since its debut in 2013, Attack on Titan has received widespread critical acclaim, multiple accolades, and is considered as one of the greatest anime series of all time. Critics and audiences have praised the show for its storytelling, animation, action sequences, characters, voice acting (both original and dubbed), soundtrack and dark themes. The show is noted for its appeal beyond its genre and enormous global popularity, being cited as key in bringing anime into mainstream culture.
            </p>
        </div>
    </div>
</template>