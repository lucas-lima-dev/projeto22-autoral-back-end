import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import app, { init } from "@/app";
import { createUser, generateValidBody } from "../factories/users-factory";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /users/sign-up", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/users/sign-up");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/users/sign-up").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    // it("should respond with status 409 when there is an user with given email", async () => {
    //   const body = generateValidBody();

    //   await createUser(body);

    //   const response = await server.post("/users/sign-up").send(body);

    //   expect(response.status).toBe(httpStatus.CONFLICT);
    //   expect(response.body).toEqual({
    //     message: "There is already an user with given email",
    //   });
    // });

    it("should respond with status 201 and create user when given email is unique", async () => {
      const body = generateValidBody();
      //   const token = generateValidToken();

      const response = await server.post("/users/sign-up").send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      //   expect(response.body).toEqual({
      //     body,
      //     token,
      //   });
    });

    // it('should not return user password on body', async () => {
    //   const body = generateValidBody();

    //   const response = await server.post('/users/sign-up').send(body);

    //   expect(response.body).not.toHaveProperty('password');
    // });

    // it("should save user on db", async () => {
    //   const body = generateValidBody();

    //   const response = await server.post("/users").send(body);

    //   const user = await prisma.users.findUnique({
    //     where: { email: body.email },
    //   });
    //   expect(user).toEqual(
    //     expect.objectContaining({
    //       id: response.body.id,
    //       email: body.email,
    //     })
    //   );
    // });
  });
});

describe("POST /users/sign-in", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/users/sign-in");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/users/sign-in").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

    it("should respond with status 401 when there is no user with given email", async () => {
      const user = await createUser();

      const body = {
  
          email: faker.internet.email(),
          password: user.password
  
      }

      const response = await server.post("/users/sign-in").send(body);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      expect(response.body).toEqual({
        message: "email or password are incorrect",
      });
    });

//   describe("when body is valid", () => {
    // it("should respond with status 200 and create session when given password is correct", async () => {
    //   const user = await createUser();
        
    //   const body = {
    //     email: user.email,
    //     password: user.password,
    //   };

    //   const response = await server.post("/users/sign-in").send(body);

    //   expect(response.status).toBe(httpStatus.OK);
    //   expect(response.body).toEqual({
    //     message: "Session created successfully",
    //   });
    // });

    // it("should return user and token on body", async () => {
    //   const user = await createUser();

    //   const body = {
    //     email: user.email,
    //     password: user.password,
    //   };

    //   const response = await server.post("/users/sign-in").send(body);

    //   expect(response.body).toEqual(
    //     expect.objectContaining({
    //       user: expect.objectContaining({
    //         id: user.id,
    //         email: user.email,
    //       }),
    //       token: expect.any(String),
    //     })
    //   );
    // });

    // it("should save session on db", async () => {
    //   const user = await createUser();

    //   const body = {
    //     email: user.email,
    //     password: user.password,
    //   };

    //   const response = await server.post("/users/sign-in").send(body);

    //   const session = await prisma.sessions.findUnique({
    //     where: { token: response.body.token },
    //   });
    //   expect(session).toEqual(
    //     expect.objectContaining({
    //       id: response.body.id,
    //       token: response.body.token,
    //       user_id: user.id,
    //     })
    //   );
    // });
//   });
});
