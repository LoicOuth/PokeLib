import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { IPagination } from 'src/application/common/interfaces/pagination.interface';
import { TeamDto } from '../dtos/team.dto';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';

export class GetPublicTeamsQuery {
  @IsInt()
  @ApiProperty()
  page: number;

  @IsInt()
  @ApiProperty()
  take: number;
}

@QueryHandler(GetPublicTeamsQuery)
export class GetPublicTeamsQueryHandler implements IQueryHandler<GetPublicTeamsQuery, IPagination<TeamDto>> {
  constructor(private readonly teamRepository: ITeamsRepository) {}

  async execute(query: GetPublicTeamsQuery): Promise<IPagination<TeamDto>> {
    const list = await this.teamRepository.getPaginated(query.page, query.take);
    const data = TeamDto.listProjection(list.data);

    return {
      ...list,
      data,
    };
  }
}
