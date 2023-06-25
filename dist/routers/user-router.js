var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routers/user-router.ts
var user_router_exports = {};
__export(user_router_exports, {
  default: () => user_router_default
});
module.exports = __toCommonJS(user_router_exports);
var import_express = require("express");

// src/services/users-service/index.ts
var import_bcrypt2 = __toESM(require("bcrypt"));

// src/errors/invalid-data-error.ts
function invalidDataError(details) {
  return {
    name: "InvalidDataError",
    message: "Invalid data",
    details
  };
}

// src/errors/duplicated-email-error.ts
function duplicatedEmailError() {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email"
  };
}

// src/errors/invalid-credentials-error.ts
function invalidCredentialsError() {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect"
  };
}

// src/config/envs.ts
var import_dotenv = __toESM(require("dotenv"));
var import_dotenv_expand = __toESM(require("dotenv-expand"));

// src/config/database.ts
var import_client = require("@prisma/client");
var prisma;

// src/repositories/session-repository/index.ts
async function create(data) {
  return prisma.sessions.create({
    data
  });
}
var sessionRepository = {
  create
};
var session_repository_default = sessionRepository;

// src/repositories/user-repository/index.ts
async function create2(data) {
  return prisma.users.create({
    data
  });
}
async function findByEmail(email) {
  return prisma.users.findUnique({
    where: {
      email
    }
  });
}
async function searchUsers({ username }) {
  return prisma.users.findMany({
    where: {
      username: {
        contains: username
      }
    },
    select: {
      id: true,
      username: true,
      user_url: true
    }
  });
}
var userRepository = { create: create2, findByEmail, searchUsers };
var user_repository_default = userRepository;

// src/services/users-service/helpers.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
async function validateUniqueEmailOrFail(email) {
  const userWithSameEmail = await user_repository_default.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}
async function validatePasswordOrFail(password, userPassword) {
  const isPasswordValid = await import_bcrypt.default.compare(password, userPassword);
  if (!isPasswordValid)
    throw invalidCredentialsError();
}
async function getUserOrFail(email) {
  const user = await user_repository_default.findByEmail(email);
  if (!user)
    throw invalidCredentialsError();
  return user;
}
async function createSession(user_id) {
  const token = import_jsonwebtoken.default.sign({ user_id }, process.env.JWT_SECRET);
  await session_repository_default.create({
    token,
    user_id
  });
  return token;
}

// src/utils/prisma-utils.ts
function exclude(entity, ...keys) {
  const newEntity = JSON.parse(JSON.stringify(entity));
  for (const key of keys) {
    delete newEntity[key];
  }
  return newEntity;
}

// src/services/users-service/index.ts
async function createUser({ username, email, password, user_url }) {
  await validateUniqueEmailOrFail(email);
  const hashedPassword = await import_bcrypt2.default.hash(password, 12);
  const data = {
    username,
    email,
    password: hashedPassword,
    user_url
  };
  const newUser = await user_repository_default.create(data);
  return newUser;
}
async function signIn({ email, password }) {
  const user = await getUserOrFail(email);
  await validatePasswordOrFail(password, user.password);
  const token = await createSession(user.id);
  return {
    user: exclude(user, "password"),
    token
  };
}
async function searchUsers2({ username }) {
  const users = await user_repository_default.searchUsers({ username });
  return users;
}
var userService = {
  createUser,
  signIn,
  searchUsers: searchUsers2
};
var users_service_default = userService;

// src/controllers/users-controller.ts
var import_http_status = __toESM(require("http-status"));
async function createUser2(req, res, next) {
  const { username, email, password, user_url } = req.body;
  try {
    const createdUser = await users_service_default.createUser({ username, email, password, user_url });
    return res.status(import_http_status.default.CREATED).send(createdUser);
  } catch (error) {
    next(error);
  }
}
async function singIn(req, res, next) {
  const { email, password } = req.body;
  try {
    const result = await users_service_default.signIn({ email, password });
    return res.status(import_http_status.default.OK).send(result);
  } catch (error) {
    next(error);
  }
}
async function searchUsers3(req, res, next) {
  const { username } = req.body;
  try {
    const users = await users_service_default.searchUsers({ username });
    return res.status(import_http_status.default.OK).send(users);
  } catch (error) {
    next(error);
  }
}
var userController = {
  createUser: createUser2,
  singIn,
  searchUsers: searchUsers3
};
var users_controller_default = userController;

// src/middlewares/error-handling-middleware.ts
var import_http_status2 = __toESM(require("http-status"));

// src/middlewares/validation-middleware.ts
var import_http_status3 = __toESM(require("http-status"));
function validateBody(schema) {
  return validate(schema, "body");
}
function validate(schema, type) {
  return (req, res, next) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false
    });
    if (!error) {
      next();
    } else {
      res.status(import_http_status3.default.BAD_REQUEST).send(invalidDataError(error.details.map((d) => d.message)));
    }
  };
}

// src/schemas/sign-up-schema.ts
var import_joi = __toESM(require("joi"));
var signUpSchema = import_joi.default.object({
  username: import_joi.default.string().required(),
  email: import_joi.default.string().email().required(),
  password: import_joi.default.string().required(),
  user_url: import_joi.default.string().uri().required()
});

// src/schemas/sign-in-schema.ts
var import_joi2 = __toESM(require("joi"));
var signInSchema = import_joi2.default.object({
  email: import_joi2.default.string().email().required(),
  password: import_joi2.default.string().required()
});

// src/routers/user-router.ts
var userRouter = (0, import_express.Router)();
userRouter.post("/sign-up", validateBody(signUpSchema), users_controller_default.createUser);
userRouter.post("/sign-in", validateBody(signInSchema), users_controller_default.singIn);
userRouter.post("/search-users", users_controller_default.searchUsers);
var user_router_default = userRouter;
