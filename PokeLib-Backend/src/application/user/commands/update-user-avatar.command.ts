import { CurrentUserService } from 'src/application/common/services/current-user.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IsNotEmpty } from 'class-validator';
import { IUserRepository } from 'src/application/common/ports/user-repository.port';

export class UpdateUserAvatarCommand {
  @IsNotEmpty()
  avatar: string;
}

@CommandHandler(UpdateUserAvatarCommand)
export class UpdateUserAvatarCommandHandler implements ICommandHandler<UpdateUserAvatarCommand, string> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly currentUserService: CurrentUserService,
  ) {}

  async execute(command: UpdateUserAvatarCommand): Promise<string> {
    await this.userRepository.updateUserAvatar(command.avatar, this.currentUserService.user.id);

    return command.avatar;
  }
}
