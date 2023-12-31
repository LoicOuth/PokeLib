<template>
  <h1>La stack technique</h1>
  <v-divider color="white" />
  <v-window v-model="tab" show-arrows class="w-100">
    <v-window-item v-for="(tech, index) in technologies" :key="index" class="pa-10">
      <div class="w-100 d-flex justify-center">
        <v-card class="pa-10" :class="mdAndDown ? 'w-100' : 'w-75'">
          <v-img :src="tech.logo" height="100px" />
          <v-card-title>
            <h3>{{ tech.name }}</h3>
          </v-card-title>
          <v-card-text :style="{ height: mdAndDown ? 'auto' : '150px' }">
            <p class="text-body-1">
              {{ tech.description }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" variant="text" :href="tech.source" target="_blank">Visiter {{ tech.name }}</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
const { mdAndDown } = useDisplay();

const tab = ref(0);

const technologies = ref([
  {
    name: 'Vue.js 3',
    description:
      'Vue.js est un framework JavaScript moderne et progressif, apprécié pour sa simplicité et sa flexibilité. Il permet de construire des interfaces utilisateur interactives de manière efficace, en adoptant une approche basée sur les composants réutilisables. Son architecture réactive facilite la mise à jour dynamique des données, offrant ainsi une expérience utilisateur fluide et réactive.',
    logo: '/images/vue-logo.png',
    source: 'https://vuejs.org/',
  },
  {
    name: 'Vuetify',
    description:
      "Vuetify est une bibliothèque de composants pour Vue.js, qui vise à simplifier le développement d'interfaces utilisateur élégantes et responsives. Elle offre une grande variété de composants pré-construits, tels que des boutons, des barres de navigation, des cartes et bien plus encore, tout en suivant les principes du Material Design. Grâce à Vuetify, la création d'applications au design professionnel devient plus rapide et cohérente.",
    logo: '/images/vuetify-logo.svg',
    source: 'https://vuetifyjs.com/en/',
  },
  {
    name: 'Pinia',
    description:
      "Pinia est un puissant gestionnaire d'état pour les applications Vue.js, offrant une alternative légère et performante à Vuex. Basé sur les fonctionnalités modernes de Vue 3, Pinia favorise une gestion d'état claire et structurée via des stores (magasins) fortement typés, permettant ainsi de gérer de manière efficace l'état global de votre application. Grâce à sa simplicité et à sa compatibilité avec les dernières avancées de Vue.js, Pinia contribue à créer des applications bien organisées, maintenables et évolutives.",
    logo: '/images/pinia-logo.png',
    source: 'https://pinia.vuejs.org/',
  },
  {
    name: 'NestJS',
    description:
      "NestJS est un framework de développement d'applications serveur, conçu pour créer des applications Node.js évolutives et robustes. Il adopte une architecture basée sur les modules, l'injection de dépendances et le support natif de TypeScript. NestJS facilite la création de services, de contrôleurs, de modules, et propose une intégration fluide avec des bibliothèques et des ORM populaires comme TypeORM. Grâce à sa structure modulaire et à son écosystème florissant, NestJS est un choix populaire pour développer des API performantes et bien organisées.",
    logo: '/images/nest-logo.svg',
    source: 'https://nestjs.com/',
  },
  {
    name: 'Prisma',
    description:
      "Prisma est un outil de gestion de base de données qui facilite l'interaction entre votre application et la base de données. Il offre un ORM (Object-Relational Mapping) moderne et puissant, permettant de manipuler les données de manière intuitive à l'aide de langages de programmation comme TypeScript. Prisma prend en charge plusieurs bases de données, notamment PostgreSQL, MySQL, SQLite et SQL Server, et facilite la gestion des migrations de base de données. Grâce à sa syntaxe déclarative et à ses fonctionnalités avancées, Prisma simplifie le processus d'accès et de manipulation de données, améliorant ainsi l'efficacité et la sécurité de vos applications backend.",
    logo: '/images/prisma-logo.png',
    source: 'https://www.prisma.io/',
  },
]);
</script>
