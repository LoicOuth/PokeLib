export interface IPokemon {
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
}
