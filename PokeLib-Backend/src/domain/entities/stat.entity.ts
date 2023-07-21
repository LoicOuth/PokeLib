import { PokeapiNamedEntity } from './common/pokeapi-named.entity';
import { pokemons_stats } from './pivots/pokemons-stats.pivot';

export class Stat extends PokeapiNamedEntity {
  pokemons_stats: pokemons_stats[];
}
