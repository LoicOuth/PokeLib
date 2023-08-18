import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { IPagination } from 'src/application/common/interfaces/pagination.interface';
import { TeamDto } from '../dtos/team.dto';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { CurrentUserService } from 'src/application/common/services/current-user.service';

export class GetMyTeamsQuery {
  @IsInt()
  @ApiProperty()
  page: number;

  @IsInt()
  @ApiProperty()
  take: number;
}

@QueryHandler(GetMyTeamsQuery)
export class GetMyTeamsQueryHandler implements IQueryHandler<GetMyTeamsQuery, IPagination<TeamDto>> {
  constructor(private readonly teamRepository: ITeamsRepository, private readonly userService: CurrentUserService) {}

  async execute(query: GetMyTeamsQuery): Promise<IPagination<TeamDto>> {
    const list = await this.teamRepository.getPaginatedFromUserId(query.page, query.take, this.userService.user.id);
    const data = TeamDto.listProjection(list.data);

    return {
      ...list,
      data,
    };
  }
}
