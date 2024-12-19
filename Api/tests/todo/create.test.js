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
describe("POST /api/v1/todos/create", () => {
    it("should create a todo successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const todoData = {
            userId: "string",
            title: "Test Todo",
            description: "Test Description",
            status: true,
            dueDate: new Date().toISOString(),
        };
        const response = yield (0, supertest_1.default)(src_1.app)
            .post("/api/v1/todos/create")
            .send(todoData)
            .set("Authorization", `Bearer ${token}`);
        console.log(response.body);
        expect(response.status).toBe(http_status_1.default.CREATED);
        expect(response.body).toHaveProperty("userId");
        expect(response.body.title).toBe(todoData.title);
        expect(response.body.description).toBe(todoData.description);
    }));
    it("should return an error if required fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(src_1.app)
            .post("/api/v1/todos/create")
            .send({})
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        expect(response.body).toHaveProperty("message", "Required fields missing.");
    }));
});
//# sourceMappingURL=create.test.js.map