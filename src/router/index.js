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
          name: 'characters-group',
          component: () => import('../views/characters/CharactersGroup.vue'),
          children: [
            {
              path: ':id',
              name: 'character-id',
              component: () => import('../views/characters/CharacterIdView.vue'),
              props: ( route ) => {
                const id = Number( route.params.id )
                return { id }
              }
            },

            {
              path: '',
              name: 'characters',
              component: () => import('../views/characters/CharactersView.vue'),
            },
          ],
        },

        {
          path: 'episodes',
          name: 'episodes',
          component: () => import('../views/episodes/EpisodesView.vue')
        },

        {
          path: 'locations',
          name: 'locations',
          component: () => import('../views/locations/LocationsView.vue')
        },

        {
          path: 'locations/:id',
          name: 'locations-id',
          component: () => import('../views/locations/LocationIdView.vue'),
          props: ( route ) => {
            const id = Number(route.params.id)
            return { id }
          }
        },

        {
          path: 'titans',
          name: 'titans',
          component: () => import('../views/titans/TitansView.vue'),
        },

        {
          path: 'titans/:id',
          name: 'titans-id',
          component: () => import('../views/titans/TitanIdView.vue'),
          props: ( route ) => {
            const id = Number(route.params.id)
            return { id }
          }
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
