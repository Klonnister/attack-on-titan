import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },

    {
      path: '/',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../layouts/BrowsingLayout.vue'),
      children: [
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/about/AboutView.vue')
        },

        {
          path: 'characters',
          name: 'characters',
          component: () => import('../views/characters/CharactersView.vue'),
        },

        {
          path: 'characters/:id',
          name: 'character-id',
          component: () => import('../views/characters/CharacterIdView.vue'),
          props: ( route ) => {
            const id = Number( route.params.id )
            return { id }
          }
        },

        {
          path: 'episodes',
          name: 'episodes',
          component: () => import('../views/episodes/EpisodesView.vue')
        },

        {
          path: 'episodes/:id',
          name: 'episodes-id',
          component: () => import('../views/episodes/EpisodeIdView.vue'),
          props: ( route ) => {
            const id = route.params.id;
            return { id }
          }
        },

        {
          path: 'locations',
          name: 'locations',
          component: () => import('../views/locations/LocationsView.vue')
        },


        {
          path: '',
          redirect: { name: 'home' },
        },

        {
          path: '/:pathMatch(.*)*',
          name: 'not-found',
          component: () => import('../views/NotFound.vue')
        }
      ]
    },
  ]
})

export default router
