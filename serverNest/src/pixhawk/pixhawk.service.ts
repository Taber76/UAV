import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import fetch from 'node-fetch';

@Injectable()
export class PixhawkService {
  private readonly conection: string;

  constructor(private readonly configService: ConfigService) {
    this.conection = configService.get<string>('PIXHAWKURL');
  }

  async longCommand(data: any) {
    const response = await fetch(`${this.conection}/pix`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const jsonresponse = await response.json();
    return jsonresponse;
  }
}
