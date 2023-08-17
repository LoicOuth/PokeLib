import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { IPokemonRepository } from 'src/application/common/ports/pokemon-repository.port';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { CurrentUserService } from 'src/application/common/services/current-user.service';

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
    private readonly pokemonRepository: IPokemonRepository,
    private readonly userService: CurrentUserService,
  ) {}

  async execute(command: DeletePokemonToTeamCommand): Promise<void> {
    const team = await this.teamRepository.getOne(command.teamId);

    if (!team) throw new BadRequestException(`Any team found with id : ${command.teamId} `);

    if (team.user_id !== this.userService.user.id) throw new ForbiddenException('You are not the owner of this team');

    const pokemon = await this.pokemonRepository.getOne(command.pokemonId);

    if (!pokemon) throw new BadRequestException(`Any pokemon found with id : ${command.pokemonId} `);

    await this.teamRepository.deletePokemon(team.id, pokemon.id);
  }
}
