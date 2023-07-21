import { BaseEntity } from './base.entity';

export abstract class PokeapiEntity extends BaseEntity {
  poke_api_id: bigint;
}
