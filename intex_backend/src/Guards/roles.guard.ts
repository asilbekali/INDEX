import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { role_key } from 'src/auth/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    let role = this.reflector.getAllAndOverride(role_key, [
      context.getHandler(),
      context.getClass(),
    ]);

    let reqData = context.switchToHttp().getRequest();

    if (!role.length) {
      return true;
    }

    const roleUser = String(reqData['user'].role).toLowerCase();

    if (role.includes(roleUser)) {
      return true;
    } else {
      throw new UnauthorizedException('You have not access');
    }
  }
}
