import { IPokeapiBaseEntity } from './common/base-entity.interface';

export interface IPokeapiVersion extends IPokeapiBaseEntity {
  version_group: {
    name: string;
  };
}
