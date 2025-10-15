/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy'; // La crearemos en el siguiente paso
import { AuthController } from './auth.controller'; // El controlador para login, etc.
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';



@Module({
    imports:[
        UserModule, 
        PassportModule,
        ProxyModule,
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory: (config: ConfigService) =>({
                secret: config.get('JWT_SECRET'),
                singOptions:{
                    expiresIn: config.get('EXPIRES_IN'),
                    audience: config.get('APP_URL'),
                    
                },
            }),
        })
    ],
    controllers:[AuthController],
    providers:[AuthService, LocalStrategy, JwtStrategy],
})

export class AuthModule{}