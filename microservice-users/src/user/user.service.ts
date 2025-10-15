import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';

import * as bcrypt from 'bcrypt';
import { USER } from 'src/common/models/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/common/inferfaces/user.interface';

@Injectable()
export class UserService {
 
    constructor(@InjectModel(USER.name) private readonly model:Model<IUser>){}

    async checkPassword(password:string, passwordDB: string):Promise<boolean>{
      return await bcrypt.compare(password,passwordDB);
    }

    async findByUsername(username:string ){
      return await this.model.findOne({username})
    }

  //para hashear el password con bcrypt 
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
      }
// crear un usuario
    async create(userDTO: UserDTO): Promise<IUser> {
        const hash = await this.hashPassword(userDTO.password);
        const newUser = new this.model({ ...userDTO, password: hash });
        return await newUser.save();
      }

    //Encontrar todos los usuarios 
    async findAll(): Promise<IUser[]>{
      return await this.model.find();
    }
    //Encontrar un usuario por Id 
    async findOne(id:string): Promise<IUser> {
      return await this.model.findById(id);
    }
    //para actualizar un usuario
    async update(id:string, userDTO:UserDTO): Promise<IUser>{
      //hasheo de password
      const hash = await this.hashPassword(userDTO.password);
      const user = {...userDTO, password:hash};
      return await  this.model.findByIdAndUpdate(id, user, {new: true});
    }
    // para eliminar un user
    async delete(id:string){
      await this.model.findByIdAndDelete(id);
      return {status: HttpStatus.OK, msg:"Deleted"}
    }

 }

