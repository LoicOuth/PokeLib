import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { ILocationRepository } from 'src/application/common/ports/location-repository.port';
import { IRegionRepository } from 'src/application/common/ports/region-repository.port';
import { IPokeapiLocation } from 'src/application/common/interfaces/pokeapi/location.interface';
import { getNameInEnglish } from '../pokeapi/pokeapi.constants';
import { Location } from 'src/domain/entities/location.entity';

@Injectable()
export class LocationRepository implements ILocationRepository {
  constructor(private readonly prismaClient: PrismaService, private readonly regionRepo: IRegionRepository) {}

  createOrUpdateFromPokeapi = async (location: IPokeapiLocation): Promise<void> => {
    let region = null;
    if (location.region != null) region = await this.regionRepo.getFromName(location.region.name);

    const data = {
      name: location.name,
      display_name: getNameInEnglish(location),
      region_id: region ? region.id : region,
    };

    await this.prismaClient.location.upsert({
      where: {
        poke_api_id: location.id,
      },
      update: data,
      create: {
        poke_api_id: location.id,
        ...data,
      },
    });
  };

  getFromName = async (name: string): Promise<Location> =>
    await this.prismaClient.location.findUniqueOrThrow({ where: { name } });
}
