import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class RegisterClockInput {
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'o usuário deve ser informado' })
  user_id: number;
}
