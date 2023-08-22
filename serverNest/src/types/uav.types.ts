export interface UavConnection {
  url: string;
  uavname: string;
  password: string;
}

export interface UavJwt {
  jwt: string;
}

export interface LongCommand {
  uavname: string;
  message: string;
  param1: number;
  param2: number;
  param3: number;
  param4: number;
  param5: number;
  param6: number;
  param7: number;
}

export interface UavData {
  uavname: string;
  password: string;
  type: string;
  phonenumber: string;
}