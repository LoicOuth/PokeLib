import { Pokemon } from 'src/domain/entities/pokemon.entity';
import { IPokeapiPokemon } from '../interfaces/pokeapi/pokemon.interface';

export abstract class IPokemonRepository {
  abstract createOrUpdateFromPokeapi(pokemon: IPokeapiPokemon): Promise<void>;
  abstract getFromName(name: string): Promise<Pokemon>;
  abstract updateEvolutionChainAndGet(name: string, chainId): Promise<Pokemon>;
}
