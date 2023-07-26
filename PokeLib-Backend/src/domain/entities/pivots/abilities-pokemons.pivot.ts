import { Ability } from '../ability.entity';
import { Pokemon } from '../pokemon.entity';

export class AbilityToPokemon {
  ability_id: bigint;
  pokemon_id: bigint;

  pokemon?: Pokemon;
  ability?: Ability;
}
