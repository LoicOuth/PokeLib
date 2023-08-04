import { Pokemon } from 'src/domain/entities/pokemon.entity';

export class PokemonDto {
  id: number;
  pokedex_order: number;
  name: string;
  description: string;
  height: string;
  weight: string;
  generation: number;
  sprite_regular: string;
  sprite_shiny?: string;
  sprite_gmax?: string;
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
  first_type_id: number;
  second_type_id?: number;

  constructor(
    id: number,
    pokedex_order: number,
    name: string,
    description: string,
    height: string,
    weight: string,
    generation: number,
    sprite_regular: string,
    sprite_shiny: string,
    sprite_gmax: string,
    hp: number,
    atk: number,
    def: number,
    spe_atk: number,
    spe_def: number,
    vit: number,
    first_type_id: number,
    second_type_id: number,
  ) {
    this.id = id;
    this.pokedex_order = pokedex_order;
    this.name = name;
    this.description = description;
    this.height = height;
    this.weight = weight;
    this.generation = generation;
    this.sprite_regular = sprite_regular;
    this.sprite_shiny = sprite_shiny;
    this.sprite_gmax = sprite_gmax;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.spe_atk = spe_atk;
    this.spe_def = spe_def;
    this.vit = vit;
    this.first_type_id = first_type_id;
    this.second_type_id = second_type_id;
  }

  static projection = (pokemon: Pokemon): PokemonDto =>
    new this(
      pokemon.id,
      pokemon.pokedex_order,
      pokemon.name,
      pokemon.description,
      pokemon.height,
      pokemon.weight,
      pokemon.generation,
      pokemon.sprite_regular,
      pokemon.sprite_shiny,
      pokemon.sprite_gmax,
      pokemon.hp,
      pokemon.atk,
      pokemon.def,
      pokemon.spe_atk,
      pokemon.spe_def,
      pokemon.vit,
      pokemon.first_type_id,
      pokemon.second_type_id,
    );

  static listProjection = (pokemons: Pokemon[]): PokemonDto[] => pokemons.map((el) => this.projection(el));
}
