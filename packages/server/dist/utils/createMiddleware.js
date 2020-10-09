"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMiddleware = void 0;
exports.createMiddleware = (middlewareFunc, resolverFunc) => (parent, args, context, info) => middlewareFunc(resolverFunc, parent, args, context, info);
