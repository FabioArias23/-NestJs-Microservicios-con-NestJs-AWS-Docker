/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { UserDTO } from '.auth.service'; // ELIMINAR O CORREGIR ESTA LÍNEA
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dto/user.dto'; // RUTA CORRECTA para UserDTO, asumiendo que 'user' está en la misma raíz que 'auth'

@ApiTags('Authentication')
@Controller('api/v2/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin') // CORRECCIÓN 1: Cambiado de 'singin' a 'signin' para coincidir con AuthService
  async signIn(@Req() req) {
    // CORRECCIÓN 2: Cambiado de 'singIn' a 'signIn' para coincidir con AuthService
    return await this.authService.signIn(req.user);
  }

  @Post('signup')
  async signUp(@Body() userDTO: UserDTO) {
    return await this.authService.signUp(userDTO);
  }
}