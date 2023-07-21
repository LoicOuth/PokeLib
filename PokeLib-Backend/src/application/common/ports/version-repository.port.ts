import { IPokeapiVersion } from '../interfaces/pokeapi/version.interface';
import { Version } from 'src/domain/entities/version.entity';

export abstract class IVersionRepository {
  abstract createOrUpdateFromPokeapi(verionGroup: IPokeapiVersion): Promise<void>;
  abstract getFromName(name: string): Promise<Version>;
}
