import { AlertBuilder } from '@/core/builders/alert.builder';
import AppLayout from '@/layouts/AppLayout.vue';
import { useAppData } from '@/stores/app-data';
import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';

enum GUARD {
  AUTH_GUARD,
}

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
    {
      path: '/account/edit',
      name: 'account-edit',
      component: () => import('../views/EditAccountView.vue'),
      meta: {
        layout: AppLayout,
        guards: [GUARD.AUTH_GUARD],
      },
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  const appStore = useAppData();

  const guards: GUARD[] = (to.meta.guards as GUARD[]) ?? [];

  if (guards.length > 0) {
    if (guards.includes(GUARD.AUTH_GUARD))
      if (authStore.connectedUser === undefined) {
        appStore.setNewAlert(new AlertBuilder('Vous devez être connecté').buildWarning());
        return '/';
      }
  }
});

export default router;
