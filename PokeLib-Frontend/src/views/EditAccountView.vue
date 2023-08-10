<template>
  <div class="d-flex justify-center">
    <v-card class="w-50 ma-10">
      <v-tabs v-model="tab" class="w-100" color="secondary" fixed-tabs>
        <v-tab value="general">
          <v-icon class="mr-3" icon="mdi-information" />
          Informations générales
        </v-tab>
        <v-tab value="security">
          <v-icon class="mr-3" icon="mdi-security" />
          Sécurité
        </v-tab>
      </v-tabs>

      <div class="pa-10">
        <v-window v-model="tab" class="w-100">
          <v-window-item value="general">
            <div class="d-flex flex-column mb-10 text-center align-center">
              <div class="avatar-edit" @click="handleChooseImage()">
                <v-avatar :image="authStore.connectedUser?.avatar || '/default.png'" size="80" />
                <v-icon class="icon-edit" icon="mdi-pencil" />
                <input ref="inputFile" type="file" @change="uploadImage" />
              </div>
              <span class="mt-3 text-caption"
                >Compte créer le : {{ new Date(authStore.connectedUser!.registered_at).toLocaleDateString() }}</span
              >
            </div>
            <GenericForm btn-label="Mettre à jour" :execute-fnc="() => {}">
              <v-text-field
                v-model="formData.pseudo"
                label="Entrer un pseudo"
                variant="outlined"
                prepend-inner-icon="mdi-account"
              />

              <v-text-field
                v-model="formData.email"
                label="Entrer un email"
                variant="outlined"
                prepend-inner-icon="mdi-email"
                :disabled="authStore.connectedUser?.register_with_google"
              />
            </GenericForm>
          </v-window-item>
          <v-window-item value="securoty"> </v-window-item>
        </v-window>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import GenericForm from '@/components/General/GenericForm.vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();

const initialFormData = { ...authStore.connectedUser };

const formData = ref(initialFormData);
const tab = ref('general');
const inputFile = ref();

const handleChooseImage = () => {
  inputFile.value.click();
};

const uploadImage = async (event: any) => {
  await authStore.updateAvatar(event.target.files[0]);
};
</script>

<style scoped lang="scss">
.avatar-edit {
  position: relative;

  &:hover > .icon-edit {
    visibility: visible;
  }

  & > .icon-edit {
    visibility: collapse;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 100;
    left: 0;
    background-color: rgba($color: #808080, $alpha: 0.8);
    border-radius: 100%;
    cursor: pointer;
  }

  & > input {
    display: none;
  }
}
</style>
