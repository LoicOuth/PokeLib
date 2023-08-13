<template>
  <div v-if="user.data" class="d-flex justify-center">
    <v-card class="w-50 ma-10 pa-10">
      <div v-if="user.isConnected" class="edit-btns d-flex align-center">
        <EditAccountPassword />

        <v-btn variant="text" color="secondary" icon class="ml-1" @click="editMode = !editMode">
          <v-icon :icon="editMode ? 'mdi-close' : 'mdi-pencil'" />
          <v-tooltip
            :text="editMode ? 'Quitter le mode édition' : 'Modifier le profil'"
            location="bottom"
            activator="parent"
          />
        </v-btn>
      </div>

      <div class="d-flex flex-column mb-10 text-center align-center">
        <v-tooltip v-if="user.isConnected" text="Modifier l'avatar">
          <template v-slot:activator="{ props }">
            <div class="avatar-edit" @click="handleChooseImage()" v-bind="props">
              <v-avatar :image="user.data.avatar || '/default.png'" size="80" />
              <v-icon class="icon-edit" icon="mdi-pencil" />
              <input ref="inputFile" type="file" @change="uploadImage" />
            </div>
          </template>
        </v-tooltip>

        <v-avatar v-else :image="user.data.avatar || '/default.png'" size="80" />

        <span class="mt-3">Compte créer le : {{ new Date(user.data.registered_at).toLocaleDateString() }}</span>

        <div v-if="!editMode" class="d-flex flex-column">
          <h3 class="mt-3">{{ user.data.pseudo }}</h3>
          <h3 v-if="user.isConnected" class="mt-2">{{ user.data.email }}</h3>
        </div>
        <div v-else class="w-50 ma-5">
          <EditAccountInfoView @close:edit-mode="editMode = false" :user="user.data" />
        </div>
      </div>

      <h2>10 équipes</h2>
      <v-divider />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import { type IUser } from '@/core/interfaces/user.interface';
import { useAuthStore } from '@/stores/auth';
import { watch } from 'vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import EditAccountInfoView from '@/components/EditAccount/EditAccountInfo.vue';
import EditAccountPassword from '@/components/EditAccount/EditAccountPassword.vue';

const route = useRoute();
const fetch = useApi();
const authStore = useAuthStore();

const user = ref<{ isConnected: boolean; data: IUser | null }>({
  isConnected: false,
  data: null,
});
const inputFile = ref();
const editMode = ref(false);

const handleChooseImage = () => {
  inputFile.value.click();
};

const uploadImage = async (event: any) => {
  await authStore.updateAvatar(event.target.files[0]);
};

const refreshAccount = async () => {
  if (route.params.pseudo == authStore.connectedUser?.pseudo) {
    user.value.data = authStore.connectedUser;
    user.value.isConnected = true;
  } else {
    user.value.data = await fetch.get<IUser>(`users/${route.params.pseudo}`);
  }
};

onMounted(async () => {
  await refreshAccount();
});

watch(route, async (value) => {
  if (value.name === 'account') await refreshAccount();
});
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

.edit-btns {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
