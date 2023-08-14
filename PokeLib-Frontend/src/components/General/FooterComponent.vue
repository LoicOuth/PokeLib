<template>
  <v-footer elevation="3" class="pa-5" style="margin-top: 5em">
    <div class="w-100">
      <v-row class="pa-5">
        <v-col cols="12" md="4">
          <img src="/logo.png" height="80" />
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="font-weight-bold text-h5 text-secondary">Informations</h3>
          <ul class="text-h6">
            <li>
              <a href="/rgpd" target="_blank">Politique de Confidentialité</a>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="font-weight-bold text-h5 text-secondary">Retrouvez-nous</h3>
          <ul class="text-h6">
            <li>
              <a href="https://github.com/LoicOuth/PokeLib" target="_blank">GitHub</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/lo%C3%AFc-outhier-508329180/" target="_blank">Linkedin</a>
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <p class="mt-5">
        &copy; 2023 Pokemon Library. Tous droits réservés. Pokémon est une marque déposée de Nintendo, Game Freak et
        Creatures Inc.
      </p>
    </div>
  </v-footer>
</template>

<style scoped lang="scss">
li {
  list-style-type: none;

  & > a {
    text-decoration: none;
    color: white;
    position: relative;
    padding-bottom: 5px;
  }

  & > a::before {
    content: '';
    height: 1px;
    width: 0px;
    background-color: #ffde00;
    transition: width 300ms;
    position: absolute;
    bottom: 0px;
  }

  & > a:hover::before {
    width: 100%;
  }
}
</style>
