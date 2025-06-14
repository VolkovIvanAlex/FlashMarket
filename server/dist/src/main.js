"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('BACKEND_PORT', 8000);
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    await app.listen(port);
    console.log(`Application started on port ${port}!`);
}
bootstrap();
//# sourceMappingURL=main.js.map