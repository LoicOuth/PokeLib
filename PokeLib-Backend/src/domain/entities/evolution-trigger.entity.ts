import { PokeApiEntity } from './common/pokeapi.entity';
import { evolutions_chain_pokemons } from './pivots/evolutions-chain-pokemons.pivot';

export class EvolutionTrigger extends PokeApiEntity {
  name: string;
  evolutions_chain_pokemons?: evolutions_chain_pokemons[];
}
