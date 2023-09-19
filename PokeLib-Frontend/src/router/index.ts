import { AlertBuilder } from '@/core/builders/alert.builder';
import AppLayout from '@/layouts/AppLayout.vue';
import { useAppData } from '@/stores/app-data';
import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';

enum GUARD {
  AUTH_GUARD,
  GOOGLE_ACCOUNT_GUARD,
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: (to) => {
        if (Object.keys(to.query).length) return { path: to.path, query: {}, hash: to.hash };
      },
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
      path: '/teams',
      name: 'teams',
      component: () => import('../views/TeamsView.vue'),
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
      path: '/account/:pseudo',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/account/myteams',
      name: 'my-teams',
      component: () => import('../views/MyTeamsView.vue'),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/account/myteams/:teamId',
      name: 'edit-team',
      component: () => import('../views/EditTeamView.vue'),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/rgpd',
      name: 'rgpd',
      component: () => import('../views/RgpdView.vue'),
      meta: {
        layout: AppLayout,
      },
    },
  ],
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  const appStore = useAppData();

  const guards: GUARD[] = (to.meta.guards as GUARD[]) ?? [];

  if (guards.length > 0) {
    if (guards.includes(GUARD.AUTH_GUARD))
      if (authStore.connectedUser === undefined) {
        appStore.setNewAlert(new AlertBuilder('Vous devez être connecté').buildWarning());
        return '/';
      }

    if (guards.includes(GUARD.GOOGLE_ACCOUNT_GUARD))
      if (authStore.connectedUser?.register_with_google === true) {
        appStore.setNewAlert(new AlertBuilder('Vous avez un compte google').buildWarning());
        return router.replace(from.fullPath);
      }
  }
});

export default router;
