import { Region } from 'src/domain/entities/region.entity';
import { IPokeapiBaseEntity } from '../interfaces/pokeapi/common/base-entity.interface';

export abstract class IRegionRepository {
  abstract createOrUpdateFromPokeapi(move: IPokeapiBaseEntity): Promise<void>;
  abstract getFromName(name: string): Promise<Region>;
}
