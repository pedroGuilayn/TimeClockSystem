import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { RegisteredTime } from './registeredTime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, RegisteredTime])],
  providers: [UserService, UserResolver],
})
export class UserModule {}
