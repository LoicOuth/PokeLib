import { Ability } from './ability.entity';
import { PokeApiEntity } from './common/pokeapi.entity';
import { LocationArea } from './location-area.entity';
import { Move } from './move.entity';
import { evolutions_chain_pokemons } from './pivots/evolutions-chain-pokemons.pivot';
import { pokemons_past_types } from './pivots/pokemons-past-types.pivot';
import { pokemons_stats } from './pivots/pokemons-stats.pivot';
import { pokemons_teams } from './pivots/pokemons-teams.pivot';
import { Type } from './type.entity';
import { Version } from './version.entity';

export class Pokemon extends PokeApiEntity {
  name: string;
  description: string;
  base_experience: number;
  height: number;
  weight: number;
  pokedex_order: number;
  is_legendary: boolean;
  is_mythical: boolean;
  has_gender_difference: boolean;
  atwork: string;
  atwork_shiny: string;
  sprite_back_default: string;
  sprite_back_default_shiny: string;
  sprite_back_female?: string;
  sprite_back_female_shiny?: string;
  sprite_front_default: string;
  sprite_front_default_shiny: string;
  sprite_front_female?: string;
  sprite_front_female_shiny?: string;
  first_type_id: bigint;
  second_type_id: bigint;

  //relations
  first_type?: Type;
  second_type?: Type;
  locations_area?: LocationArea[];
  versions?: Version[];
  abilities?: Ability[];
  moves?: Move[];
  pokemons_stats?: pokemons_stats[];
  pokemons_past_types?: pokemons_past_types[];
  evolve_from?: evolutions_chain_pokemons[];
  evolve_to?: evolutions_chain_pokemons[];
  pokemons_teams?: pokemons_teams[];
}
