/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengerSchema } from './schema/passenger.schema';
import { PASSENGER } from 'src/common/models/models';


@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PASSENGER.name,
        useFactory: () => PassengerSchema,
      },
    ]),
  ],
  controllers: [PassengerController],
  providers: [PassengerService],
  exports: [PassengerService],

})
export class PassengerModule {}
