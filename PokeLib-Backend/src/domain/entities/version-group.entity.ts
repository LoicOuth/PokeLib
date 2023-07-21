import { PokeapiEntity } from './common/pokeapi.entity';
import { Generation } from './generation.entity';
import { Version } from './version.entity';

export class VersionGroup extends PokeapiEntity {
  name: string;
  generation_id: bigint;

  generation?: Generation;
  versions?: Version[];
}
