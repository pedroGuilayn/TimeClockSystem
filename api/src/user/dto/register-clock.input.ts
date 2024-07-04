import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsDateString, IsString } from 'class-validator';

@InputType()
export class RegisterClockInput {
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'o usuário deve ser informado' })
  user_id: number;
/*
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'o horário deve ser informado' })
  time_registered: string;
  */

}
