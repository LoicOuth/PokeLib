import './assets/main.scss';
import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { vuetify, liteVuetify } from './plugins/vuetify';
import SplashScreenVue from './components/General/SplashScreen.vue';
import { useAppData } from './stores/app-data';

const useCreateMyApp = () => createApp(App);
const pinia = createPinia();
const appData = useAppData(pinia);

const useCreateSplashApp = () => createApp(SplashScreenVue);
const splashApp = useCreateSplashApp();
splashApp.use(pinia);
splashApp.use(liteVuetify);
splashApp.mount('#splash');

const unWatch = watch(
  () => appData.dataIsFetching,
  (value) => {
    if (value) {
      unWatch();
      splashApp.unmount();

      const app = useCreateMyApp();

      app.use(router);
      app.use(pinia);
      app.use(vuetify);
      app.mount('#app');
    }
  },
);
