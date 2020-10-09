"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const createMiddleware_1 = require("./../../../utils/createMiddleware");
const User_1 = require("./../../../entity/User");
const middleware_1 = __importDefault(require("./middleware"));
exports.resolvers = {
    Query: {
        me: createMiddleware_1.createMiddleware(middleware_1.default, (_, __, { session }) => User_1.User.findOne({ where: { id: session.userId } })),
    },
};
