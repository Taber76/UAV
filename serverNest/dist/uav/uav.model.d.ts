import { LongCommand } from 'src/types/uav.types';
export declare class UAV {
    private readonly uavName;
    private readonly url;
    private status;
    private position;
    private battery;
    private speed;
    private waypoints;
    constructor(uavName: string, url: string);
    longCommand(data: LongCommand): Promise<any>;
    getStatusOnBoard(): Promise<void>;
    getPositionOnBoard(): Promise<void>;
    getMessage(message: string): Promise<any>;
    getInfo(info: string): any;
    getStatus(): string;
    getPosition(): {
        lat: number;
        lon: number;
        alt: number;
        relative_alt: number;
        vx: number;
        vy: number;
        vz: number;
        hdg: number;
    };
    getSpeed(): number;
    getWaypoints(): {
        lat: number;
        lon: number;
        alt: number;
    }[];
    setStatus(status: string): void;
    setPosition(lat: number, lon: number, alt: number, relative_alt: number, vx: number, vy: number, vz: number, hdg: number): void;
    setSpeed(speed: number): void;
    addWaypoint(lat: number, lon: number, alt: number): void;
}
