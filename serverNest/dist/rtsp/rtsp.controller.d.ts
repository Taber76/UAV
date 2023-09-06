import { RtspService } from "./rtsp.service";
export declare class RtspController {
    private readonly rtspService;
    constructor(rtspService: RtspService);
    private res;
    getVideoStream(data: any): Promise<void>;
}
