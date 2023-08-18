import { BadRequestException, Injectable } from '@nestjs/common';
import { IPokemonRepository } from 'src/application/common/ports/pokemon-repository.port';

@Injectable()
export class PokemonHelper {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  checkIfPokemonExist = async (pokemonId: number): Promise<void> => {
    const pokemon = await this.pokemonRepository.getOne(pokemonId);

    if (!pokemon) throw new BadRequestException(`Any pokemon found with id : ${pokemonId} `);
  };
}
