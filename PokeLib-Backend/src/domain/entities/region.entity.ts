import { PokeApiEntity } from './common/pokeapi.entity';
import { Generation } from './generation.entity';
import { Location } from './location.entity';

export class Region extends PokeApiEntity {
  name: string;

  locations?: Location[];
  generations?: Generation[];
}
