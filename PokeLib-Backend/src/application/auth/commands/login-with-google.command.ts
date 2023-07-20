import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { IUserRepository } from 'src/application/common/ports/user-repository.port';
import { IGoogleAuth } from 'src/application/common/ports/google-auth.port';
import { JwtHelper } from '../helpers/jwt.helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginWithGoogleCommand {
  @IsNotEmpty()
  @ApiProperty()
  authCode: string;
}

@CommandHandler(LoginWithGoogleCommand)
export class LoginWithGoogleCommandHandler implements ICommandHandler<LoginWithGoogleCommand, LoginResponseDto> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly googleAuth: IGoogleAuth,
    private readonly jwtHelper: JwtHelper,
  ) {}

  async execute(command: LoginWithGoogleCommand): Promise<LoginResponseDto> {
    const accessToken = await this.googleAuth.getAccessToken(command.authCode);

    const googleUser = await this.googleAuth.getUserInfo(accessToken);

    const user = await this.userRepository.createOrUpdateFromGoogle(googleUser);

    return await this.jwtHelper.generateNewToken(user);
  }
}
