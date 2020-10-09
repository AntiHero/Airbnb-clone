"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const createSchema_1 = require("../utils/createSchema");
const from_schema_1 = require("@gql2ts/from-schema");
const fs_1 = __importDefault(require("fs"));
fs_1.default.writeFile(path_1.join(__dirname, "../@types/schema.d.ts"), from_schema_1.generateNamespace("GQL", createSchema_1.createSchema()), (e) => {
    if (e) {
        console.log(e, "schema creation fail");
    }
    else {
        console.log("schema created");
    }
});
