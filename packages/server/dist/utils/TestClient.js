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
exports.TestClient = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_cookiejar_support_1 = __importDefault(require("axios-cookiejar-support"));
const tough_cookie_1 = __importDefault(require("tough-cookie"));
axios_cookiejar_support_1.default(axios_1.default);
class TestClient {
    constructor(url) {
        this.url = url;
        this.options = {
            jar: new tough_cookie_1.default.CookieJar(),
            withCredentials: true,
        };
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.post(this.url, Object.assign(Object.assign({}, this.options), { query: `
        mutation {
          login(email: "${email}", password: "${password}") {
            path
            message
          }
        }
        ` }));
        });
    }
    me() {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.post(this.url, Object.assign(Object.assign({}, this.options), { query: `
        {
          me {
            id
            email
          }
        }
        ` }));
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.post(this.url, Object.assign(Object.assign({}, this.options), { query: `
        mutation {
          logout
        }
        ` }));
        });
    }
    register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.post(this.url, Object.assign(Object.assign({}, this.options), { query: `
      mutation {
        register(email: "${email}", password: "${password}") {
          path
          message
        }
      }
        ` }));
        });
    }
    restorePasswordChange(newPassword, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.post(this.url, Object.assign(Object.assign({}, this.options), { query: `
      mutation {
        restorePasswordChange(password: "${newPassword}", key: "${key}") {
          path
          message
        }
      }
        ` }));
        });
    }
}
exports.TestClient = TestClient;
