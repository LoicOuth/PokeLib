import { PokeapiNamedEntity } from './common/pokeapi-named.entity';
import { evolutions_chain_pokemons } from './pivots/evolutions-chain-pokemons.pivot';

export class EvolutionTrigger extends PokeapiNamedEntity {
  evolutions_chain_pokemons?: evolutions_chain_pokemons[];
}
