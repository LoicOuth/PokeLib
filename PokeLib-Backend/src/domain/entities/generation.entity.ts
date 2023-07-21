import { Region } from '@prisma/client';
import { VersionGroup } from './version-group.entity';
import { PokeapiNamedEntity } from './common/pokeapi-named.entity';

export class Generation extends PokeapiNamedEntity {
  region_id: bigint;

  region?: Region;
  versions_groups?: VersionGroup[];
}
