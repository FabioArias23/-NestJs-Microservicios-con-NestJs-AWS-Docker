/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from 'src/flight/flight.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:['.env.development'],
    isGlobal:true
  }) , MongooseModule.forRoot(process.env.URI_MONGODB,),
  FlightModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
