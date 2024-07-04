import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RegisteredTime } from './registeredTime.entity';

@ObjectType()
@Entity()
export class Users {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  role: string;

  @Field(() => [RegisteredTime], { nullable: true })
  @OneToMany(() => RegisteredTime, (registeredTime) => registeredTime.user)
  registeredTimes: RegisteredTime[];
}
