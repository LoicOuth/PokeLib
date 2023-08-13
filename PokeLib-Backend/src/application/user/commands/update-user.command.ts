import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserHelper } from '../helpers/user.helper';
import { IUserRepository } from 'src/application/common/ports/user-repository.port';
import { CurrentUserService } from 'src/application/common/services/current-user.service';
import { BadRequestException } from '@nestjs/common';

export class UpdateUserCommand {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  pseudo: string;
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly userHelper: UserHelper,
    private readonly userRepository: IUserRepository,
    private readonly currentUserService: CurrentUserService,
  ) {}

  async execute(command: UpdateUserCommand): Promise<any> {
    const curentUser = await this.userRepository.getOne(this.currentUserService.user.id);

    await this.userHelper.checkIfUserExist(command.email, command.pseudo, curentUser.id);

    if (curentUser.google_uuid) {
      if (command.email !== curentUser.email)
        throw new BadRequestException("Ceci est un compte google vous ne pouvez pas modifier l'email");

      await this.userRepository.updateUserInfos(command.pseudo, curentUser.id);
    } else await this.userRepository.updateUserInfos(command.pseudo, curentUser.id, command.email);
  }
}
