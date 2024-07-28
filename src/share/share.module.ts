import { Module } from '@nestjs/common';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ShareController],
  providers: [ShareService, PrismaClient]
})
export class ShareModule { }
