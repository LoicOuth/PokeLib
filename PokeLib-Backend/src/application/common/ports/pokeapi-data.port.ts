export abstract class IPokeapiData {
  abstract setDataInDatabase(): Promise<void>;
}
