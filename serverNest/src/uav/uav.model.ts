import fetch from 'node-fetch';
import { LongCommand } from 'src/types/uav.types';


export class UAV {
  private status: string = 'Disarmed';
  private position: { lat: number, lon: number, alt: number } = { lat: 0, lon: 0, alt: 0 };
  private speed: number = 0;
  private waypoints: { lat: number, lon: number, alt: number }[] = [];

  constructor(
    private readonly uavName: string,
    private readonly url: string,
    // private readonly jwt: string
  ) { }

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
    const response = await fetch(`${this.url}/pix?msg_type=SYS_STATUS&max_time=5`);
    const jsonresponse = await response.json();
    // actualizar atributos de posición, velocidad, etc.
    return;
  }


  getStatus(): string {
    return this.status;
  }

  getPosition(): { lat: number, lon: number, alt: number } {
    this.getStatusOnBoard()
    return this.position;
  }

  getSpeed(): number {
    return this.speed;
  }

  getWaypoints(): { lat: number, lon: number, alt: number }[] {
    return this.waypoints;
  }

  setStatus(status: string) {
    this.status = status;
  }

  setPosition(lat: number, lon: number, alt: number) {
    this.getStatusOnBoard();
    this.position = { lat, lon, alt };
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  addWaypoint(lat: number, lon: number, alt: number) {
    this.waypoints.push({ lat, lon, alt });
  }
}

