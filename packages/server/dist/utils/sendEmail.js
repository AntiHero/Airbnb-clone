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
exports.sendEmail = void 0;
const sparkpost_1 = __importDefault(require("sparkpost"));
const client = new sparkpost_1.default(process.env.SPARKPOST_API_KEY);
exports.sendEmail = (recipient, url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.transmissions.send({
        options: {
            sandbox: true,
        },
        content: {
            from: "testing@sparkpostbox.com",
            subject: "Confirm Email!",
            html: `<html><body><a href="${url}" target="_blank">Confirm your email</a></body></html>`,
        },
        recipients: [{ address: recipient }],
    });
    console.log(response);
});
