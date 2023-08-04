import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { IPokeapiPokemon } from 'src/application/common/interfaces/pokeapi/pokemon.interface';
import { IPokeapiType } from 'src/application/common/interfaces/pokeapi/type.interface';
import { IPokeapiData } from 'src/application/common/ports/pokeapi-data.port';
import { IPokemonRepository } from 'src/application/common/ports/pokemon-repository.port';
import { ITypeRepository } from 'src/application/common/ports/type-repository.port';

@Injectable()
export class PokeapiData implements IPokeapiData {
  private logger = new Logger(PokeapiData.name);

  constructor(
    private readonly http: HttpService,
    private readonly typeRepo: ITypeRepository,
    private readonly pokemonRepo: IPokemonRepository,
  ) {}

  setDataInDatabase = async (): Promise<void> => {
    await this.typeRepo.createOrUpdateFromPokeapi(await this.get<IPokeapiType[]>('types'));

    const pokemons = await this.get<IPokeapiPokemon[]>('pokemon');
    await this.pokemonRepo.createOrUpdateFromPokeapi(pokemons);
    await this.pokemonRepo.createOrUpdateEvolutionFromPokeapi(pokemons);
  };

  private get = async <T>(endpoint: string): Promise<T> => {
    try {
      const response = await this.http.axiosRef.get<T>(`https://api-pokemon-fr.vercel.app/api/v1/${endpoint}`);

      return response.data;
    } catch (error) {
      this.logger.error(`Pokeapi API return error : ${error}, on request : /${endpoint}, method : ${this.get.name}`);

      throw new Error(`PokeApi API return error ${error}`);
    }
  };
}
