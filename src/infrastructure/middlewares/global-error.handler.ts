import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
    HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';

import { ConfigService } from '@nestjs/config';
import { NodeEnvironment } from '../enums/environment.enum';


@Catch(HttpException, Error)
export class GlobalExceptionFilter
    extends BaseExceptionFilter
    implements ExceptionFilter {

    private readonly logger = new Logger(GlobalExceptionFilter.name);


    constructor(
        private readonly configService: ConfigService,
        private readonly _httpAdapterHost: HttpAdapterHost
    ) {
        super(_httpAdapterHost.httpAdapter);
    }

    catch(exception: HttpException | Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest() as Request & { user: { userId: string } };

        const status = exception instanceof HttpException ? exception.getStatus() : 500;
        const message = exception.message || 'Internal server error';


        if (exception instanceof HttpException && exception.getResponse()) {
            const errors = exception.getResponse() as any;

            return response.status(status).json({
                statusCode: status,
                message: exception.name,
                timestamp: new Date().toISOString(),
                success: false,
                errors: errors.message,
            });
        }


        if (exception instanceof HttpException) {
            return response.status(status).json({
                statusCode: status,
                message: message,
                timestamp: new Date().toISOString(),
                success: false,
            });
        }


        super.handleUnknownError(exception, host, this._httpAdapterHost.httpAdapter);

    }

}