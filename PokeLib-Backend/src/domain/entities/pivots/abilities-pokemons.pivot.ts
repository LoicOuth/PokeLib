import { Ability } from '../ability.entity';
import { Pokemon } from '../pokemon.entity';

export class AbilityToPokemon {
  is_hidden: boolean;
  ability_id: number;
  pokemon_id: number;

  pokemon?: Pokemon;
  ability?: Ability;
}
