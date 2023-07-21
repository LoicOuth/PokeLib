export interface IPokeapiBaseEntity {
  id: bigint;
  name: string;
  names: {
    language: {
      name: string;
    };
    name: string;
  }[];
}
