/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config'; // Importa ConfigService
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    // La inyección de ConfigService está bien, solo el uso en super() era el tema
    private configService: ConfigService, 
  ) {
    // La llamada a super() DEBE SER LA PRIMERA INSTRUCCIÓN en el constructor
    // Aquí el secreto se obtiene ANTES de pasar el objeto de configuración a super().
    const jwtSecret = configService.get<string>('JWT_SECRET'); // Obtiene el secreto aquí

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret, // Usa la variable local 'jwtSecret' que ya tiene el valor
    });
  }

  async validate(payload: any): Promise<any> {
    // Si necesitas acceder a 'this.configService' para otras cosas más adelante,
    // puedes hacerlo aquí o en cualquier otro método.
    return payload;
  }
}