import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: RegisterDto) {
    if (!createUserDto.email || !createUserDto.password) {
      throw new HttpException('Email and password are required', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.authService.hashPassword(createUserDto.password);
    const user = await this.authService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    const token = this.authService.generateToken(user);

    return {
      token,
      user: {
        firname: user.firstName,
        lastname: user.lastName,
        id: user.id,
        email: user.email,
      },
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    const token = this.authService.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
