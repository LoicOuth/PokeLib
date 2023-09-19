import { Pokemon } from 'src/domain/entities/pokemon.entity';
import { IPokeapiPokemon } from '../interfaces/pokeapi/pokemon.interface';

export abstract class IPokemonRepository {
  abstract createOrUpdateFromPokeapi(pokemons: IPokeapiPokemon[]): Promise<void>;
  abstract createOrUpdateEvolutionFromPokeapi(pokemons: IPokeapiPokemon[]): Promise<void>;
  abstract getAll(): Promise<Pokemon[]>;
  abstract getOne(pokemonId: number): Promise<Pokemon>;
}
