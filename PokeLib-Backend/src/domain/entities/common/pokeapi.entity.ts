import { BaseEntity } from './base.entity';

export abstract class PokeApiEntity extends BaseEntity {
  poke_api_id: bigint;
}
