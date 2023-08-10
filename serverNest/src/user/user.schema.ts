import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;


@Schema()
export class User {
  @Prop({
    required: true,
    trim: true,
  })
  fullname: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop({
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    default: 'pilot'
  })
  role: string;

  @Prop({
    default: true,
  })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
