import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { getNameInEnglish } from '../pokeapi/pokeapi.constants';
import { ILocationAreaRepository } from 'src/application/common/ports/location-area-repository.port';
import { IPokeapiLocationArea } from 'src/application/common/interfaces/pokeapi/location-area.interface';
import { ILocationRepository } from 'src/application/common/ports/location-repository.port';

@Injectable()
export class LocationAreaRepository implements ILocationAreaRepository {
  constructor(private readonly prismaClient: PrismaService, private readonly locationRepo: ILocationRepository) {}

  createOrUpdateFromPokeapi = async (locationArea: IPokeapiLocationArea): Promise<void> => {
    const location = await this.locationRepo.getFromName(locationArea.location.name);

    const data = {
      name: locationArea.name,
      display_name: getNameInEnglish(locationArea),
      location_id: location.id,
    };

    await this.prismaClient.locationArea.upsert({
      where: {
        poke_api_id: locationArea.id,
      },
      update: data,
      create: {
        poke_api_id: locationArea.id,
        ...data,
      },
    });
  };
}
