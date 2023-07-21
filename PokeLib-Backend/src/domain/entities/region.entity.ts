import { PokeapiNamedEntity } from './common/pokeapi-named.entity';
import { Generation } from './generation.entity';
import { Location } from './location.entity';

export class Region extends PokeapiNamedEntity {
  locations?: Location[];
  generations?: Generation[];
}
