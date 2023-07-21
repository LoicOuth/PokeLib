import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IUserRepository } from 'src/application/common/ports/user-repository.port';

export class CreateUserCommand {
  @IsNotEmpty()
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
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(command: CreateUserCommand): Promise<void> {
    await this.userRepository.createUser(command.email, command.pseudo, command.password);
  }
}
