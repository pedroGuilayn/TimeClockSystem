import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'o Nome deve ser preenchido' })
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'o Email deve ser preenchido' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'a Senha deve ser preenchida' })
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'o cargo deve ser preenchido' })
  role: string;
}
