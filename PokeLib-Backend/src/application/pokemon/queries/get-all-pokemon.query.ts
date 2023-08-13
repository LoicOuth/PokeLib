import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PokemonDto } from '../dtos/pokemon.dto';
import { IPokemonRepository } from 'src/application/common/ports/pokemon-repository.port';

export class GetAllPokemonQuery {}

@QueryHandler(GetAllPokemonQuery)
export class GetAllPokemonQueryHandler implements IQueryHandler<GetAllPokemonQuery, PokemonDto[]> {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(): Promise<PokemonDto[]> {
    const list = await this.pokemonRepository.getAll();

    return PokemonDto.listProjection(list);
  }
}
