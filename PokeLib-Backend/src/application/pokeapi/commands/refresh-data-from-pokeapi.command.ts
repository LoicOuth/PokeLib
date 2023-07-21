import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IPokeapiData } from 'src/application/common/ports/pokeapi-data.port';

export class RefreshDataFromPokeapiCommand {}

@CommandHandler(RefreshDataFromPokeapiCommand)
export class RefreshDataFromPokeapiCommandHandler implements ICommandHandler<RefreshDataFromPokeapiCommand, void> {
  constructor(private readonly pokeapiData: IPokeapiData) {}

  async execute(): Promise<void> {
    await this.pokeapiData.setDataInDatabase();
  }
}
