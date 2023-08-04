import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetAllPokemonQuery } from 'src/application/pokemon/queries/get-all-pokemon.query';

@ApiTags('Pokemon')
@Controller('pokemons')
export class PokemonController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getAll() {
    return await this.queryBus.execute(new GetAllPokemonQuery());
  }
}
