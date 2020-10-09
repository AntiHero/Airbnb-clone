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
const createTestConnection_1 = require("./../../../testUtils/createTestConnection");
const TestClient_1 = require("./../../../utils/TestClient");
require("isomorphic-fetch");
const errorMessages_1 = require("./errorMessages");
const User_1 = require("./../../../entity/User");
const common_1 = require("@abb/common");
const email = "register@test.by";
const password = "test1234";
let connection;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    connection = yield createTestConnection_1.createTestConn();
}));
afterAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    connection.close();
    done();
}));
describe("Register user", () => {
    it("successfull registration", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        const response = yield client.register(email, password);
        expect(response.data.data).toEqual({ register: null });
        const users = yield User_1.User.find({ where: { email } });
        expect(users.length).toBe(1);
        const user = users[0];
        expect(user.email).toEqual(email);
        expect(user.password).not.toEqual(password);
    }));
    it("duplicated email", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        const response2 = yield client.register(email, password);
        expect(response2.data.data.register).toHaveLength(1);
        expect(response2.data.data.register).toEqual([
            {
                message: errorMessages_1.duplicatedEmail,
                path: "email",
            },
        ]);
    }));
    it("short email", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        const response = yield client.register("b", password);
        expect(response.data.data.register).toEqual([
            { message: common_1.emailTooShort, path: "email" },
            { message: common_1.invalidEmal, path: "email" },
        ]);
    }));
    it("short pass", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        const response2 = yield client.register(email, "b");
        expect(response2.data.data.register).toEqual([
            {
                message: common_1.passwordTooShort,
                path: "password",
            },
        ]);
    }));
});
