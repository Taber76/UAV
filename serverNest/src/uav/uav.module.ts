import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GlobalService } from 'src/global/global.service';

import { UavController } from './uav.controller';
import { UavService } from './uav.service';
import { Uav, UavSchema } from './uav.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Uav.name, schema: UavSchema }])],
  controllers: [UavController],
  providers: [UavService, GlobalService],
})
export class UavModule { }
