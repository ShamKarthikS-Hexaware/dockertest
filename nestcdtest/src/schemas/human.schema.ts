import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type humanDocument = human & Document;

@Schema()
export class human {
   
   @Prop()
   name: string; 
   
   @Prop()
   age: string; 
   
   @Prop()
   planet: string; 
   
}

export const humanSchema = SchemaFactory.createForClass(human);