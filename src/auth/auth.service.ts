import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; 
    return await bcrypt.hash(password, saltRounds);
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    const user = new User();
    user.nom = createUserDto.nom;
    user.prenom = createUserDto.prenom;
    user.email = createUserDto.email;
    user.password = await this.hashPassword(createUserDto.password);
    user.googleId = createUserDto.googleId || null;

    return await this.userService.create(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(loginUserDto.email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials: User not found');
    }

    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials: Incorrect password');
    }

    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    
    return { access_token };
  }
};
