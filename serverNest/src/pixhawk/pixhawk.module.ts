import { Module } from '@nestjs/common';
import { PixhawkController } from './pixhawk.controller';
import { PixhawkService } from './pixhawk.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [PixhawkController],
  providers: [PixhawkService],
})
export class PixhawkModule {}
