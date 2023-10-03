import { EvolutionType } from '../enums/evolution-type.enum';
import { BaseEntity } from './common/base.entity';
import { Pokemon } from './pokemon.entity';

export class Evolution extends BaseEntity {
  condition?: string;
  pokemon_id: number;
  pokemon_evolution_id: number;
  type: EvolutionType;

  pokemon?: Pokemon;
  pokemon_evolution?: Pokemon;
}
