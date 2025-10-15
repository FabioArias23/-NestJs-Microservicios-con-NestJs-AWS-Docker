import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
/* eslint-disable prettier/prettier */

//Armamos la clase nuestro DTO
export class UserDTO{

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   readonly name: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   readonly username: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsEmail()
   readonly email: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   readonly password: string;
}
