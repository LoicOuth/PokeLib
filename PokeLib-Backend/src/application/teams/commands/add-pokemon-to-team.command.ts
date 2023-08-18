import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { IAbilityRepository } from 'src/application/common/ports/ability-repository.port';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { TeamHelper } from '../helpers/team.helper';
import { PokemonHelper } from 'src/application/pokemon/helpers/pokemon.helper';

export class AddPokemonToTeamCommand {
  @ApiProperty()
  @IsInt()
  pokemonId: number;

  @ApiProperty()
  @IsInt()
  teamId: number;
}

@CommandHandler(AddPokemonToTeamCommand)
export class AddPokemonToTeamCommandHandler implements ICommandHandler<AddPokemonToTeamCommand> {
  constructor(
    private readonly abilityRepository: IAbilityRepository,
    private readonly teamRepository: ITeamsRepository,
    private readonly pokemonHelper: PokemonHelper,
    private readonly teamHelper: TeamHelper,
  ) {}

  async execute(command: AddPokemonToTeamCommand): Promise<void> {
    await this.teamHelper.checkTeamExistAndUserOwner(command.teamId);

    await this.pokemonHelper.checkIfPokemonExist(command.pokemonId);

    const ability = await this.abilityRepository.getRandomlyFromPokemon(command.pokemonId);

    await this.teamRepository.addPokemon(command.teamId, command.pokemonId, ability.id);
  }
}
