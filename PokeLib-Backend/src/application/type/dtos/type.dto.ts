import { Type } from 'src/domain/entities/type.entity';

export class TypeDto {
  id: number;
  name: string;
  color: string;
  sprite: string;

  constructor(id: number, name: string, color: string, sprite: string) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.sprite = sprite;
  }

  static projection = (type: Type): TypeDto => new this(type.id, type.name, type.color, type.sprite);

  static listProjection = (types: Type[]): TypeDto[] => types.map((el) => this.projection(el));
}
