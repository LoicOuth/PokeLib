import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { CurrentUserService } from 'src/application/common/services/current-user.service';

export class UpdateNameTeamCommand {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  teamId: number;
}

@CommandHandler(UpdateNameTeamCommand)
export class UpdateNameTeamCommandHandler implements ICommandHandler<UpdateNameTeamCommand> {
  constructor(private readonly teamRepository: ITeamsRepository, private readonly userService: CurrentUserService) {}

  async execute(command: UpdateNameTeamCommand): Promise<any> {
    const team = await this.teamRepository.getOne(command.teamId);

    if (!team) throw new BadRequestException(`Any team found with id : ${command.teamId} `);

    if (team.user_id !== this.userService.user.id) throw new ForbiddenException('You are not the owner of this team');

    await this.teamRepository.updateName(command.teamId, command.name);
  }
}
