import fetch from 'node-fetch';
import { LongCommand } from 'src/types/uav.types';


export class UAV {

  private status: string = 'Disarmed';
  private position:
    {
      lat: number,
      lon: number,
      alt: number,
      relative_alt: number,
      vx: number,
      vy: number,
      vz: number,
      hdg: number    // yaw angle (cabeceo)
    } = { lat: 0, lon: 0, alt: 0, relative_alt: 0, vx: 0, vy: 0, vz: 0, hdg: 0 };
  private battery: {
    battery_remaining: number,
    voltage_battery: number,
    current_battery: number
  } = { battery_remaining: 0, voltage_battery: 0, current_battery: 0 };
  private speed: number = 0;
  private waypoints: { lat: number, lon: number, alt: number }[] = [];

  constructor(
    private readonly uavName: string,
    private readonly url: string,
    // private readonly jwt: string
  ) { }


  // METODOS -------------------------------------------

  async longCommand(data: LongCommand) {
    const response = await fetch(`${this.url}/pix`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //  Authorization: this.jwt
      },
      body: JSON.stringify(data),
    });
    const jsonresponse = await response.json();
    return jsonresponse;
  }

  async getStatusOnBoard() {
    try {
      const response = await fetch(`${this.url}/pix?msg_type=SYS_STATUS&max_time=5`);
      const jsonresponse = await response.json();
      const batteryKeys = ['battery_remaining', 'voltage_battery', 'current_battery'];
      batteryKeys.forEach(key => this.battery[key] = jsonresponse.message[key]);
      return;
    } catch (error) {
      throw error
    }
  }

  async getPositionOnBoard() {
    try {
      const response = await fetch(`${this.url}/pix?msg_type=GLOBAL_POSITION_INT&max_time=5`);
      const jsonresponse = await response.json();
      const positionKeys = ['lat', 'lon', 'alt', 'relative_alt', 'vx', 'vy', 'vz', 'hdg'];
      positionKeys.forEach(key => this.position[key] = jsonresponse.message[key]);
      return;
    } catch (error) {
      throw error
    }
  }

  async getMessage(message: string) {
    try {
      const response = await fetch(`${this.url}/pix?msg_type=${message}&max_time=5`);
      const jsonresponse = await response.json();
      return jsonresponse;
    } catch (error) {
      throw error
    }
  }

  // PROPIEDADES -----------------------------------
  // GET -------------------------------------------
  getInfo(info: string): any {
    if (info === 'status') {
      return this.getStatus();
    } else if (info === 'position') {
      return this.getPosition();
    } else {
      return this.getMessage(info);
    }
  }

  getStatus(): string {
    this.getStatusOnBoard()
    return this.status;
  }

  getPosition(): { lat: number, lon: number, alt: number, relative_alt: number, vx: number, vy: number, vz: number, hdg: number } {
    this.getPositionOnBoard()
    return this.position;
  }

  getSpeed(): number {
    return this.speed;
  }

  getWaypoints(): { lat: number, lon: number, alt: number }[] {
    return this.waypoints;
  }


  // SET -----------------------------------
  setStatus(status: string) {
    this.status = status;
  }

  setPosition(lat: number, lon: number, alt: number, relative_alt: number, vx: number, vy: number, vz: number, hdg: number) {
    this.getStatusOnBoard();
    this.position = { lat, lon, alt, relative_alt, vx, vy, vz, hdg };
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  addWaypoint(lat: number, lon: number, alt: number) {
    this.waypoints.push({ lat, lon, alt });
  }
}

