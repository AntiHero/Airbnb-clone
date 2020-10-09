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
const createTestConnection_1 = require("./../../../testUtils/createTestConnection");
const restorePasswordLockAccount_1 = require("../../../utils/restorePasswordLockAccount");
const errorMessages_1 = require("./errorMessages");
const errorMessages_2 = require("./../login/errorMessages");
const ioredis_1 = __importDefault(require("ioredis"));
const createRestorePasswordEmailLink_1 = require("../../../utils/createRestorePasswordEmailLink");
const TestClient_1 = require("../../../utils/TestClient");
const User_1 = require("../../../entity/User");
let connection;
const redis = new ioredis_1.default();
const email = "restore@gmail.com";
const password = "test1234";
const newPassword = "newPassword";
let userId = "";
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
describe("forgot password", () => {
    test("send email and restore password", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new TestClient_1.TestClient(process.env.TEST_HOST);
        yield restorePasswordLockAccount_1.restorePasswordLockAccount(userId, redis);
        const url = yield createRestorePasswordEmailLink_1.createResotrePasswordEmailLink("", userId, redis);
        const chunks = url.split("/");
        const key = chunks[chunks.length - 1];
        expect((yield client.login(email, password)).data.data).toEqual({
            login: [
                {
                    path: "email",
                    message: errorMessages_2.accountIsLocked,
                },
            ],
        });
        expect((yield client.restorePasswordChange("a", key)).data.data).toEqual({
            restorePasswordChange: [
                {
                    path: "password",
                    message: errorMessages_1.passwordTooShortError,
                },
            ],
        });
        const response = yield client.restorePasswordChange(newPassword, key);
        expect(response.data.data).toEqual({
            restorePasswordChange: null,
        });
        expect((yield client.restorePasswordChange("newPassword2", key)).data.data).toEqual({
            restorePasswordChange: [
                {
                    path: "key",
                    message: errorMessages_1.expiredKeyError,
                },
            ],
        });
        expect((yield client.login(email, newPassword)).data.data).toEqual({
            login: null,
        });
    }));
});
