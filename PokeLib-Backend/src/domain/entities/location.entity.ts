import { PokeapiNamedEntity } from './common/pokeapi-named.entity';
import { LocationArea } from './location-area.entity';
import { Region } from './region.entity';

export class Location extends PokeapiNamedEntity {
  region_id: bigint;

  locations_areas?: LocationArea[];
  region?: Region;
}
