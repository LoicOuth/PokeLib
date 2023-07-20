import { PokeApiEntity } from './common/pokeapi.entity';
import { pokemons_teams } from './pivots/pokemons-teams.pivot';
import { Pokemon } from './pokemon.entity';
import { Type } from './type.entity';

export class Move extends PokeApiEntity {
  name: string;
  accuracy: number;
  power: number;
  pp: number;
  priority: number;
  damage_class: string;
  damage_description: string;
  type_id: number;

  type?: Type;
  pokemons?: Pokemon[];
  has_move_1?: pokemons_teams[];
  has_move_2?: pokemons_teams[];
  has_move_3?: pokemons_teams[];
  has_move_4?: pokemons_teams[];
}
