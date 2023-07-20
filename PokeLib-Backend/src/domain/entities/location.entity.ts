import { PokeApiEntity } from './common/pokeapi.entity';
import { LocationArea } from './location-area.entity';
import { Region } from './region.entity';

export class Location extends PokeApiEntity {
  name: string;
  region_id: bigint;

  locations_areas?: LocationArea[];
  region?: Region;
}
