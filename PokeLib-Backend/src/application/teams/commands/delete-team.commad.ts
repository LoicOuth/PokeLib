import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { TeamHelper } from '../helpers/team.helper';

export class DeleteTeamCommand {
  @ApiProperty()
  @IsInt()
  teamId: number;
}

@CommandHandler(DeleteTeamCommand)
export class DeleteTeamCommandHandler implements ICommandHandler<DeleteTeamCommand> {
  constructor(private readonly teamRepository: ITeamsRepository, private readonly teamHelper: TeamHelper) {}

  async execute(command: DeleteTeamCommand): Promise<void> {
    await this.teamHelper.checkTeamExistAndUserOwner(command.teamId);

    await this.teamRepository.delete(command.teamId);
  }
}
