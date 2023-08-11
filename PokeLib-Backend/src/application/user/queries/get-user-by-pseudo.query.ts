import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserDto } from '../dtos/user.dto';
import { IUserRepository } from 'src/application/common/ports/user-repository.port';
import { NotFoundException } from '@nestjs/common';

export class GetUserByPseudoQuery {
  @IsNotEmpty()
  @ApiProperty()
  pseudo: string;
}

@QueryHandler(GetUserByPseudoQuery)
export class GetUserByPseudoQueryHandler implements IQueryHandler<GetUserByPseudoQuery, UserDto> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(query: GetUserByPseudoQuery): Promise<UserDto> {
    const user = await this.userRepository.getByPseudo(query.pseudo);

    if (!user) throw new NotFoundException('Utilisateur non trouvé');

    return UserDto.projection(user);
  }
}
