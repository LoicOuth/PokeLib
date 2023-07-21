import { PokeapiNamedEntity } from './common/pokeapi-named.entity';
import { Location } from './location.entity';
import { Pokemon } from './pokemon.entity';

export class LocationArea extends PokeapiNamedEntity {
  location_id: bigint;

  location?: Location;
  pokemons?: Pokemon;
}
