import { IPokeapiLocationArea } from '../interfaces/pokeapi/location-area.interface';

export abstract class ILocationAreaRepository {
  abstract createOrUpdateFromPokeapi(locationArea: IPokeapiLocationArea): Promise<void>;
}
