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
const User_1 = require("./../../../entity/User");
let connection;
const email = "middleware@gmail.com";
const password = "test1234";
let userId = '';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    connection = yield createTestConnection_1.createTestConn();
    const user = yield User_1.User.create({
        email,
        password,
        confirmed: true,
    }).save();
    userId = user.id;
}));
afterAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    connection.close();
    done();
}));
describe("me", () => {
    test("cant't get user if not logged in", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        const response = yield client.me();
        expect(response.data.data).toEqual({
            me: null,
        });
    }));
    test("get current user", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        yield client.login(email, password);
        const response = yield client.me();
        expect(response.data.data).toEqual({
            me: {
                id: userId,
                email,
            }
        });
    }));
});
