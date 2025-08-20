    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
    import { ValidationPipe } from '@nestjs/common';

    async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('API de Usuários')
        .setDescription('Documentação da API de usuários com NestJS + Prisma + Swagger')
        .setVersion('1.0')
        .addTag('users') 
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); 

    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // só permite os campos definidos no DTO
      forbidNonWhitelisted: true, // dá erro se o usuário enviar um campo que não devia.
      transform: true, // transforma os dados recebidos pro tipo certo
    })
  );

    await app.listen(3001);
    }
    bootstrap();