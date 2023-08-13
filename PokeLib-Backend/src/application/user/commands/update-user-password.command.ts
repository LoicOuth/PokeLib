import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { IUserRepository } from 'src/application/common/ports/user-repository.port';
import { CurrentUserService } from 'src/application/common/services/current-user.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

export class UpdateUserPasswordCommand {
  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;

  @IsNotEmpty()
  password: string;
}

@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordCommandHandler implements ICommandHandler<UpdateUserPasswordCommand> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly currentUserService: CurrentUserService,
  ) {}

  async execute(command: UpdateUserPasswordCommand): Promise<void> {
    const user = await this.userRepository.getOne(this.currentUserService.user.id);

    if (!(await bcrypt.compare(command.password, user.password))) throw new BadRequestException('Bad password');

    await this.userRepository.updateUserPassword(command.newPassword, this.currentUserService.user.id);
  }
}
