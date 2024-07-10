import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { RegisteredTime } from './registeredTime.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { RegisterClockInput } from './dto/register-clock.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(RegisteredTime)
    private clockRepository: Repository<RegisteredTime>,
  ) {}

  //queries
  async validateUser(email: string, password: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Credenciais Inválidas');
    }

    if (password != user.password) {
      throw new UnauthorizedException('Credenciais Inválidas');
    }

    return user;
  }

  async getUserByID(id: number, orderBy?: 'ASC' | 'DESC'): Promise<Users> {
    const user = await this.userRepository.findOne({
      relations: ['registeredTimes'],
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário de id ${id} não encontrado`);
    }

    if (orderBy) {
      user.registeredTimes.sort((a, b) => {
        if (orderBy === 'ASC') {
          return (
            new Date(a.time_registered).getTime() -
            new Date(b.time_registered).getTime()
          );
        } else {
          return (
            new Date(b.time_registered).getTime() -
            new Date(a.time_registered).getTime()
          );
        }
      });
    }
    return user;
  }

  async getAllUsersWithTimes(orderBy?: 'ASC' | 'DESC'): Promise<Users[]> {
    const users = await this.userRepository.find({
      relations: ['registeredTimes'],
    });

    if (orderBy) {
      users.forEach((user) => {
        user.registeredTimes.sort((a, b) => {
          if (orderBy === 'ASC') {
            return (
              new Date(a.time_registered).getTime() -
              new Date(b.time_registered).getTime()
            );
          } else {
            return (
              new Date(b.time_registered).getTime() -
              new Date(a.time_registered).getTime()
            );
          }
        });
      });
    }
    return users;
  }

  //mutations
  async createUser(data: CreateUserInput): Promise<Users> {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('Erro ao criar o usuário');
    }

    return userSaved;
  }

  async registerClock(data: RegisterClockInput): Promise<RegisteredTime> {
    const user = await this.userRepository.findOne({
      relations: ['registeredTimes'],
      where: { id: data.user_id },
    });
    if (!user) {
      throw new NotFoundException(
        `Usuário de id ${data.user_id} não encontrado`,
      );
    }
    const registeredTime = this.clockRepository.create({
      user_id: data.user_id,
      time_registered: new Date(),
    });
    const clockSaved = await this.clockRepository.save(registeredTime);

    if (!clockSaved) {
      throw new InternalServerErrorException('Erro ao salvar ponto');
    }

    return this.clockRepository.save(registeredTime);
  }
}
