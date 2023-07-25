import { EvolutionTrigger } from 'src/domain/entities/evolution-trigger.entity';
import { IPokeapiBaseEntity } from '../interfaces/pokeapi/common/base-entity.interface';

export abstract class IEvolutionTriggerRepository {
  abstract createOrUpdateFromPokeapi(evolutionTrigger: IPokeapiBaseEntity): Promise<void>;
  abstract getFromName(name: string): Promise<EvolutionTrigger>;
}
