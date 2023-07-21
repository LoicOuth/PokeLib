import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/application/common/ports/user-repository.port';
import { PrismaService } from '../adapter/prisma.service';
import { IPagination } from 'src/application/common/interfaces/pagination.interface';
import { Pagination } from '../pagination';
import { GoogleUserModel } from 'src/application/common/models/google-user.model';
import * as bcrypt from 'bcrypt';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  getAll = async (): Promise<User[]> => await this.prismaClient.user.findMany();

  getOne = async (id: number): Promise<User> => await this.prismaClient.user.findUnique({ where: { id } });

  getOneFromEmailOrPseudo = async (username: string): Promise<User | undefined> =>
    await this.prismaClient.user.findFirst({ where: { OR: [{ email: username }, { pseudo: username }] } });

  async getPaginated(page: number, take: number): Promise<IPagination<User>> {
    const count = await this.prismaClient.user.count();

    const list = await this.prismaClient.user.findMany({
      skip: (page - 1) * take,
      take,
    });

    return Pagination.paginated(list, page, take, count);
  }

  async createOrUpdateFromGoogle(googleUser: GoogleUserModel): Promise<User> {
    const data = {
      avatar: googleUser.picture,
      email: googleUser.email,
      pseudo: googleUser.name,
    };

    return await this.prismaClient.user.upsert({
      where: {
        google_uuid: googleUser.id,
      },
      update: data,
      create: {
        ...data,
        registered_at: new Date(),
        google_uuid: googleUser.id,
      },
    });
  }

  async createUser(email: string, pseudo: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt();

    return await this.prismaClient.user.create({
      data: {
        email,
        pseudo,
        avatar: '',
        password: await bcrypt.hash(password, salt),
        registered_at: new Date(),
      },
    });
  }

  updateUserAvatar = async (path: string, userId: number): Promise<User> =>
    await this.prismaClient.user.update({ where: { id: userId }, data: { avatar: path } });
}
