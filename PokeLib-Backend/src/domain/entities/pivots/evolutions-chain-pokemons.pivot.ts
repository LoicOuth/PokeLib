import { EvolutionChain } from '../evolution-chain.entity';
import { EvolutionTrigger } from '../evolution-trigger.entity';
import { Pokemon } from '../pokemon.entity';

export class evolutions_chain_pokemons {
  evolution_chain_id: bigint;
  evolution_trigger_id: bigint;
  pokemon_from_id: bigint;
  pokemon_to_id: bigint;

  evolution_chain?: EvolutionChain;
  evolution_trigger?: EvolutionTrigger;
  pokemon_from?: Pokemon;
  pokemon_to?: Pokemon;
}
