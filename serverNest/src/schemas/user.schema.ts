import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'pixhawk',
  timestamps: true,
})
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

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop({
    default: true,
  })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
