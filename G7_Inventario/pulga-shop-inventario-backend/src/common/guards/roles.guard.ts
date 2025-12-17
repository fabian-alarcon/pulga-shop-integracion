import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Inyectado por el JwtAuthGuard

    if (!user || !user.roles.includes('vendedor')) {
      throw new ForbiddenException('Acceso denegado: Se requiere rol de vendedor');
    }
    return true;
  }
}