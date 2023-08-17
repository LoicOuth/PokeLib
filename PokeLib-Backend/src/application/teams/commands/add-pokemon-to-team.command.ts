import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { IAbilityRepository } from 'src/application/common/ports/ability-repository.port';
import { IPokemonRepository } from 'src/application/common/ports/pokemon-repository.port';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { CurrentUserService } from 'src/application/common/services/current-user.service';

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
    private readonly pokemonRepository: IPokemonRepository,
    private readonly userService: CurrentUserService,
  ) {}

  async execute(command: AddPokemonToTeamCommand): Promise<void> {
    const team = await this.teamRepository.getOne(command.teamId);

    if (!team) throw new BadRequestException(`Any team found with id : ${command.teamId} `);

    if (team.user_id !== this.userService.user.id) throw new ForbiddenException('You are not the owner of this team');

    const pokemon = await this.pokemonRepository.getOne(command.pokemonId);

    if (!pokemon) throw new BadRequestException(`Any pokemon found with id : ${command.pokemonId} `);

    const ability = await this.abilityRepository.getRandomlyFromPokemon(pokemon.id);

    await this.teamRepository.addPokemon(team.id, pokemon.id, ability.id);
  }
}
