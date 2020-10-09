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
exports.resolvers = void 0;
const sendEmail_1 = require("./../../../utils/sendEmail");
const createConfirmEmailLink_1 = require("./../../../utils/createConfirmEmailLink");
const errorMessages_1 = require("./errorMessages");
const formatYupErrors_1 = require("./../../../utils/formatYupErrors");
const User_1 = require("./../../../entity/User");
const common_1 = require("@abb/common");
exports.resolvers = {
    Mutation: {
        register: (_, args, { redis, url }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield common_1.validRegisterSchema.validate(args, { abortEarly: false });
            }
            catch (err) {
                return formatYupErrors_1.formatYupErrors(err);
            }
            const { email, password } = args;
            const userAlreadyExists = yield User_1.User.findOne({
                where: { email },
                select: ["id"],
            });
            if (userAlreadyExists) {
                return [
                    {
                        path: "email",
                        message: errorMessages_1.duplicatedEmail,
                    },
                ];
            }
            const user = User_1.User.create({
                email,
                password,
            });
            yield user.save();
            if (process.env.NODE_ENV !== 'test') {
                yield sendEmail_1.sendEmail(email, yield createConfirmEmailLink_1.createConfirmEmailLink(url, user.id, redis));
            }
            return null;
        }),
    },
};
