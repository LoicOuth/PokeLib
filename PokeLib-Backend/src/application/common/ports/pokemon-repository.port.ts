import { IPokeapiPokemon } from '../interfaces/pokeapi/pokemon.interface';

export abstract class IPokemonRepository {
  abstract createOrUpdateFromPokeapi(pokemon: IPokeapiPokemon): Promise<void>;
}
