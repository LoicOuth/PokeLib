import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { ITypeRepository } from 'src/application/common/ports/type-repository.port';
import { IPokeapiType } from 'src/application/common/interfaces/pokeapi/type.interface';
import { colorFromType } from '../pokeapi/pokeapi.constants';
import { Type } from 'src/domain/entities/type.entity';

@Injectable()
export class TypeRepository implements ITypeRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  createOrUpdateFromPokeapi = async (types: IPokeapiType[]): Promise<void> => {
    for (const type of types) {
      const data = {
        name: type.name.fr,
        color: colorFromType[type.name.en.toLowerCase()],
        sprite: type.sprites,
      };

      await this.prismaClient.type.upsert({
        where: {
          poke_api_id: type.id,
        },
        update: data,
        create: {
          ...data,
          poke_api_id: type.id,
        },
      });
    }
  };

  getFromName = async (name: string): Promise<Type> =>
    await this.prismaClient.type.findUniqueOrThrow({ where: { name } });
}
