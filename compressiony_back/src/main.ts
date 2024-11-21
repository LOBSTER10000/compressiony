import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  //swagger 설정
  
  const config = new DocumentBuilder()
  .setTitle('FileConverter API')
  .setDescription('API description')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin : 'http://localhost:3000',
    methods : 'GET,POST,PUT,PATCH,DELETE',
    credentials : true,
  });

  
  await app.listen(3400);
}
bootstrap();
