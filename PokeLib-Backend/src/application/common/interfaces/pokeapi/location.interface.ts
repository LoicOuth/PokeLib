import { IPokeapiBaseEntity } from './common/base-entity.interface';

export interface IPokeapiLocation extends IPokeapiBaseEntity {
  region: {
    name: string;
  };
}
