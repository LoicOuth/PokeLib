import { User } from 'src/domain/entities/user.entity';
import { IPagination } from '../interfaces/pagination.interface';
import { GoogleUserModel } from '../models/google-user.model';

export abstract class IUserRepository {
  abstract getAll(): Promise<User[]>;
  abstract getOne(id: number): Promise<User>;
  abstract getByGoogleUuid(uuid: string): Promise<User>;
  abstract getByEmail(email: string): Promise<User>;
  abstract getByPseudo(pseudo: string): Promise<User>;
  abstract getOneFromEmailOrPseudo(username: string): Promise<User | undefined>;
  abstract getPaginated(page: number, take: number): Promise<IPagination<User>>;
  abstract createOrUpdateFromGoogle(googleUser: GoogleUserModel): Promise<User>;
  abstract createUser(email: string, pseudo: string, password: string): Promise<User>;
  abstract updateUserAvatar(path: string, userId: number): Promise<User>;
}
