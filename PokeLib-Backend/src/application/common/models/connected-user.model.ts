import { Role } from 'src/domain/constants/role.constant';

export class ConnectedUserModel {
  id: number;
  role: Role;

  constructor(id: number, role: Role) {
    this.id = id;
    this.role = role;
  }
}
