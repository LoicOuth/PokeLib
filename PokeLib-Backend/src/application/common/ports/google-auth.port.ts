import { GoogleUserModel } from '../models/google-user.model';

export abstract class IGoogleAuth {
  abstract getAccessToken(authCode: string): Promise<string>;
  abstract getUserInfo(accessToken: string): Promise<GoogleUserModel>;
}
