import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';

import * as bcrypt from 'bcrypt';
import { UserData } from 'src/types/user.types';

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

}