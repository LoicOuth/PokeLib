import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { TeamHelper } from '../helpers/team.helper';
import { PokemonHelper } from 'src/application/pokemon/helpers/pokemon.helper';

export class DeletePokemonToTeamCommand {
  @ApiProperty()
  @IsInt()
  pokemonId: number;

  @ApiProperty()
  @IsInt()
  teamId: number;
}

@CommandHandler(DeletePokemonToTeamCommand)
export class DeletePokemonToTeamCommandHandler implements ICommandHandler<DeletePokemonToTeamCommand> {
  constructor(
    private readonly teamRepository: ITeamsRepository,
    private readonly teamHelper: TeamHelper,
    private readonly pokemonHelper: PokemonHelper,
  ) {}

  async execute(command: DeletePokemonToTeamCommand): Promise<void> {
    await this.teamHelper.checkTeamExistAndUserOwner(command.teamId);

    await this.pokemonHelper.checkIfPokemonExist(command.pokemonId);

    await this.teamRepository.deletePokemon(command.teamId, command.pokemonId);
  }
}
