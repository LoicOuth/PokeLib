import { CommandBus } from '@nestjs/cqrs';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Auth } from 'src/application/common/decorators/auth.decorator';
import { CurrentUserService } from 'src/application/common/services/current-user.service';
import { UpdateNameTeamCommand } from 'src/application/teams/commands/update-name-team.command';
import { DefaultRequest } from './request/common/default.request';
import { AddPokemonToTeamCommand } from 'src/application/teams/commands/add-pokemon-to-team.command';
import { DeletePokemonToTeamCommand } from 'src/application/teams/commands/delete-pokemon-to-team.command';
import { SwitchPokemonToTeamCommand } from 'src/application/teams/commands/switch-pokemon-to-team.command';
import { SetPublicTeamCommand } from 'src/application/teams/commands/set-public-team.commad';

const TeamEvent = {
  JOIN_ROOM: 'join:room',
  UPDATE_NAME: 'update:name',
  ADD_POKEMON: 'add:pokemon',
  DELETE_POKEMIN: 'delete:pokemon',
  SWITCH_POLEMON: 'switch:pokemon',
  SET_PUBLIC: 'set:public',
};

@WebSocketGateway({ namespace: 'team', cors: '*' })
export class TeamGateway implements OnGatewayConnection {
  constructor(private readonly commandBus: CommandBus, private readonly currentUserService: CurrentUserService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(client.handshake.auth);
  }

  @Auth(undefined, true)
  @SubscribeMessage(TeamEvent.JOIN_ROOM)
  joinRoom(socket: Socket, roomId: string) {
    socket.join(roomId);
  }

  @Auth(undefined, true)
  @SubscribeMessage(TeamEvent.UPDATE_NAME)
  async handleUpdateName(@MessageBody() [roomId, body]: DefaultRequest<{ name: string }>) {
    const command = new UpdateNameTeamCommand();
    command.teamId = parseInt(roomId);
    command.name = body.name;

    await this.commandBus.execute(command);
  }

  @Auth(undefined, true)
  @SubscribeMessage(TeamEvent.DELETE_POKEMIN)
  async handleDeletePokemon(@MessageBody() [roomId, body]: DefaultRequest<{ pokemonId: number }>) {
    const command = new DeletePokemonToTeamCommand();
    command.teamId = parseInt(roomId);
    command.pokemonId = body.pokemonId;

    await this.commandBus.execute(command);
  }

  @Auth(undefined, true)
  @SubscribeMessage(TeamEvent.ADD_POKEMON)
  async handleAddPokemon(@MessageBody() [roomId, body]: DefaultRequest<{ pokemonId: number }>) {
    const command = new AddPokemonToTeamCommand();
    command.teamId = parseInt(roomId);
    command.pokemonId = body.pokemonId;

    await this.commandBus.execute(command);
  }

  @Auth(undefined, true)
  @SubscribeMessage(TeamEvent.SWITCH_POLEMON)
  async handleSwitchPokemon(
    @MessageBody() [roomId, body]: DefaultRequest<{ oldPokemonId: number; pokemonId: number }>,
  ) {
    const command = new SwitchPokemonToTeamCommand();
    command.teamId = parseInt(roomId);
    command.oldPokemonId = body.oldPokemonId;
    command.pokemonId = body.pokemonId;

    await this.commandBus.execute(command);
  }

  @Auth(undefined, true)
  @SubscribeMessage(TeamEvent.SET_PUBLIC)
  async handleSetPublic(@MessageBody() [roomId, body]: DefaultRequest<{ isPublic: boolean }>) {
    const command = new SetPublicTeamCommand();
    command.teamId = parseInt(roomId);
    command.isPublic = body.isPublic;

    await this.commandBus.execute(command);
  }
}
