import { IPokeapiBaseEntity } from '../interfaces/pokeapi/common/base-entity.interface';

export abstract class IEvolutionTriggerRepository {
  abstract createOrUpdateFromPokeapi(evolutionTrigger: IPokeapiBaseEntity): Promise<void>;
}
