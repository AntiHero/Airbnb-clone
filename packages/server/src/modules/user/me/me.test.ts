import { createTestConn } from './../../../testUtils/createTestConnection';
import { TestClient } from './../../../utils/TestClient';
import { User } from "./../../../entity/User";
import { Connection } from "typeorm";

let connection: Connection;

const email = "middleware@gmail.com";
const password = "test1234";
let userId: string = '';

beforeAll(async () => {
  connection = await createTestConn();

  const user = await User.create({
    email,
    password,
    confirmed: true,
  }).save();

  userId = user.id;
});

afterAll(async (done) => {
  connection.close();
  done();
});

describe("me", () => {
  test("cant't get user if not logged in", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    const response = await client.me();

    expect(response.data.data).toEqual({
      me: null,
    });
  });

  test("get current user", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(email, password);
  
    const response = await client.me();
  
    expect(response.data.data).toEqual({
      me: {
        id: userId,
        email,
      }
    });
  });
});
