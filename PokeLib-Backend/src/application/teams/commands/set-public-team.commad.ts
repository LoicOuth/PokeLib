import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { TeamHelper } from '../helpers/team.helper';

export class SetPublicTeamCommand {
  @ApiProperty()
  @IsInt()
  teamId: number;

  @ApiProperty()
  @IsBoolean()
  isPublic: boolean;
}

@CommandHandler(SetPublicTeamCommand)
export class SetPublicTeamCommandHandler implements ICommandHandler<SetPublicTeamCommand> {
  constructor(private readonly teamRepository: ITeamsRepository, private readonly teamHelper: TeamHelper) {}

  async execute(command: SetPublicTeamCommand): Promise<void> {
    await this.teamHelper.checkTeamExistAndUserOwner(command.teamId);

    await this.teamRepository.setPublic(command.teamId, command.isPublic);
  }
}
