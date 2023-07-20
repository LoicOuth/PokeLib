import { User } from './user.entity';

export class Team {
  name: string;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: bigint;

  user?: User;
}
