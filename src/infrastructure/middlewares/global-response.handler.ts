import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(_, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => ({
                statusCode: _.statusCode,
                success: true,
                data,
                timestamp: new Date().toISOString(),
                errors: null,
                message: 'Request successful',
            })),
        );
    }
}
