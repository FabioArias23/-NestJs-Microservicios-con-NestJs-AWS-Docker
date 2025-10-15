/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices'; // <-- CORRECCIÓN AQUÍ: 'ClientProxy' con 'C' mayúscula
import { lastValueFrom } from 'rxjs';
import { UserMSG } from '../common/constants'; // Ruta ajustada si 'common' está un nivel arriba
import { ClientProxySuperFlights } from '../common/proxy/client-proxy'; // Ruta ajustada
import { UserDTO } from '../user/dto/user.dto'; // Ruta ajustada

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxySuperFlights,
    private readonly jwtService: JwtService,
  ) { }

  // Aquí usas tu _clienteProxyUser, que supongo que ya está configurado para un ClientProxy
  private _clienteProxyUser = this.clientProxy.clientProxyUser();

  async validateUser(username: string, password: string): Promise<any> {
    // Si estás usando .toPromise() significa que estás usando la versión anterior de NestJS o rxjs.
    // Con las versiones recientes de rxjs (6+), lastValueFrom o firstValueFrom son preferibles.
    // Ya lo tienes importado, así que es mejor usarlo.
    const user = await lastValueFrom(
        this._clienteProxyUser.send(UserMSG.VALID_USER, { username, password })
    );

    if (user) return user;
    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
      // Asegúrate de incluir roles si los usas para autorización
      roles: user.roles || [], 
    };

    return { access_token: this.jwtService.sign(payload) }; // Cambio de 'access_tokens' a 'access_token' (singular)
  }

  async signUp(userDTO: UserDTO) {
    return await lastValueFrom(
        this._clienteProxyUser.send(UserMSG.CREATE, userDTO)
    );
  }
}