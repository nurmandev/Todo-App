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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const http_status_1 = __importDefault(require("http-status"));
const src_1 = require("../../src");
const utils_1 = require("../../src/utils");
const token = (0, utils_1.generateToken)("2fe0bb26-466f-4805-87ac-15d8f19a2e58");
describe("GET /api/v1/todos/:todoid", () => {
    it("should fetch a todo by its ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const todoId = "existing-todo-id";
        const response = yield (0, supertest_1.default)(src_1.app)
            .get(`/api/v1/todos/${todoId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(http_status_1.default.OK);
        expect(response.body).toHaveProperty("id", todoId);
        expect(response.body).toHaveProperty("title");
    }));
    it("should return a 404 if the todo is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const todoId = "non-existing-todo-id";
        const response = yield (0, supertest_1.default)(src_1.app)
            .get(`/api/v1/todos/${todoId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(http_status_1.default.NOT_FOUND);
        expect(response.body).toHaveProperty("message", "Todo not found");
    }));
});
//# sourceMappingURL=getById.test.js.map