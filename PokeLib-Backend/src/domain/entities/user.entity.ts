import { Role } from '../constants/role.constant';

export class User {
  id: number;
  email: string;
  pseudo: string;
  password: string;
  avatar: string;
  role: Role;
  google_uuid: string;
  registered_at: Date;
}
