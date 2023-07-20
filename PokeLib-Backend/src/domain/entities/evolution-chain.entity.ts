import { PokeApiEntity } from './common/pokeapi.entity';
import { evolutions_chain_pokemons } from './pivots/evolutions-chain-pokemons.pivot';

export class EvolutionChain extends PokeApiEntity {
  evolutions_chain_pokemons?: evolutions_chain_pokemons[];
}
