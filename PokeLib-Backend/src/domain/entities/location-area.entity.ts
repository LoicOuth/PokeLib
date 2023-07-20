import { PokeApiEntity } from './common/pokeapi.entity';
import { Location } from './location.entity';
import { Pokemon } from './pokemon.entity';

export class LocationArea extends PokeApiEntity {
  name: string;
  location_id: bigint;

  location?: Location;
  pokemons?: Pokemon;
}
