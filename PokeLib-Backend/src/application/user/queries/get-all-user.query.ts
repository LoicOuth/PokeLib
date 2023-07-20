import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/application/common/ports/user-repository.port';
import { IPagination } from 'src/application/common/interfaces/pagination.interface';
import { UserDto } from '../dtos/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class GetAllUserQuery {
  @IsOptional()
  @IsInt()
  @ApiProperty({
    required: false,
  })
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    required: false,
  })
  take?: number = 5;
}

@QueryHandler(GetAllUserQuery)
export class GetAllUserQueryHandler implements IQueryHandler<GetAllUserQuery, IPagination<UserDto>> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(query: GetAllUserQuery): Promise<IPagination<UserDto>> {
    const list = await this.userRepository.getPaginated(query.page, query.take);

    const data = UserDto.listProjection(list.data);

    return {
      ...list,
      data,
    };
  }
}
