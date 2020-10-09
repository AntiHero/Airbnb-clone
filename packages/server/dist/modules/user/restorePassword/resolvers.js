"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const formatYupErrors_1 = require("../../../utils/formatYupErrors");
const yupSchema_1 = require("../../../yupSchema");
const constants_1 = require("../../../constants");
const errorMessages_1 = require("./errorMessages");
const User_1 = require("../../../entity/User");
const createRestorePasswordEmailLink_1 = require("../../../utils/createRestorePasswordEmailLink");
const restorePasswordLockAccount_1 = require("../../../utils/restorePasswordLockAccount");
const yup = __importStar(require("yup"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const schema = yup.object().shape({
    email: yup.string().min(3).max(255).email(),
    password: yupSchema_1.registerPasswordValidation,
});
exports.resolvers = {
    Mutation: {
        sendForgotPasswordEmail: (_, { email }, { redis }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const userId = (_a = (yield User_1.User.findOne({ where: { email } }))) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return [
                    {
                        path: "email",
                        message: errorMessages_1.userNotFoundError,
                    },
                ];
            }
            yield restorePasswordLockAccount_1.restorePasswordLockAccount(userId, redis);
            yield createRestorePasswordEmailLink_1.createResotrePasswordEmailLink("", userId, redis);
            return true;
        }),
        restorePasswordChange: (_, { password, key }, { redis }) => __awaiter(void 0, void 0, void 0, function* () {
            const redisKey = `${constants_1.restorePasswordPrefix}${key}`;
            const userId = yield redis.get(redisKey);
            if (!userId) {
                return [
                    {
                        path: "key",
                        message: errorMessages_1.expiredKeyError,
                    },
                ];
            }
            try {
                yield schema.validate({ password }, { abortEarly: false });
            }
            catch (err) {
                return formatYupErrors_1.formatYupErrors(err);
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const updatePromise = User_1.User.update({ id: userId }, { restorePasswordLocked: false, password: hashedPassword });
            const deletePromise = redis.del(redisKey);
            yield Promise.all([updatePromise, deletePromise]);
            return null;
        }),
    },
};
