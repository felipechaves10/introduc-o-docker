import { Module } from '@nestjs/common';
import { ReceitaService } from './receitas.service';
import { ReceitaController } from './receitas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ReceitaService],
  controllers: [ReceitaController]
})
export class ReceitasModule {}