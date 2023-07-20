import { User } from 'src/domain/entities/user.entity';

export class UserDto {
  id: number;
  email: string;
  pseudo: string;
  avatar: string;
  register_with_google: boolean;
  registered_at: Date;

  constructor(
    id: number,
    email: string,
    pseudo: string,
    avatar: string,
    register_with_google: boolean,
    registered_at: Date,
  ) {
    this.id = id;
    this.email = email;
    this.pseudo = pseudo;
    this.avatar = avatar;
    this.register_with_google = register_with_google;
    this.registered_at = registered_at;
  }

  static projection = (user: User): UserDto =>
    new this(user.id, user.email, user.pseudo, user.avatar, user.google_uuid !== null, user.registered_at);

  static listProjection = (users: User[]): UserDto[] => users.map((el) => this.projection(el));
}
