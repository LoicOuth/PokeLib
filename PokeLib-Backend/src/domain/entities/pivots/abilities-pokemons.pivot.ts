import { Ability } from '../ability.entity';
import { Pokemon } from '../pokemon.entity';

export class AbilityToPokemon {
  is_hidden: boolean;
  ability_id: bigint;
  pokemon_id: bigint;

  pokemon?: Pokemon;
  ability?: Ability;
}
