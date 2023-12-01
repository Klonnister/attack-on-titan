import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
          path: '',
          redirect: { name: 'home' },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: 'characters',
          name: 'characters',
          component: () => import('../views/CharactersView.vue'),
        },
        {
          path: 'characters/:id',
          name: 'character-id',
          component: () => import('../views/CharacterIdView.vue'),
          props: ( route ) => {
            const id = Number( route.params.id )
            return { id }
          }
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
