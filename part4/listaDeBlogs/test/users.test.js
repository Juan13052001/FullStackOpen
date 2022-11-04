const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const { server } = require("../index");

beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("Juan130501.", 10);

    const user = new User({
        username: "root",
        passwordHash,
    });

    await user.save();
});
describe("when there is initially one user in db", () => {
    test("creation succeeds with a fresh username", async () => {
        const userAtStart = await helper.usersInDb();

        const newUser = {
            username: "Juan130501",
            name: "Juan Herrera",
            password: "Juan130501.",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();

        expect(usersAtEnd).toHaveLength(userAtStart.length + 1);

        const usernames = userAtEnd.map((user) => user.name);

        expect(usernames).toContain(newUser.username);
    });

    test("creation fails with proper statuscode and message if username already taken", async () => {
        const userAtStart = await helper.usersInDb();

        const newUser = {
            username: "root",
            name: "Superuser",
            password: "salainen",
        };

        const result = await (
            await api.post("/api/users")
        )
            .setEncoding(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        expect(result.body.error).toContain(`username to be unique`);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(userAtStart.length);
    });
});

afterAll(() => {
    mongoose.connection.close();
    server.close();
});
