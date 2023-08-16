import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from 'src/domain/constants/role.constant';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export const ROLES_KEY = 'roles';
export const IS_WEBSOCKET_REQUEST = 'is_websocket';

export const Auth = (role?: Role, isWs = false) =>
  applyDecorators(
    SetMetadata(ROLES_KEY, role),
    SetMetadata(IS_WEBSOCKET_REQUEST, isWs),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
  );
