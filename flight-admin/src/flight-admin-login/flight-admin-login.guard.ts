import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class FlightAdminLogGuard implements CanActivate {
  private static blacklistedTokens: Set<string> = new Set();
  constructor(private jwtService: JwtService) {}

  static isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }

  static blacklistToken(token: string): void {
    this.blacklistedTokens.add(token);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    if (FlightAdminLogGuard.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Token is no longer valid.');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret:
          's>myRb69oSecretPnYP4Kv0_!_Q8NgPLH7KEY_0_/3gJQ9H+dUcN7965DlU++p',
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
