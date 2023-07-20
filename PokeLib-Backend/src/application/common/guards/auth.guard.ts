import { CurrentUserService } from './../services/current-user.service';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConnectedUserModel } from '../models/connected-user.model';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/domain/constants/role.constant';
import { ROLES_KEY } from '../decorators/auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly currentUserService: CurrentUserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

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

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
