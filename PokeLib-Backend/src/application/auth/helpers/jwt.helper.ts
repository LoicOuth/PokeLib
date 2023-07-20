import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class JwtHelper {
  constructor(private readonly jwtService: JwtService) {}

  async generateNewToken(user: User): Promise<LoginResponseDto> {
    const payload = {
      user: {
        id: user.id,
        pseudo: user.pseudo,
        avatar: user.avatar,
        role: user.role,
      },
    };

    return new LoginResponseDto(await this.jwtService.signAsync(payload));
  }
}
