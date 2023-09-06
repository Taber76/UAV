import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalService } from './global/global.service';
import { UavModule } from './uav/uav.module';
import { UserModule } from './user/user.module';
//import { RtspModule } from './rtsp.deprecated/rtsp.module';
//import { FfmpegModule } from './ffmpeg/ffmpeg.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UavModule,
    UserModule,
    //RtspModule,
    //FfmpegModule,
  ],
  providers: [GlobalService],
})
export class AppModule { }

