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
exports.startServer = void 0;
const createTestConnection_1 = require("./testUtils/createTestConnection");
const User_1 = require("./entity/User");
require("reflect-metadata");
require("graphql-import-node");
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const createSchema_1 = require("./utils/createSchema");
const Email_1 = require("./routes/Email");
const createTypeORMConnection_1 = require("./utils/createTypeORMConnection");
const apollo_server_express_1 = require("apollo-server-express");
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = __importDefault(require("./redis"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rate_limit_redis_1 = __importDefault(require("rate-limit-redis"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
dotenv_1.default.config();
exports.startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const port = process.env.NODE_ENV === "test" ? 3000 : 4000;
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const server = new apollo_server_express_1.ApolloServer({
        schema: createSchema_1.createSchema(),
        context: ({ req }) => ({
            redis: redis_1.default,
            url: req.protocol + "://" + req.get("host"),
            session: req.session,
            req,
        }),
    });
    const cors = {
        credentials: true,
        origin: process.env.FRONTEND_HOST,
    };
    let connection;
    if (process.env.NODE_ENV === "test") {
        connection = yield createTestConnection_1.createTestConn(true);
    }
    else {
        connection = yield createTypeORMConnection_1.createTypeORMConnection();
    }
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CONSUMER_KEY,
        clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
        callbackURL: `http://localhost:${port}/auth/google/callback`,
    }, (_, __, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, emails } = profile;
        const query = yield connection
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .where('user.googleId = :id', { id });
        let email = null;
        if (emails) {
            email = emails[0].value;
            yield query.orWhere("user.email = :email", { email }).getOne();
        }
        let user = yield query.getOne();
        if (!user) {
            user = yield User_1.User.create({
                googleId: id,
                email
            }).save();
        }
        else if (!user.googleId) {
            user.googleId = id;
            yield user.save();
        }
        return done(undefined, { id: user.id });
    })));
    const app = express_1.default();
    app.use(express_rate_limit_1.default({
        store: new rate_limit_redis_1.default({
            client: redis_1.default,
        }),
        windowMs: 15 * 60 * 1000,
        max: 100,
    }));
    app.use(passport_1.default.initialize());
    app.use(express_session_1.default({
        store: new RedisStore({
            client: redis_1.default,
            prefix: constants_1.redisSessionPrefix,
        }),
        name: "qid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    }));
    app.use("/confirm/:id", Email_1.confirmEmail);
    app.get("/auth/google", passport_1.default.authenticate("google", {
        scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    }));
    app.get("/auth/google/callback", passport_1.default.authenticate("google", { session: false }), (req, res) => {
        req.session.userId = req.user.id;
        res.redirect("/");
    });
    server.applyMiddleware({ app, path: "/", cors });
    const expressApp = yield app.listen({ port });
    console.log(`Server is running on http://localhost:${port} in ${process.env.NODE_ENV} mode`);
    return expressApp;
});
