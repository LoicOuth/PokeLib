import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { TeamHelper } from '../helpers/team.helper';

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
  constructor(private readonly teamRepository: ITeamsRepository, private readonly teamHelper: TeamHelper) {}

  async execute(command: UpdateNameTeamCommand): Promise<any> {
    await this.teamHelper.checkTeamExistAndUserOwner(command.teamId);

    await this.teamRepository.updateName(command.teamId, command.name);
  }
}
