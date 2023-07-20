import { Region } from '@prisma/client';
import { PokeApiEntity } from './common/pokeapi.entity';
import { VersionGroup } from './version-group.entity';

export class Generation extends PokeApiEntity {
  name: string;
  region_id: bigint;

  region?: Region;
  versions_groups?: VersionGroup[];
}
