export interface IUser {
  id: number;
  email: string;
  pseudo: string;
  avatar: string;
  register_with_google: boolean;
  registered_at: Date;
}
