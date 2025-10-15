/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/filters/timeOut.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());

  const options = new DocumentBuilder()
  .setTitle('SuperFlight API')
  .setDescription('Schedule Flights App')
  .setVersion('2.0.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, options);


  SwaggerModule.setup('/api/docs', app, document,{
    swaggerOptions:{
      filter: true,
    }
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
