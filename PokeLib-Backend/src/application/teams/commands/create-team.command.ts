import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { CurrentUserService } from 'src/application/common/services/current-user.service';
import { TeamDto } from '../dtos/team.dto';

export class CreateTeamCommand {}

@CommandHandler(CreateTeamCommand)
export class CreateTeamCommandHandler implements ICommandHandler<CreateTeamCommand, TeamDto> {
  constructor(private readonly teamRepository: ITeamsRepository, private readonly userService: CurrentUserService) {}

  async execute(): Promise<TeamDto> {
    const data = await this.teamRepository.create(this.userService.user.id);

    return TeamDto.projection(data);
  }
}
