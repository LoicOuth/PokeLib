import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { IRegionRepository } from 'src/application/common/ports/region-repository.port';
import { getNameInEnglish } from '../pokeapi/pokeapi.constants';
import { IGenerationRepository } from 'src/application/common/ports/generation-repository.port';
import { IPokeapiGeneration } from 'src/application/common/interfaces/pokeapi/generation.interface';
import { Generation } from 'src/domain/entities/generation.entity';

@Injectable()
export class GenerationRepository implements IGenerationRepository {
  constructor(private readonly prismaClient: PrismaService, private readonly regionRepo: IRegionRepository) {}

  createOrUpdateFromPokeapi = async (generation: IPokeapiGeneration): Promise<void> => {
    const region = await this.regionRepo.getFromName(generation.main_region.name);

    const data = {
      name: generation.name,
      display_name: getNameInEnglish(generation),
      region_id: region.id,
    };

    await this.prismaClient.generation.upsert({
      where: {
        poke_api_id: generation.id,
      },
      update: data,
      create: {
        poke_api_id: generation.id,
        ...data,
      },
    });
  };

  getFromName = async (name: string): Promise<Generation> =>
    await this.prismaClient.generation.findUniqueOrThrow({ where: { name } });
}
