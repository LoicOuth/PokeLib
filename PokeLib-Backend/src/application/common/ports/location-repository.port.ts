import { Location } from 'src/domain/entities/location.entity';
import { IPokeapiLocation } from '../interfaces/pokeapi/location.interface';

export abstract class ILocationRepository {
  abstract createOrUpdateFromPokeapi(location: IPokeapiLocation): Promise<void>;
  abstract getFromName(name: string): Promise<Location>;
}
