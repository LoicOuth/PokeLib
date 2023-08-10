import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IUserRepository } from 'src/application/common/ports/user-repository.port';
import { UserHelper } from '../helpers/user.helper';

export class CreateUserCommand {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  pseudo: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, void> {
  constructor(private readonly userRepository: IUserRepository, private readonly userHelper: UserHelper) {}

  async execute(command: CreateUserCommand): Promise<void> {
    await this.userHelper.checkIfUserExist(command.email, command.pseudo);

    await this.userRepository.createUser(command.email, command.pseudo, command.password);
  }
}
