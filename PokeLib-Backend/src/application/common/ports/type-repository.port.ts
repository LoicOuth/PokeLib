import { Type } from 'src/domain/entities/type.entity';
import { IPokeapiType } from '../interfaces/pokeapi/type.interface';

export abstract class ITypeRepository {
  abstract createOrUpdateFromPokeapi(types: IPokeapiType[]): Promise<void>;
  abstract getFromName(name: string): Promise<Type>;
}
