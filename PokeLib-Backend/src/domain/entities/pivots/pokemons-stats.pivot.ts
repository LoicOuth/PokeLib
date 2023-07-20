import { Pokemon } from '../pokemon.entity';
import { Stat } from '../stat.entity';

export class pokemons_stats {
  pokemon_id: bigint;
  stat_id: bigint;
  base_stat: number;

  pokemon?: Pokemon;
  stat?: Stat;
}
