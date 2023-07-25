import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { IEvolutionTriggerRepository } from 'src/application/common/ports/evolution-trigger.port';
import { IPokeapiBaseEntity } from 'src/application/common/interfaces/pokeapi/common/base-entity.interface';
import { getNameInEnglish } from '../pokeapi/pokeapi.constants';
import { EvolutionTrigger } from 'src/domain/entities/evolution-trigger.entity';

@Injectable()
export class EvolutionTriggerRepository implements IEvolutionTriggerRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  createOrUpdateFromPokeapi = async (evolutionTrigger: IPokeapiBaseEntity): Promise<void> => {
    const data = {
      name: evolutionTrigger.name,
      display_name: getNameInEnglish(evolutionTrigger),
    };

    await this.prismaClient.evolutionTrigger.upsert({
      where: {
        poke_api_id: evolutionTrigger.id,
      },
      update: data,
      create: {
        poke_api_id: evolutionTrigger.id,
        ...data,
      },
    });
  };

  getFromName = async (name: string): Promise<EvolutionTrigger> =>
    await this.prismaClient.evolutionTrigger.findUniqueOrThrow({ where: { name } });
}
