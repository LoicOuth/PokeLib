import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { IPokeapiBaseEntity } from 'src/application/common/interfaces/pokeapi/common/base-entity.interface';
import { IRegionRepository } from 'src/application/common/ports/region-repository.port';
import { Region } from 'src/domain/entities/region.entity';
import { getNameInEnglish } from '../pokeapi/pokeapi.constants';

@Injectable()
export class RegionRepository implements IRegionRepository {
  constructor(private readonly prismaClient: PrismaService) {}
  createOrUpdateFromPokeapi = async (region: IPokeapiBaseEntity): Promise<void> => {
    const data = {
      name: region.name,
      display_name: getNameInEnglish(region),
    };

    await this.prismaClient.region.upsert({
      where: {
        poke_api_id: region.id,
      },
      update: data,
      create: {
        poke_api_id: region.id,
        ...data,
      },
    });
  };

  getFromName = async (name: string): Promise<Region> =>
    await this.prismaClient.region.findUniqueOrThrow({ where: { name } });
}
