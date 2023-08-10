import { Body, Controller, Get, Post, Put, Query, Req, UploadedFile } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetAllUserQuery } from 'src/application/user/queries/get-all-user.query';
import { GetMeQuery } from 'src/application/user/queries/get-me.query';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserCommand } from 'src/application/user/commands/create-user.command';
import { UpdateUserAvatarCommand } from 'src/application/user/commands/update-user-avatar.command';
import { Auth } from 'src/application/common/decorators/auth.decorator';
import { UploadFile } from 'src/application/common/decorators/upload-file.decorator';
import { Request } from 'express';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Auth('ADMIN')
  @Get()
  async getAll(@Query() query: GetAllUserQuery) {
    return await this.queryBus.execute(query);
  }

  @Auth()
  @Get('me')
  async getMe() {
    return await this.queryBus.execute(new GetMeQuery());
  }

  @Post('create')
  async create(@Body() command: CreateUserCommand) {
    return await this.commandBus.execute(command);
  }

  @Auth()
  @UploadFile('avatar')
  @Put('me/update/avatar')
  async updateAvatar(@UploadedFile() avatar: Express.Multer.File, @Req() request: Request) {
    const command = new UpdateUserAvatarCommand();
    command.avatar = `${request.protocol}://${request.get('host')}/uploads/images/${avatar.filename}`;

    return await this.commandBus.execute(command);
  }
}
