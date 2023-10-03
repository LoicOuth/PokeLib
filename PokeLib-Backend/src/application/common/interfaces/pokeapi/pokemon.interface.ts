export interface IPokeapiPokemon {
  pokedexId: number;
  generation: number;
  category: string;
  name: {
    fr: string;
  };
  sprites: {
    regular: string;
    shiny?: string;
    gmax?: {
      regular: string;
      shiny: string;
    };
  };
  types: {
    name: string;
  }[];
  talents?: IPokeapiAbility[];
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
  evolution?: {
    pre?: { pokedexId: number; condition: string }[];
    next?: { pokedexId: number; condition: string }[];
    mega?: {
      orbe?: string;
      obre?: string;
      sprites: {
        regular: string;
        shiny: string;
      };
    }[];
  };
  height: string;
  weight: string;
}

export interface IPokeapiAbility {
  name: string;
  tc: boolean;
}
