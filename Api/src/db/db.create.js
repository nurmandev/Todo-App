"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbCreate = void 0;
const typeorm_extension_1 = require("typeorm-extension");
const env_1 = require("../env");
const entities_1 = require("../entities");
const dbCreate = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_extension_1.createDatabase)({
        ifNotExist: true,
        options: {
            type: "mysql",
            host: env_1.Env.host,
            username: env_1.Env.username,
            password: env_1.Env.password,
            port: env_1.Env.dbPort,
            database: env_1.Env.dbName,
            entities: [entities_1.UserEntity, entities_1.TodoEntity],
        },
    });
});
exports.dbCreate = dbCreate;
//# sourceMappingURL=db.create.js.map