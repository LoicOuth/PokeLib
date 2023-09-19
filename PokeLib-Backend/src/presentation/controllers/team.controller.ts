import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetPublicTeamsQuery } from 'src/application/teams/queries/get-public-teams.query';
import { Auth } from 'src/application/common/decorators/auth.decorator';
import { CreateTeamCommand } from 'src/application/teams/commands/create-team.command';
import { GetOneTeamQuery } from 'src/application/teams/queries/get-one-team.query';
import { GetMyTeamsQuery } from 'src/application/teams/queries/get-my-teams.query';
import { DeleteTeamCommand } from 'src/application/teams/commands/delete-team.commad';
import { GetTeamsFromUserQuery } from 'src/application/teams/queries/get-from-user.query copy';

@ApiTags('Teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly queryBus: QueryBus, private readonly commandbus: CommandBus) {}

  @Get('public')
  async getAll(@Query() query: GetPublicTeamsQuery) {
    return await this.queryBus.execute(query);
  }

  @Auth()
  @Get('me')
  async getMyTeams(@Query() query: GetMyTeamsQuery) {
    return await this.queryBus.execute(query);
  }

  @Auth()
  @Get()
  async getFromUserId(@Query() query: GetTeamsFromUserQuery) {
    return await this.queryBus.execute(query);
  }

  @Get(':teamId')
  async getOne(@Param('teamId') teamId: number) {
    const query = new GetOneTeamQuery();
    query.teamId = teamId;

    return await this.queryBus.execute(query);
  }

  @Auth()
  @Post('create')
  async create() {
    return await this.commandbus.execute(new CreateTeamCommand());
  }

  @Auth()
  @Delete(':teamId')
  async delete(@Param('teamId') teamId: number) {
    const command = new DeleteTeamCommand();
    command.teamId = teamId;

    return await this.commandbus.execute(command);
  }
}
