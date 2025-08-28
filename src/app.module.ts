import { Module } from '@nestjs/common';
import { ReceitasModule } from './receitas/receitas.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
    imports: [ReceitasModule, PrismaModule, UserModule, AuthModule],
    controllers: [],
    providers: [],  
})
export class AppModule {}