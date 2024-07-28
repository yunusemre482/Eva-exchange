import { Module } from '@nestjs/common';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';

@Module({
  controllers: [ShareController],
  providers: [ShareService, PrismaService]
})
export class ShareModule { }
