import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { RegisterClockInput } from './dto/register-clock.input';
import { Users } from './user.entity';
import { RegisteredTime } from './registeredTime.entity';

//as variáveis locais nas querys podem parecer redundantes mas é feito dessa forma para facilitar testes

@Resolver(() => Users)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => Users)
  async validateUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<Users> {
    const user = this.userService.validateUser(email, password);
    return user;
  }

  @Query(() => Users)
  async getUserByID(
    @Args('id') id: number,
    @Args('orderBy', { type: () => String, nullable: true })
    orderBy: 'ASC' | 'DESC',
  ) {
    const user = this.userService.getUserByID(id, orderBy);
    return user;
  }

  @Query(() => [Users, RegisteredTime])
  async getAllUsersWithTimes(
    @Args('orderBy', { type: () => String, nullable: true })
    orderBy: 'ASC' | 'DESC',
  ) {
    return this.userService.getAllUsersWithTimes(orderBy);
  }

  @Mutation(() => Users)
  async createUser(@Args('data') data: CreateUserInput): Promise<Users> {
    const user = await this.userService.createUser(data);
    return user;
  }

  @Mutation(() => RegisteredTime)
  async registerClock(
    @Args('data') data: RegisterClockInput,
  ): Promise<RegisteredTime> {
    const clock = await this.userService.registerClock(data);
    return clock;
  }
}
