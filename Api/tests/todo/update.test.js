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
describe("PUT /api/v1/todos/:todoid", () => {
    it("should update a todo successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const todoId = "existing-todo-id";
        const updateData = {
            title: "Updated Todo Title",
            description: "Updated Todo Description",
        };
        const response = yield (0, supertest_1.default)(src_1.app)
            .put(`/api/v1/todos/${todoId}`)
            .send(updateData)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(http_status_1.default.OK);
        expect(response.body.title).toBe(updateData.title);
        expect(response.body.description).toBe(updateData.description);
    }));
    it("should return a 404 if the todo is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const todoId = "non-existing-todo-id";
        const updateData = {
            title: "Updated Todo Title",
        };
        const response = yield (0, supertest_1.default)(src_1.app)
            .put(`/api/v1/todos/${todoId}`)
            .send(updateData)
            .set("Authorization", "Bearer your-valid-jwt-token-here");
        expect(response.status).toBe(http_status_1.default.NOT_FOUND);
        expect(response.body).toHaveProperty("message", "Todo not found");
    }));
});
//# sourceMappingURL=update.test.js.map