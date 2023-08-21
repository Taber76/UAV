import { UavService } from './uav.service';
import { UavConnection, UavData, UavJwt } from 'src/types/uav.types';
import { GlobalService } from 'src/global/global.service';
export declare class UavController {
    private readonly uavService;
    private readonly globalService;
    private uavInstances;
    constructor(uavService: UavService, globalService: GlobalService);
    longCommand(data: any): Promise<any>;
    getStatus(uavname: string): Promise<any>;
    register(data: UavData): Promise<any>;
    list(): Promise<any>;
    getUavUrl(name: string): Promise<any>;
    connect(data: UavConnection, ip: string): Promise<any>;
    jwt(data: UavJwt): Promise<any>;
}
