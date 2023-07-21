import { IPokeapiBaseEntity } from '../interfaces/pokeapi/common/base-entity.interface';

export abstract class IStatRepository {
  abstract createOrUpdateFromPokeapi(move: IPokeapiBaseEntity): Promise<void>;
}
