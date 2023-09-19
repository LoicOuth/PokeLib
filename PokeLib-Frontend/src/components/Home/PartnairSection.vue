<template>
  <h>Nos partenaires</h>
  <v-divider color="white" />
  <v-row class="mt-10">
    <v-col cols="12" md="6">
      <v-card class="pa-5" variant="tonal">
        <v-img src="https://www.ni-host.com/images/logo.svg" height="100px" />
        <v-card-title>
          <h3>Nihost</h3>
        </v-card-title>
        <v-card-text>
          <p class="text-body-1" style="height: 100px">
            Nihost est notre hébergeur de confiance. Ils nous fournissent une infrastructure solide et sécurisée pour
            garantir une expérience fluide pour nos utilisateurs.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" href="https://www.ni-host.com/" target="_blank">Visiter Nihost</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card class="pa-5" variant="tonal">
        <v-img src="https://api-pokemon-fr.vercel.app/assets/logo.png" height="100px" />

        <v-card-title>
          <h3>PokeAPI</h3>
        </v-card-title>
        <v-card-text>
          <p class="text-body-1" style="height: 100px">
            PokeAPI est la source de données essentielle pour notre Pokedex. Ils nous fournissent un accès aux
            informations détaillées sur les Pokemon, les capacités, les types et bien plus encore.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" href="https://api-pokemon-fr.vercel.app/" target="_blank">Visiter PokeAPI</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
