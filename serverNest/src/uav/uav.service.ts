import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Uav } from './uav.schema';
import { GlobalService } from 'src/global/global.service';

import fetch from 'node-fetch';
import * as bcrypt from 'bcrypt';

import { LongCommand } from 'src/types/uav.types';

@Injectable()
export class UavService {
  constructor(
    @InjectModel(Uav.name) private readonly uavModel: Model<Uav>,
    private readonly globalService: GlobalService,
  ) { }

  // ------ UAV ------

  async longCommand(data: LongCommand) {
    const response = await fetch(`${this.globalService.uavUrl}/pix`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.globalService.jwtUav
      },
      body: JSON.stringify(data),
    });
    const jsonresponse = await response.json();
    return jsonresponse;
  }

  async getStatus() {
    const response = await fetch(`${this.globalService.uavUrl}/pix?msg_type=SYS_STATUS&max_time=5`);
    const jsonresponse = await response.json();
    // actualizar globalService
    return
  }

  async getMessage(string) {
    const response = await fetch(`${this.globalService.uavUrl}/pix?${string}`);
    const jsonresponse = await response.json();
    return jsonresponse;
  }


  // ------ DATABASE ------

  async register(uav: Uav) {
    uav.password = await bcrypt.hash(uav.password, 10);
    try {
      return await this.uavModel.create(uav);
    } catch (error) {
      throw error;
    }
  }

  async uavConection(uavname: string, password: string) {
    const uav = await this.uavModel.findOne({ uavname });
    if (!uav) {
      return { response: false };
    }
    const isMatch = await bcrypt.compare(password, uav.password);
    if (isMatch) {
      return { response: true };
    }
  }



}
