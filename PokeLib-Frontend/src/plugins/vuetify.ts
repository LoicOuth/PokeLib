import '@mdi/font/css/materialdesignicons.css';
import { createVuetify, type ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VBtn } from 'vuetify/components';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const myCustomDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#303030',
    surface: '#303030',
    primary: '#30A7D7',
    secondary: '#FFDE00',
    error: '#FF0000',
    info: '#3B4CCA',
    success: '#4CAF50',
    warning: '#FFC107',
    'on-background': '#FFFFFF',
    'on-surface': '#FFFFFF',
  },
};

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myCustomDarkTheme',
    themes: {
      myCustomDarkTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
});

export const liteVuetify = createVuetify({
  theme: {
    defaultTheme: 'myCustomDarkTheme',
    themes: {
      myCustomDarkTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components: { VBtn },
});
