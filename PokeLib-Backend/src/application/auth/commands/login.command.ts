import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { IUserRepository } from 'src/application/common/ports/user-repository.port';
import { JwtHelper } from '../helpers/jwt.helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class LoginCommand {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand, LoginResponseDto> {
  constructor(private readonly userRepository: IUserRepository, private readonly jwtHelper: JwtHelper) {}

  async execute(command: LoginCommand): Promise<LoginResponseDto> {
    const user = await this.userRepository.getOneFromEmailOrPseudo(command.username);

    if (user == undefined) throw new BadRequestException('Any user found with this pseudo/email');

    if (user.google_uuid != null) throw new BadRequestException('Its google account, try to connect with google oauth');

    if (!(await bcrypt.compare(command.password, user.password))) throw new BadRequestException('Bad password');

    return await this.jwtHelper.generateNewToken(user);
  }
}
