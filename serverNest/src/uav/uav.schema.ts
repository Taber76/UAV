import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UavDocument = HydratedDocument<Uav>;

@Schema()
export class Uav {
  @Prop({
    required: true,
    unique: true,
  })
  uavname: string;

  @Prop()
  password: string;

  @Prop()
  type: string;

  @Prop()
  phonenumber: string;
}

export const UavSchema = SchemaFactory.createForClass(Uav);
