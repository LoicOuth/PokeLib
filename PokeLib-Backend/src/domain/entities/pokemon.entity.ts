import { BaseEntity } from './common/base.entity';
import { Evolution } from './evolution.entity';
import { MegaEvolution } from './mega-evolution.entity';
import { AbilityToPokemon } from './pivots/abilities-pokemons.pivot';
import { PokemonToTeam } from './pivots/pokemons-teams.pivot';
import { Type } from './type.entity';

export class Pokemon extends BaseEntity {
  pokedex_order: number;
  name: string;
  description: string;
  height: string;
  weight: string;
  generation: number;
  sprite_regular: string;
  sprite_shiny?: string;
  sprite_gmax?: string;
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
  first_type_id: bigint;
  second_type_id?: bigint;

  first_type?: Type;
  second_type?: Type;
  pokemons_teams?: PokemonToTeam[];
  mega_evolutions?: MegaEvolution[];
  evolutions?: Evolution[];
  evolutions_member?: Evolution[];
  abilities?: AbilityToPokemon[];
}
