import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { IPokeapiBaseEntity } from 'src/application/common/interfaces/pokeapi/common/base-entity.interface';
import { IEvolutionChainRepository } from 'src/application/common/ports/evolution-chain-repository.port';

@Injectable()
export class EvolutionChainRepository implements IEvolutionChainRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  createFromPokeapi = async (evolutionChain: IPokeapiBaseEntity): Promise<void> => {
    const count = await this.prismaClient.evolutionChain.count({
      where: { poke_api_id: evolutionChain.id },
    });
    if (count <= 0)
      await this.prismaClient.evolutionChain.create({
        data: {
          poke_api_id: evolutionChain.id,
        },
      });
  };
}
