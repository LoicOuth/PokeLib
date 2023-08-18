import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { CurrentUserService } from 'src/application/common/services/current-user.service';

@Injectable()
export class TeamHelper {
  constructor(private readonly teamRepository: ITeamsRepository, private readonly userService: CurrentUserService) {}

  checkTeamExistAndUserOwner = async (teamId: number): Promise<void> => {
    const team = await this.teamRepository.getOne(teamId);

    if (!team) throw new BadRequestException(`Any team found with id : ${teamId} `);

    if (team.user_id !== this.userService.user.id) throw new ForbiddenException('You are not the owner of this team');
  };
}
