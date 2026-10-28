import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register({ email, password }: RegisterDto) {
    const existingUser = await this.usersRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException(`Email ${email} is already registered`);
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await this.usersRepository.save(
      this.usersRepository.create({ email, password: hashedPassword }),
    );
    return { id: user.id, email: user.email };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersRepository.findOneBy({ email });
    const passwordMatches = user && (await bcrypt.compare(password, user.password));
    if (!user || !passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const accessToken = await this.jwtService.signAsync({ sub: user.id, email: user.email });
    return { accessToken };
  }
}
