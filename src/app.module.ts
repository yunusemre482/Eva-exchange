import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { TradeModule } from './trade/trade.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { GlobalResponseInterceptor } from './infrastructure/middlewares/global-response.handler';
import { GlobalExceptionFilter } from './infrastructure/middlewares/global-error.handler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShareModule } from './share/share.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, AuthModule, PortfolioModule, TradeModule, ShareModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    JwtModule



  ],
  controllers: [AppController],
  providers: [AppService,
    ConfigService,

    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ],
})
export class AppModule { }
