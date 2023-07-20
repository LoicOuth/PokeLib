import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/application/common/ports/user-repository.port';
import { UserDto } from '../dtos/user.dto';
import { CurrentUserService } from 'src/application/common/services/current-user.service';

export class GetMeQuery {}

@QueryHandler(GetMeQuery)
export class GetMeQueryHandler implements IQueryHandler<GetMeQuery, UserDto> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly currentUserService: CurrentUserService,
  ) {}

  async execute(): Promise<UserDto> {
    const data = await this.userRepository.getOne(this.currentUserService.user.id);

    return UserDto.projection(data);
  }
}
