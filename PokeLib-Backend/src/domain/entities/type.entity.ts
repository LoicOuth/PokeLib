import { BaseEntity } from './common/base.entity';
import { Pokemon } from './pokemon.entity';

export class Type extends BaseEntity {
  poke_api_id: number;
  name: string;
  color: string;
  sprite: string;

  pokemons_first?: Pokemon[];
  pokemons_second?: Pokemon[];
}
