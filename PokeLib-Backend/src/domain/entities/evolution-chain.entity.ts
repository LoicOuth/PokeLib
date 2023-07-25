import { PokeapiEntity } from './common/pokeapi.entity';
import { evolutions_chain_pokemons } from './pivots/evolutions-chain-pokemons.pivot';
import { Pokemon } from './pokemon.entity';

export class EvolutionChain extends PokeapiEntity {
  evolutions_chain_pokemons?: evolutions_chain_pokemons[];
  pokemons?: Pokemon[];
}
