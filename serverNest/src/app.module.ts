import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PixhawkModule } from './pixhawk/pixhawk.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://taber:Aa000001@coderhouse.xfpha7a.mongodb.net/test',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PixhawkModule,
  ],
})
export class AppModule {}
