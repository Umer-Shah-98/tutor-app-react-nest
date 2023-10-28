// auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true; // No roles defined, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming you set the user object during authentication

    if (!user || !user.role) {
      return false; // User not authenticated or missing role
    }

    return roles.includes(user.role); // Check if user's role is allowed
  }
}
