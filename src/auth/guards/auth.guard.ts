import {
    CanActivate, ExecutionContext, Injectable, UnauthorizedException,
    ForbiddenException,
    BadRequestException,
    Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { ACCESS_TOKEN_HEADER, AUTHORIZATION_HEADER } from '../constants/header.constants';



@Injectable()
export class CustomAuthGuard extends AuthGuard("jwt") {
    readonly logger = new Logger(CustomAuthGuard.name);
    constructor(
        private reflector: Reflector,
        private authService: AuthService,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        try {
            const isJwtVerified = await super.canActivate(context);

            if (!isJwtVerified) throw new UnauthorizedException();

            const req = context.switchToHttp().getRequest();
            const token = this.extractTokenFromRequest(req);


            console.log('token', token);


            const user = await this.authService.validateToken(token);

            req.user = user;
            return true;

        } catch (error: any) {
            throw new ForbiddenException(error.message);
        }
    }



    private extractTokenFromRequest(req: any): string {
        const token =
            req.headers[ACCESS_TOKEN_HEADER] ||
            req.headers[AUTHORIZATION_HEADER];

        if (!token) {
            throw new UnauthorizedException("Token not found");
        }

        const [type, extractedToken] = req.headers.authorization?.split(' ') ?? [];


        if (!extractedToken || type !== 'Bearer') {
            throw new UnauthorizedException("Invalid access token");
        }

        return extractedToken;
    }

}