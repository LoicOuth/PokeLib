import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { IStatRepository } from 'src/application/common/ports/stat-repository.port';
import { IPokeapiBaseEntity } from 'src/application/common/interfaces/pokeapi/common/base-entity.interface';
import { getNameInEnglish } from '../pokeapi/pokeapi.constants';

@Injectable()
export class StatRepository implements IStatRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  createOrUpdateFromPokeapi = async (stat: IPokeapiBaseEntity): Promise<void> => {
    const data = {
      name: stat.name,
      display_name: getNameInEnglish(stat),
    };

    await this.prismaClient.stat.upsert({
      where: {
        poke_api_id: stat.id,
      },
      update: data,
      create: {
        poke_api_id: stat.id,
        ...data,
      },
    });
  };
}
