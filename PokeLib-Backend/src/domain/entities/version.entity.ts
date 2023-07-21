import { PokeapiNamedEntity } from './common/pokeapi-named.entity';
import { Pokemon } from './pokemon.entity';
import { VersionGroup } from './version-group.entity';

export class Version extends PokeapiNamedEntity {
  version_group_id: bigint;

  version_group?: VersionGroup;
  pokemons?: Pokemon[];
}
