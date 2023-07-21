import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { IMoveRepository } from 'src/application/common/ports/move-repository.port';
import { IPokeapiMove } from 'src/application/common/interfaces/pokeapi/move.interface';
import { ITypeRepository } from 'src/application/common/ports/type-repository.port';
import { getNameInEnglish } from '../pokeapi/pokeapi.constants';

@Injectable()
export class MoveRepository implements IMoveRepository {
  constructor(private readonly prismaClient: PrismaService, private readonly typeRepository: ITypeRepository) {}

  createOrUpdateFromPokeapi = async (move: IPokeapiMove): Promise<void> => {
    const type = await this.typeRepository.getFromName(move.type.name);

    const data = {
      name: move.name,
      display_name: getNameInEnglish(move),
      accuracy: move.accuracy,
      power: move.power,
      pp: move.power,
      priority: move.priority,
      damage_class: move.damage_class.name,
      damage_description: '',
      type_id: type.id,
    };

    await this.prismaClient.move.upsert({
      where: {
        poke_api_id: move.id,
      },
      update: data,
      create: {
        poke_api_id: move.id,
        ...data,
      },
    });
  };
}
