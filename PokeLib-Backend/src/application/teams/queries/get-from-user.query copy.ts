import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { IPagination } from 'src/application/common/interfaces/pagination.interface';
import { TeamDto } from '../dtos/team.dto';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';

export class GetTeamsFromUserQuery {
  @IsInt()
  @ApiProperty()
  page: number;

  @IsInt()
  @ApiProperty()
  take: number;

  @IsInt()
  @ApiProperty()
  userId: number;
}

@QueryHandler(GetTeamsFromUserQuery)
export class GetTeamsFromUserQueryHadnler implements IQueryHandler<GetTeamsFromUserQuery, IPagination<TeamDto>> {
  constructor(private readonly teamRepository: ITeamsRepository) {}

  async execute(query: GetTeamsFromUserQuery): Promise<IPagination<TeamDto>> {
    const list = await this.teamRepository.getPaginated(query.page, query.take, false, query.userId);
    const data = TeamDto.listProjection(list.data);

    return {
      ...list,
      data,
    };
  }
}
