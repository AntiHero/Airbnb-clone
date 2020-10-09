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
const createTestConnection_1 = require("./../testUtils/createTestConnection");
const ioredis_1 = __importDefault(require("ioredis"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const User_1 = require("./../entity/User");
const createConfirmEmailLink_1 = require("./createConfirmEmailLink");
let userId = "";
const redis = new ioredis_1.default();
let connection;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    connection = yield createTestConnection_1.createTestConn();
    const user = yield User_1.User.create({
        email: "cowboy@gmail.com",
        password: "test1234",
    }).save();
    userId = user.id;
}));
afterAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    connection.close();
    done();
}));
test("Make sure user in confirmed and key in redis is cleared", () => __awaiter(void 0, void 0, void 0, function* () {
    const url = yield createConfirmEmailLink_1.createConfirmEmailLink(process.env.TEST_HOST, userId, redis);
    const response = yield node_fetch_1.default(url);
    const text = yield response.text();
    expect(text).toEqual(JSON.stringify({ message: "email confirmed" }));
    const user = yield User_1.User.findOne({ where: { id: userId } });
    expect(user.confirmed).toBeTruthy();
    const chunks = url.split("/");
    const key = chunks[chunks.length - 1];
    expect(yield redis.get(key)).toBeNull();
}));
