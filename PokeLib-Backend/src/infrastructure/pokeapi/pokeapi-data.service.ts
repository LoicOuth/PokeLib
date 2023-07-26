import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { IPokeapiData } from 'src/application/common/ports/pokeapi-data.port';

@Injectable()
export class PokeapiData implements IPokeapiData {
  private logger = new Logger(PokeapiData.name);

  constructor(private readonly http: HttpService) {}

  setDataInDatabase = async (): Promise<void> => {
    console.log('test');
  };

  private get = async <T>(endpoint: string): Promise<T> => {
    try {
      const response = await this.http.axiosRef.get<T>(`https://api-pokemon-fr.vercel.app/api/v1/${endpoint}`);

      return response.data;
    } catch (error) {
      this.logger.error(`Pokeapi API return error : ${error}, on request : /${endpoint}, method : ${this.get.name}`);

      throw new Error(`PokeApi API return error ${error}`);
    }
  };
}
