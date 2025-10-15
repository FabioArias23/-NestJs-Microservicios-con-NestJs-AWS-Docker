/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { USER } from 'src/common/models/models';
import { UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';


@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        name: USER.name,
        useFactory:()=> UserSchema,
      }
  ]),
  ],
  controllers: [UserController],
  providers:[UserService],
  exports: [UserService]
})
export class UserModule {}
