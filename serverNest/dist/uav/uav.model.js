"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UAV = void 0;
const node_fetch_1 = require("node-fetch");
class UAV {
    constructor(uavName, url) {
        this.uavName = uavName;
        this.url = url;
        this.status = 'Disarmed';
        this.position = { lat: 0, lon: 0, alt: 0, relative_alt: 0, vx: 0, vy: 0, vz: 0, hdg: 0 };
        this.battery = { battery_remaining: 0, voltage_battery: 0, current_battery: 0 };
        this.speed = 0;
        this.waypoints = [];
    }
    async longCommand(data) {
        const response = await (0, node_fetch_1.default)(`${this.url}/pix`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const jsonresponse = await response.json();
        return jsonresponse;
    }
    async getStatusOnBoard() {
        try {
            const response = await (0, node_fetch_1.default)(`${this.url}/pix?msg_type=SYS_STATUS&max_time=5`);
            const jsonresponse = await response.json();
            const batteryKeys = ['battery_remaining', 'voltage_battery', 'current_battery'];
            batteryKeys.forEach(key => this.battery[key] = jsonresponse.message[key]);
            return;
        }
        catch (error) {
            throw error;
        }
    }
    async getPositionOnBoard() {
        try {
            const response = await (0, node_fetch_1.default)(`${this.url}/pix?msg_type=GLOBAL_POSITION_INT&max_time=5`);
            const jsonresponse = await response.json();
            const positionKeys = ['lat', 'lon', 'alt', 'relative_alt', 'vx', 'vy', 'vz', 'hdg'];
            positionKeys.forEach(key => this.position[key] = jsonresponse.message[key]);
            return;
        }
        catch (error) {
            throw error;
        }
    }
    async getMessage(message) {
        try {
            const response = await (0, node_fetch_1.default)(`${this.url}/pix?msg_type=${message}&max_time=5`);
            const jsonresponse = await response.json();
            return jsonresponse;
        }
        catch (error) {
            throw error;
        }
    }
    getInfo(info) {
        if (info === 'status') {
            return this.getStatus();
        }
        else if (info === 'position') {
            return this.getPosition();
        }
        else {
            return this.getMessage(info);
        }
    }
    getStatus() {
        this.getStatusOnBoard();
        return this.status;
    }
    getPosition() {
        this.getPositionOnBoard();
        return this.position;
    }
    getSpeed() {
        return this.speed;
    }
    getWaypoints() {
        return this.waypoints;
    }
    setStatus(status) {
        this.status = status;
    }
    setPosition(lat, lon, alt, relative_alt, vx, vy, vz, hdg) {
        this.getStatusOnBoard();
        this.position = { lat, lon, alt, relative_alt, vx, vy, vz, hdg };
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    addWaypoint(lat, lon, alt) {
        this.waypoints.push({ lat, lon, alt });
    }
}
exports.UAV = UAV;
//# sourceMappingURL=uav.model.js.map