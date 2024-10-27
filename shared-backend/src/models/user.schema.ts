import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop()
  firstName!: string;

  @Prop()
  lastName?: string;

  @Prop()
  email!: string;

  @Prop()
  password!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
