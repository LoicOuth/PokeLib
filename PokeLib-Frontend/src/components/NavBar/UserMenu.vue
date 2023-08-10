<template>
  <v-menu min-width="200px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar
          size="large"
          :image="authStore.connectedUser?.avatar ? authStore.connectedUser?.avatar : '/default.png'"
        />
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <v-avatar
            size="large"
            :image="authStore.connectedUser?.avatar ? authStore.connectedUser!.avatar : '/default.png'"
          />
          <h3 class="mt-3">{{ authStore.connectedUser?.pseudo }}</h3>
          <p class="text-caption mt-1">
            {{ authStore.connectedUser?.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn rounded variant="text"> Edit Account </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-dialog v-model="logoutDialog" persistent width="auto" transition="dialog-top-transition">
            <template v-slot:activator="{ props }">
              <v-btn variant="text" prepend-icon="mdi-logout" v-bind="props"> Se déconnecter </v-btn>
            </template>
            <v-card>
              <v-card-text>Voulez-vous vraiment vous déconnectez ?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="logoutDialog = false"> Non </v-btn>
                <v-btn color="primary" variant="text" @click="handleLogout()"> Oui </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const logoutDialog = ref(false);

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.resetConnection();
  logoutDialog.value = false;
};
</script>
