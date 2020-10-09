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
exports.resolvers = void 0;
const constants_1 = require("./../../../constants");
const errorMessages_1 = require("./errorMessages");
const User_1 = require("./../../../entity/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorResponse = (errorMessage) => [
    {
        path: "email",
        message: errorMessage,
    },
];
exports.resolvers = {
    Mutation: {
        login: (_, { email, password }, { session, redis, req }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                return errorResponse(errorMessages_1.failedLogin);
            }
            if (!user.confirmed) {
                return errorResponse(errorMessages_1.failedConfirm);
            }
            if (user.restorePasswordLocked) {
                return errorResponse(errorMessages_1.accountIsLocked);
            }
            const valid = yield bcryptjs_1.default.compare(password, user.password);
            if (!valid) {
                return errorResponse(errorMessages_1.failedLogin);
            }
            session.userId = user.id;
            if (req.sessionID) {
                yield redis.lpush(`${constants_1.userSessionIdPrefix}${user.id}`, req.sessionID);
            }
            return null;
        }),
    },
};
