import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/application/common/ports/user-repository.port';

@Injectable()
export class UserHelper {
  constructor(private readonly userRepository: IUserRepository) {}

  checkIfUserExist = async (email: string, pseudo: string, exceptId?: number) => {
    let user = await this.userRepository.getByEmail(email, exceptId);

    if (user) throw new BadRequestException('A user already exist with this email');

    user = await this.userRepository.getByPseudo(pseudo, exceptId);

    if (user) throw new BadRequestException('A user already exist with this pseudo');
  };
}
