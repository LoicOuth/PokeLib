import { Injectable } from '@nestjs/common';
import { ConnectedUserModel } from '../models/connected-user.model';

@Injectable()
export class CurrentUserService {
  user: ConnectedUserModel | null = null;
}
