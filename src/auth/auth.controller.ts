import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { SignInDTO } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  async signUp(@Body() { name, email, password }: CreateUserDTO) {
    if (await this.usersService.findByEmail(email)) {
      throw new BadRequestException({
        message: 'User already exists',
        type: 'error.userAlreadyExists',
      });
    }

    const { id } = await this.usersService.create({ name, email, password });

    return {
      user: { id, name, email },
      token: sign({ id, email }, process.env.JWT_KEY, { expiresIn: '1h' }),
    };
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() { email, password }: SignInDTO) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException({
        message: 'User not found',
        type: 'error.userNotFound',
      });
    } else if (!compareSync(password, user.password)) {
      throw new BadRequestException({
        message: 'Invalid password',
        type: 'error.invalidPassword',
      });
    }

    const { id, name } = user;

    return {
      user: { id, name, email },
      token: sign({ id, email }, process.env.JWT_KEY, { expiresIn: '1h' }),
    };
  }
}
