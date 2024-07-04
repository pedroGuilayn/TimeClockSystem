/*eslint-disable*/
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Users } from './user.entity';

@ObjectType()
@Entity()
export class RegisteredTime {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    user_id: number;

    @Field()
    @Column({ type: 'timestamp' })
    time_registered: Date;

    @ManyToOne(() => Users, user => user.registeredTimes)
    @JoinColumn({ name: 'user_id' })
    user: Users;
}