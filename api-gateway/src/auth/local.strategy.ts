/* eslint-disable prettier/prettier */
import { Strategy} from 'passport-local';
import{PassportStrategy} from '@nestjs/passport';
import{Injectable, UnauthorizedException, } from '@nestjs/common'
import{ AuthService} from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            usernameField:'username',
            passwordField:'password'
       
        });
    }
 async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);

    // --- CORRECCIÓN AQUÍ ---
    if (!user) { // Condición entre paréntesis, cuerpo entre llaves
      throw new UnauthorizedException('Invalid credentials'); // Opcional: mensaje para el error
    }

    return user;
  }

}

