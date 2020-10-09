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
require("isomorphic-fetch");
const TestClient_1 = require("./../../../utils/TestClient");
const User_1 = require("./../../../entity/User");
const errorMessages_1 = require("./errorMessages");
const email = "test@test.by";
const password = "test1234";
let connection;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    connection = yield createTestConnection_1.createTestConn();
}));
afterAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    connection.close();
    done();
}));
describe("login", () => {
    test("email not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        const response = yield client.login("test@fail.com", "test1234");
        expect(response.data.data).toEqual({
            login: [
                {
                    path: "email",
                    message: errorMessages_1.failedLogin,
                },
            ],
        });
    }));
    test("email not confirmed", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        const response = yield client.register(email, password);
        expect(response.data.data).toEqual({
            register: null,
        });
        const response2 = yield client.login(email, password);
        expect(response2.data.data).toEqual({
            login: [
                {
                    path: "email",
                    message: errorMessages_1.failedConfirm,
                },
            ],
        });
    }));
    test("bad password", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        yield User_1.User.update({ email }, { confirmed: true });
        const response = yield client.login(email, 'test3333');
        expect(response.data.data).toEqual({
            login: [
                {
                    path: "email",
                    message: errorMessages_1.failedLogin,
                },
            ],
        });
    }));
    test("login success", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        const response = yield client.login(email, password);
        expect(response.data.data).toEqual({
            login: null
        });
    }));
});
