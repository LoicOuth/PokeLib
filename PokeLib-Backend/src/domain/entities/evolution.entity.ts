import { BaseEntity } from './common/base.entity';
import { Pokemon } from './pokemon.entity';

export class Evolution extends BaseEntity {
  is_next: boolean;
  pokemon_id: bigint;
  pokemon_evolution_id: bigint;

  pokemon?: Pokemon;
  pokemon_evolution?: Pokemon;
}