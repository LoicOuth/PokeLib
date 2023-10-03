import type { EvolutionType } from '../constants';
import type { IPokemon } from './pokemon.interface';

export interface IEvolution {
  id: number;
  condition?: string;
  pokemon_evolution: IPokemon;
  type: EvolutionType;
}
