import { BaseEntity } from './common/base.entity';
import { Pokemon } from './pokemon.entity';

export class MegaEvolution extends BaseEntity {
  orbe: string;
  sprite_regular: string;
  sprite_shiny: string;
  pokemon_id: number;

  pokemon?: Pokemon;
}
