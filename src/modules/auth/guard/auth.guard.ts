import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';
import { KEY_CLS } from '@/common/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private cls: ClsService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = authHeader.slice(7, authHeader.length);
    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      this.cls.set(KEY_CLS.USER, decoded);
      return true;
    } catch (err) {
      console.log(err);
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
