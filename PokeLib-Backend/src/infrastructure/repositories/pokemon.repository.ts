import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { IPokemonRepository } from 'src/application/common/ports/pokemon-repository.port';
import { IPokeapiPokemon } from 'src/application/common/interfaces/pokeapi/pokemon.interface';

@Injectable()
export class PokemonRepository implements IPokemonRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  createOrUpdateFromPokeapi = async (pokemon: IPokeapiPokemon): Promise<void> => {
    console.log('test');
  };
}
