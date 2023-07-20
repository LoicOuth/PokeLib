import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from 'src/domain/constants/role.constant';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export const ROLES_KEY = 'roles';
export const Auth = (role?: Role) =>
  applyDecorators(SetMetadata(ROLES_KEY, role), UseGuards(AuthGuard), ApiBearerAuth());
