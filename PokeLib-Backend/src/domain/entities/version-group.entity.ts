import { PokeApiEntity } from './common/pokeapi.entity';
import { Generation } from './generation.entity';
import { Version } from './version.entity';

export class VersionGroup extends PokeApiEntity {
  generation_id: bigint;

  generation?: Generation;
  versions?: Version[];
}
