import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { KEY_CLS } from '@/common/constants';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private cls: ClsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = authHeader.slice(7, authHeader.length);
    try {
      const user = await this.authService.validateToken(token);
      this.cls.set(KEY_CLS.USER, user);
      return true;
    } catch (err) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
