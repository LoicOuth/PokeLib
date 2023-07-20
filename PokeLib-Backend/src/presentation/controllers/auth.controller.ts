import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginWithGoogleCommand } from 'src/application/auth/commands/login-with-google.command';
import { ApiTags } from '@nestjs/swagger';
import { LoginCommand } from 'src/application/auth/commands/login.command';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('google')
  async loginWithGoogle(@Body() command: LoginWithGoogleCommand) {
    return await this.commandBus.execute(command);
  }

  @Post('login')
  async login(@Body() command: LoginCommand) {
    return await this.commandBus.execute(command);
  }
}
