import { Controller, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RefreshDataFromPokeapiCommand } from 'src/application/pokeapi/commands/refresh-data-from-pokeapi.command';

@ApiTags('Data')
@Controller('data')
export class DataController {
  constructor(private readonly commandBus: CommandBus) {}

  @Put('refresh')
  async refreshDataFromPokeApi() {
    return await this.commandBus.execute(new RefreshDataFromPokeapiCommand());
  }
}
