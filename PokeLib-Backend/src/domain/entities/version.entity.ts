import { PokeApiEntity } from './common/pokeapi.entity';
import { Pokemon } from './pokemon.entity';
import { VersionGroup } from './version-group.entity';

export class Version extends PokeApiEntity {
  name: string;
  version_group_id: bigint;

  version_group?: VersionGroup;
  pokemons?: Pokemon[];
}
