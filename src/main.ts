import { ValidationPipe } from '@nestjs/common'; 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configurações da documentação Swagger
    const config = new DocumentBuilder()
        .setTitle('API de Usuários')
        .setDescription('Documentação da API de usuários com NestJS + Prisma + Swagger')
        .setVersion('1.0')
        .addBearerAuth({
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            name: "authorization",
            in: "header"
        })



        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // 


    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // remova propriedades não decorada no DTO
            forbidNonWhitelisted: true, // rotorn ero se enviar propriedade

        })
    )

    await app.listen(3002);
// const port = process.env.PORT || 3000;
// await app.listen(port);
// console.log(`estar rodando em: http://localhost:${port}`);

}
bootstrap();