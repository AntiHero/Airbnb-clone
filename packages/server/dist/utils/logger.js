"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logger = (...args) => {
    args.forEach(arg => console.log({ arg }));
};
