import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enhanced CORS configuration for Vercel deployment
  app.enableCors({
    origin: true, // Allows all Vercel preview URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Added OPTIONS for pre-flight
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization', // Explicitly allow headers
  });

  // This is required for NestJS to work with Vercel's port expectations
  await app.listen(process.env.PORT || 3000); 
}
bootstrap();