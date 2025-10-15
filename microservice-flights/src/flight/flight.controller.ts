/* eslint-disable prettier/prettier */
import {  Controller,  Param,   } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMSG } from 'src/common/constants';


@Controller()
export class FlightController {
    constructor(private readonly flightService: FlightService,
                ){}
    @MessagePattern(FlightMSG.CREATE)
    create(@Payload() flightDTO: FlightDTO) { 
        return this.flightService.create(flightDTO);
    }
 @MessagePattern(FlightMSG.FIND_ALL)
    findAll(){
        return this.flightService.findAll();
    }
    
 @MessagePattern(FlightMSG.FIND_ONE)
    findOne(@Payload() id: string){
    return this.flightService.findOne(id);
    }


 @MessagePattern(FlightMSG.UPDATE)
    update(@Payload( ) payload){
        return this.flightService.update(payload.id, payload.flightDTO);
        
    }
   @MessagePattern(FlightMSG.DELETE)
    delete(@Param('id') id: string){
        return this.flightService.delete(id);
    }

  //   @Post(':flightId/passenger/:passengerId')
  // async addPassenger(
  //   @Param('flightId') flightId: string,
  //   @Param('passengerId') passengerId: string,
  // ) {
  //   const passenger = await this.passengerService.findOne(passengerId);
  //   if (!passenger)
  //     throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);

  //   return this.flightService.addPassenger(flightId, passengerId);
  // }
}

