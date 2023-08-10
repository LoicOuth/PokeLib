import AppLayout from '@/layouts/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: () => import('../views/PokedexView.vue'),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/pokedex/:name',
      name: 'pokemon-detail',
      component: () => import('../views/PokemonDetail.vue'),
      meta: {
        layout: AppLayout,
      },
    },
  ],
});

export default router;
