import { IPokeapiBaseEntity } from './common/base-entity.interface';

export interface IPokeapiLocationArea extends IPokeapiBaseEntity {
  location: {
    name: string;
  };
}
