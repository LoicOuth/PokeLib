import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { IGenerationRepository } from 'src/application/common/ports/generation-repository.port';
import { IVersionGroupRepository } from 'src/application/common/ports/version-group-repository.port';
import { IPokeapiVersionGroup } from 'src/application/common/interfaces/pokeapi/version-group.interface';
import { VersionGroup } from 'src/domain/entities/version-group.entity';

@Injectable()
export class VersionGroupRepository implements IVersionGroupRepository {
  constructor(private readonly prismaClient: PrismaService, private readonly generationRepo: IGenerationRepository) {}

  createOrUpdateFromPokeapi = async (versionGroup: IPokeapiVersionGroup): Promise<void> => {
    const generation = await this.generationRepo.getFromName(versionGroup.generation.name);
    const data = {
      name: versionGroup.name,
      generation_id: generation.id,
    };

    await this.prismaClient.versionGroup.upsert({
      where: {
        poke_api_id: versionGroup.id,
      },
      update: data,
      create: {
        poke_api_id: versionGroup.id,
        ...data,
      },
    });
  };

  getFromName = (name: string): Promise<VersionGroup> => this.prismaClient.versionGroup.findFirst({ where: { name } });
}
