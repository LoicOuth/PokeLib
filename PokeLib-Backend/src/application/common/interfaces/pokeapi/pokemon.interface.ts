import { IPokeapiBaseEntity } from './common/base-entity.interface';

export interface IPokeapiPokemon extends IPokeapiBaseEntity {
  weight: number;
  height: number;
  base_experience: number;
  species: { url: string };
  abilities: { ability: { name: string } }[];
  game_indices: { version: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: {
    back_default: string;
    back_female?: string;
    back_shiny: string;
    back_shiny_female?: string;
    front_default: string;
    front_shiny: string;
    front_female?: string;
    front_shiny_female?: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  stats: { base_stat: number; stat: { name: string } }[];
  types: { slot: number; type: { name: string } }[];

  is_legendary: boolean;
  is_mythical: boolean;
  has_gender_differences: boolean;
  pokedex_numbers: { entry_number: number; pokedex: { name: string } }[];
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}
