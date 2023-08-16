import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';

import * as bcrypt from 'bcrypt';
import { UserData, UserLog } from 'src/types/user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) { }

  async register(user: UserData) {
    user.password = await bcrypt.hash(user.password, 10);
    try {
      return await this.userModel.create(user);
    } catch (error) {
      throw error;
    }
  }

  async login(user: UserLog) {
    try {
      const userFound = await this.userModel.findOne({ username: user.username });
      if (userFound) {
        const match = await bcrypt.compare(user.password, userFound.password);
        if (match) {
          return userFound;
        } else {
          throw new Error('Password incorrect');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw error;
    }
  }

}