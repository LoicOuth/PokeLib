import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

interface INamedAPIResourceList<T> {
  count: number;
  results: T[];
}

@Injectable()
export class PokeapiClient {
  private readonly URL = 'https://pokeapi.co/api/v2/';

  constructor(private readonly http: HttpService) {}

  getList = async <T>(endpoint: string): Promise<T[]> => {
    try {
      const getCount = await this.http.axiosRef.get<INamedAPIResourceList<T>>(`${this.URL}${endpoint}`);

      const rest = getCount.data.count - 20;
      let response = null;
      if (rest > 0) {
        response = await this.http.axiosRef.get<INamedAPIResourceList<T>>(
          `${this.URL}${endpoint}?offset=20&limit=${rest}`,
        );
      }

      const lastItems = response != null ? response.data.results : [];

      return [...lastItems, ...getCount.data.results];
    } catch (error) {
      throw new Error(`PokeApi API return error ${error}`);
    }
  };

  get = async <T>(fullUrl: string): Promise<T> => {
    try {
      const response = await this.http.axiosRef.get<T>(fullUrl);

      return response.data;
    } catch (error) {
      throw new Error(`PokeApi API return error ${error}`);
    }
  };
}
