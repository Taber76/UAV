import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Response } from 'express';
import { FfmpegStreamService } from './ffmpeg.service';
export declare class FfmpegStreamController implements OnModuleInit, OnModuleDestroy {
    private readonly ffmpegService;
    constructor(ffmpegService: FfmpegStreamService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    private res;
    getVideoStream(res: Response<any>): Promise<void>;
}
