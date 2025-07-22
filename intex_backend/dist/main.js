"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('INDEX example')
        .setDescription('The INDEX API description')
        .setVersion('1.0')
        .addBearerAuth()
        .addSecurityRequirements('bearer', ['bearer'])
        .addTag('INDEX')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
    console.log('\n\x1b[42m%s\x1b[0m\x1b[32m %s\x1b[0m\n', ' Swagger ', `http://localhost:${process.env.PORT ?? 3000}/api 🚀`);
}
bootstrap();
//# sourceMappingURL=main.js.map