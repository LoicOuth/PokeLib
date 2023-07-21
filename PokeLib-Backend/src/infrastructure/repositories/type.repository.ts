import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { ITypeRepository } from 'src/application/common/ports/type-repository.port';
import { IPokeapiType } from 'src/application/common/interfaces/pokeapi/type.interface';
import { colorFromType, getNameInEnglish } from '../pokeapi/pokeapi.constants';
import { Type } from 'src/domain/entities/type.entity';

@Injectable()
export class TypeRepository implements ITypeRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  createOrUpdateFromPokeapi = async (type: IPokeapiType): Promise<void> => {
    const data = {
      name: type.name,
      display_name: getNameInEnglish(type),

      color: colorFromType[type.name.toLocaleLowerCase()] ?? '',
    };

    await this.prismaClient.type.upsert({
      where: {
        poke_api_id: type.id,
      },
      update: data,
      create: {
        poke_api_id: type.id,
        ...data,
      },
    });
  };

  getFromName = async (name: string): Promise<Type> => this.prismaClient.type.findFirst({ where: { name } });
}
