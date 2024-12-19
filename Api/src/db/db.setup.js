"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSouce = void 0;
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const entities_1 = require("../entities");
const env_1 = require("../env");
exports.AppDataSouce = new typeorm_1.DataSource({
    type: "mysql",
    database: env_1.Env.dbName,
    host: env_1.Env.host,
    username: env_1.Env.username,
    password: env_1.Env.password,
    port: env_1.Env.dbPort,
    logging: false,
    synchronize: false,
    entities: [entities_1.UserEntity, entities_1.TodoEntity],
    entitySkipConstructor: true,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
});
//# sourceMappingURL=db.setup.js.map