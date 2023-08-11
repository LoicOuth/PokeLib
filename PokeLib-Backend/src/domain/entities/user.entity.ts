import { Role } from '../constants/role.constant';
import { BaseEntity } from './common/base.entity';
import { Team } from './team.entity';

export class User extends BaseEntity {
  email: string;
  pseudo: string;
  password: string;
  avatar: string;
  role: Role;
  pseudo_is_edited: boolean;
  google_uuid: string;
  registered_at: Date;

  teams?: Team[];
}
