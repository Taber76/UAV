"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UAV = void 0;
const node_fetch_1 = require("node-fetch");
class UAV {
    constructor(uavName, url) {
        this.uavName = uavName;
        this.url = url;
        this.status = 'Disarmed';
        this.position = { lat: 0, lon: 0, alt: 0 };
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
        const response = await (0, node_fetch_1.default)(`${this.url}/pix?msg_type=SYS_STATUS&max_time=5`);
        const jsonresponse = await response.json();
        return;
    }
    getStatus() {
        return this.status;
    }
    getPosition() {
        this.getStatusOnBoard();
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
    setPosition(lat, lon, alt) {
        this.getStatusOnBoard();
        this.position = { lat, lon, alt };
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