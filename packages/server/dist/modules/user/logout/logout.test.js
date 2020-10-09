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
const email = "logout@gmail.com";
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
describe("logout", () => {
    test("multiple sessions logout", () => __awaiter(void 0, void 0, void 0, function* () {
        const client1 = new TestClient_1.TestClient(process.env.TEST_HOST);
        const client2 = new TestClient_1.TestClient(process.env.TEST_HOST);
        yield client1.login(email, password);
        yield client2.login(email, password);
        expect((yield client1.me()).data.data).toEqual((yield client2.me()).data.data);
        yield client1.logout();
        expect((yield client1.me()).data.data).toEqual((yield client2.me()).data.data);
    }));
    test("single session logout", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        yield client.login(email, password);
        const response1 = yield client.me();
        expect(response1.data.data).toEqual({
            me: {
                id: userId,
                email,
            }
        });
        const response2 = yield client.logout();
        expect(response2.data.data.logout).toBeTruthy();
        const response3 = yield client.me();
        expect(response3.data.data).toEqual({
            me: null
        });
    }));
});
