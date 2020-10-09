"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const graphql_tools_1 = require("graphql-tools");
const glob_1 = __importDefault(require("glob"));
exports.createSchema = () => {
    const pathToModules = path_1.join(__dirname, "../modules");
    console.log(pathToModules, 'path');
    const graphqlTypes = glob_1.default
        .sync(`${pathToModules}/**/*.graphql`)
        .map(x => fs_1.default.readFileSync(x, { encoding: "utf8" }));
    const resolvers = glob_1.default
        .sync(`${pathToModules}/**/resolvers.?s`)
        .map(resolver => require(resolver).resolvers);
    return graphql_tools_1.makeExecutableSchema({
        typeDefs: graphql_tools_1.mergeTypeDefs(graphqlTypes),
        resolvers: graphql_tools_1.mergeResolvers(resolvers),
    });
};
