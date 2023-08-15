import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { TeamDto } from '../dtos/team.dto';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';

export class GetOneTeamQuery {
  @IsInt()
  @ApiProperty()
  teamId: number;
}

@QueryHandler(GetOneTeamQuery)
export class GetOneTeamQueryHandler implements IQueryHandler<GetOneTeamQuery, TeamDto> {
  constructor(private readonly teamRepository: ITeamsRepository) {}

  async execute(query: GetOneTeamQuery): Promise<TeamDto> {
    const data = await this.teamRepository.getOne(query.teamId);

    return TeamDto.projection(data);
  }
}
