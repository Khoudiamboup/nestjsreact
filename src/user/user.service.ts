import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  findOneByUsername(username: string) {
    throw new Error('Method not implemented.');
  }
  findOneById(_sub: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findOrCreate(createUserDto: CreateUserDto): Promise<User> {
    let user = await this.userRepository.findOne({ where: { email: createUserDto.email } });

    if (!user) {
      user = await this.create(createUserDto);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
