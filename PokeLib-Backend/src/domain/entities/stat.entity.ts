import { pokemons_stats } from './pivots/pokemons-stats.pivot';
import { PokeApiEntity } from './common/pokeapi.entity';

export class Stat extends PokeApiEntity {
  name: string;

  pokemons_stats: pokemons_stats[];
}
