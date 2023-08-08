<template>
  <v-dialog v-model="loginDialog" transition="dialog-top-transition" width="30vw">
    <template v-slot:activator="{ props }">
      <v-btn v-if="!mdAndDown" color="secondary" variant="flat" prepend-icon="mdi-login" v-bind="props">
        Se connecter
      </v-btn>
      <v-btn v-else color="secondary" variant="flat" icon="mdi-login" v-bind="props" />
    </template>
    <v-card>
      <v-tabs v-model="tab" class="w-100" color="secondary" fixed-tabs>
        <v-tab value="login">
          <v-icon class="mr-3" icon="mdi-login" />
          Se connecter
        </v-tab>
        <v-tab value="register">
          <v-icon class="mr-3" icon="mdi-account-plus" />
          S'enregistrer
        </v-tab>
      </v-tabs>

      <div class="pa-10">
        <v-window v-model="tab" class="w-100 pa-5">
          <v-window-item value="login">
            <LoginComponent />
          </v-window-item>
          <v-window-item value="register">
            <RegisterComponent @go-to-login="goToLoginTab()" />
          </v-window-item>
        </v-window>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import LoginComponent from './LoginComponent.vue';
import RegisterComponent from './RegisterComponent.vue';

const { mdAndDown } = useDisplay();

const loginDialog = ref(false);
const tab = ref('login');

const goToLoginTab = () => {
  tab.value = 'login';
};
</script>
