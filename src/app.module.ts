import { Module } from '@nestjs/common';
import { ReceitasModule } from './receitas/receitas.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
    imports: [ReceitasModule, PrismaModule],
    controllers: [],
    providers: [],  
})
export class AppModule {}