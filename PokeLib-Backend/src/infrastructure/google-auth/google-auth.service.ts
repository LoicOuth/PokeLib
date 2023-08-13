import { Injectable } from '@nestjs/common';
import { IGoogleAuth } from 'src/application/common/ports/google-auth.port';
import { GoogleUserModel } from 'src/application/common/models/google-user.model';
import { HttpService } from '@nestjs/axios';
import { GooglePeople } from './google-people.interface';
import { ConfigService } from '@nestjs/config';
import { IEnvironmentConfig } from 'src/application/common/interfaces/environment.interface';

@Injectable()
export class GoogleAuthService implements IGoogleAuth {
  constructor(private readonly config: ConfigService<IEnvironmentConfig>, private readonly http: HttpService) {}

  async getAccessToken(authCode: string): Promise<string> {
    try {
      const response = await this.http.axiosRef.post<{ access_token: string }>('https://oauth2.googleapis.com/token', {
        client_id: this.config.get('GOOGLE_CLIENT_ID'),
        client_secret: this.config.get('GOOGLE_CLIENT_SECRET'),
        code: authCode,
        grant_type: 'authorization_code',
        redirect_uri: this.config.get('GOOGLE_REDIRECT_URI'),
      });

      return response.data.access_token;
    } catch (error) {
      throw new Error(`Google oauth return error ${error}`);
    }
  }

  async getUserInfo(accessToken: string): Promise<GoogleUserModel> {
    try {
      const response = await this.http.axiosRef.get<GooglePeople>(
        'https://people.googleapis.com/v1/people/me?personFields=emailAddresses%2Cnames%2Cphotos',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const user = new GoogleUserModel();
      const email = response.data.emailAddresses.find((el) => el.metadata.primary);

      user.id = email.metadata.source.id;
      user.email = email.value;
      user.name = response.data.names.find((el) => el.metadata.primary).displayName;
      user.picture = response.data.photos.find((el) => el.metadata.primary).url;

      return user;
    } catch (error) {
      throw new Error(`Google API return error ${error}`);
    }
  }
}
