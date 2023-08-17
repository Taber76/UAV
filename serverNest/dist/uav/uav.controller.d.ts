import { UavService } from './uav.service';
import { UavConnection, UavData, UavJwt } from 'src/types/uav.types';
import { GlobalService } from 'src/global/global.service';
export declare class UavController {
    private readonly uavService;
    private readonly globalService;
    constructor(uavService: UavService, globalService: GlobalService);
    longCommand(data: any): Promise<any>;
    register(data: UavData): Promise<any>;
    getUavUrl(name: string): Promise<any>;
    getStatus(): Promise<any>;
    connect(data: UavConnection): Promise<any>;
    jwt(data: UavJwt): Promise<any>;
}
