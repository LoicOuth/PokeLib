import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { IVersionGroupRepository } from 'src/application/common/ports/version-group-repository.port';
import { IVersionRepository } from 'src/application/common/ports/version-repository.port';
import { IPokeapiVersion } from 'src/application/common/interfaces/pokeapi/version.interface';
import { getNameInEnglish } from '../pokeapi/pokeapi.constants';
import { Version } from 'src/domain/entities/version.entity';

@Injectable()
export class VersionRepository implements IVersionRepository {
  constructor(
    private readonly prismaClient: PrismaService,
    private readonly versionGroupRepo: IVersionGroupRepository,
  ) {}

  createOrUpdateFromPokeapi = async (version: IPokeapiVersion): Promise<void> => {
    const versionGroup = await this.versionGroupRepo.getFromName(version.version_group.name);

    const data = {
      name: version.name,
      display_name: getNameInEnglish(version),
      version_group_id: versionGroup.id,
    };

    await this.prismaClient.version.upsert({
      where: {
        poke_api_id: version.id,
      },
      update: data,
      create: {
        poke_api_id: version.id,
        ...data,
      },
    });
  };

  getFromName = (name: string): Promise<Version> => this.prismaClient.version.findFirst({ where: { name } });
}
