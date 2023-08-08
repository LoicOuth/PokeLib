import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IUserRepository } from 'src/application/common/ports/user-repository.port';

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
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(command: CreateUserCommand): Promise<void> {
    let user = await this.userRepository.getByEmail(command.email);

    if (user) throw new BadRequestException('A user already exist with this email');

    user = await this.userRepository.getByPseudo(command.pseudo);

    if (user) throw new BadRequestException('A user already exist with this pseudo');

    await this.userRepository.createUser(command.email, command.pseudo, command.password);
  }
}
