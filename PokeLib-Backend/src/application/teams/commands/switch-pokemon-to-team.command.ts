import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { TeamHelper } from '../helpers/team.helper';
import { PokemonHelper } from 'src/application/pokemon/helpers/pokemon.helper';
import { IAbilityRepository } from 'src/application/common/ports/ability-repository.port';

export class SwitchPokemonToTeamCommand {
  @ApiProperty()
  @IsInt()
  oldPokemonId: number;

  @ApiProperty()
  @IsInt()
  pokemonId: number;

  @ApiProperty()
  @IsInt()
  teamId: number;
}

@CommandHandler(SwitchPokemonToTeamCommand)
export class SwitchPokemonToTeamCommandHandler implements ICommandHandler<SwitchPokemonToTeamCommand> {
  constructor(
    private readonly teamRepository: ITeamsRepository,
    private readonly abilityRepository: IAbilityRepository,
    private readonly teamHelper: TeamHelper,
    private readonly pokemonHelper: PokemonHelper,
  ) {}

  async execute(command: SwitchPokemonToTeamCommand): Promise<void> {
    await this.teamHelper.checkTeamExistAndUserOwner(command.teamId);

    await this.pokemonHelper.checkIfPokemonExist(command.pokemonId);
    await this.pokemonHelper.checkIfPokemonExist(command.oldPokemonId);

    const ability = await this.abilityRepository.getRandomlyFromPokemon(command.pokemonId);

    await this.teamRepository.switchPokemon(command.teamId, command.oldPokemonId, command.pokemonId, ability.id);
  }
}
