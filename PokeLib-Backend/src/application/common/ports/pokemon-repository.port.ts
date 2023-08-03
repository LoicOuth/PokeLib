import { IPokeapiPokemon } from '../interfaces/pokeapi/pokemon.interface';

export abstract class IPokemonRepository {
  abstract createOrUpdateFromPokeapi(pokemons: IPokeapiPokemon[]): Promise<void>;
}
