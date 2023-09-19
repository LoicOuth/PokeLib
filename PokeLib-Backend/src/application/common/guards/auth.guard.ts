import { CurrentUserService } from './../services/current-user.service';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConnectedUserModel } from '../models/connected-user.model';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/domain/constants/role.constant';
import { IS_WEBSOCKET_REQUEST, ROLES_KEY } from '../decorators/auth.decorator';
import { Socket } from 'socket.io';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly currentUserService: CurrentUserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isWs = this.reflector.getAllAndOverride<boolean>(IS_WEBSOCKET_REQUEST, [
      context.getHandler(),
      context.getClass(),
    ]);

    let token = undefined;

    if (!isWs) {
      const request = context.switchToHttp().getRequest();
      token = this.extractTokenFromHeader(request);
    } else {
      token = (context.switchToWs().getClient() as Socket).handshake.auth.token;
    }

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token);

      //MAYBE : Get user from repository...
      this.currentUserService.user = new ConnectedUserModel(payload.user.id, payload.user.role);
    } catch (ex) {
      console.error(ex);

      throw new UnauthorizedException();
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    //Check role
    if (requiredRoles && requiredRoles !== this.currentUserService.user.role)
      throw new ForbiddenException("You don't have rights");

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
