import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  public uavUrl: string;
  public jwtUav: string;
}
