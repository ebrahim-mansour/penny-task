import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists');
  }

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    await this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersRepository.findOne({ email });
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword)
        throw new UnauthorizedException('Credentials are not valid.');
      return user;
    } catch (_) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }
}
