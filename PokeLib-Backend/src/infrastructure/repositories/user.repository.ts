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

  getByGoogleUuid = async (uuid: string): Promise<User> =>
    await this.prismaClient.user.findUnique({ where: { google_uuid: uuid } });

  getByEmail = async (email: string, exceptId?: number): Promise<User> =>
    await this.prismaClient.user.findFirst({
      where: {
        email,
        NOT: {
          id: exceptId || -1,
        },
      },
    });

  getByPseudo = async (pseudo: string, exceptId?: number): Promise<User> =>
    await this.prismaClient.user.findFirst({
      where: {
        pseudo,
        NOT: {
          id: exceptId || -1,
        },
      },
    });

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
    const existingUser = await this.prismaClient.user.findUnique({
      where: {
        google_uuid: googleUser.id,
      },
    });

    if (existingUser) {
      const shouldUpdatePseudo = !existingUser.pseudo_is_edited;
      const updateData: {
        avatar?: string;
        email?: string;
        pseudo?: string;
        pseudo_is_edited: boolean;
      } = {
        avatar: googleUser.picture,
        email: googleUser.email,
        pseudo: shouldUpdatePseudo ? googleUser.name : existingUser.pseudo,
        pseudo_is_edited: true,
      };

      return await this.prismaClient.user.update({
        where: {
          google_uuid: googleUser.id,
        },
        data: updateData,
      });
    } else {
      const newData = {
        avatar: googleUser.picture,
        email: googleUser.email,
        pseudo: googleUser.name,
        registered_at: new Date(),
        google_uuid: googleUser.id,
        pseudo_is_edited: true,
      };

      return await this.prismaClient.user.create({
        data: newData,
      });
    }
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

  updateUserInfos = async (pseudo: string, userId: number, email?: string): Promise<void> => {
    await this.prismaClient.user.update({
      where: { id: userId },
      data: {
        email,
        pseudo,
        pseudo_is_edited: true,
      },
    });
  };

  updateUserPassword = async (password: string, userId: number): Promise<void> => {
    const salt = await bcrypt.genSalt();

    await this.prismaClient.user.update({
      where: { id: userId },
      data: {
        password: await bcrypt.hash(password, salt),
      },
    });
  };
}
