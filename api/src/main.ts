import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

function setupSwagger (app: NestExpressApplication) {
	const { BASE_URL, NODE_ENV } = process.env;

	const config = new DocumentBuilder()
		.setTitle('Ellipsis TR')
		.setDescription('Api for Ellipsis Annotation Interface')
		.setVersion('v0')
		.addBearerAuth();

	if (BASE_URL) config.addServer(BASE_URL, NODE_ENV.charAt(0).toUpperCase() + NODE_ENV.slice(1) + ' Server');

	const document = SwaggerModule.createDocument(app, config.build());

	SwaggerModule.setup('api', app, document);
}

async function bootstrap () {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
	});

	app.set('trust proxy', true);
	app.enableCors({ origin: true, credentials: true });

	setupSwagger(app);
	Logger.log(`Starting application v0...`, 'Main');
	if (process.env.AI_IS_PRIMARY === 'true') {
		//await publishedAtMigration();
		//await token();
	}
	await app.listen(process.env.HTTP_PORT ?? 3012);
}

bootstrap();
