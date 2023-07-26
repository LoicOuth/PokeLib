import { IPokeapiType } from '../interfaces/pokeapi/type.interface';

export abstract class ITypeRepository {
  abstract createOrUpdateFromPokeapi(type: IPokeapiType): Promise<void>;
}
