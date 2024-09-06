import assert from "node:assert";
import { after, beforeEach, describe, test } from "node:test";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app.js";

import User from "../models/user.js";

import * as helpers from "./test_helper.js";

const api = supertest(app);

const initialUser = {
  username: "root",
  password: "password",
};

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash(initialUser.password, 10);
  const user = new User({ username: initialUser.username, passwordHash });
  await user.save();
});

after(async () => await mongoose.connection.close());

describe("when there is initially one user in db", () => {
  test("users are returned as JSON", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  describe("adding a new user", async () => {
    test("succeeds when username isn't taken", async () => {
      const user = {
        username: "user",
        password: "pass",
      };

      await api
        .post("/api/users")
        .send(user)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersInDb = await helpers.usersInDb();

      assert.strictEqual(usersInDb.length, 2);
      assert(usersInDb.some((u) => u.username === user.username));
    });

    test("fails when username is too short", async () => {
      const user = {
        username: "us",
        password: "pass",
      };

      await api.post("/api/users").send(user).expect(400);

      const usersInDb = await helpers.usersInDb();
      assert.strictEqual(usersInDb.length, 1);
    });

    test("fails when username is not unique", async () => {
      await api.post("/api/users").send(initialUser).expect(400);

      const usersInDb = await helpers.usersInDb();
      assert.strictEqual(usersInDb.length, 1);
    });

    test("fails when password is too short", async () => {
      const user = {
        username: "user",
        password: "pa",
      };

      await api.post("/api/users").send(user).expect(400);

      const usersInDb = await helpers.usersInDb();
      assert.strictEqual(usersInDb.length, 1);
    });
  });
});
