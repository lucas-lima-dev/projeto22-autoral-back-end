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

// src/services/users-service/helpers.ts
var helpers_exports = {};
__export(helpers_exports, {
  createSession: () => createSession,
  getUserOrFail: () => getUserOrFail,
  validatePasswordOrFail: () => validatePasswordOrFail,
  validateUniqueEmailOrFail: () => validateUniqueEmailOrFail
});
module.exports = __toCommonJS(helpers_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSession,
  getUserOrFail,
  validatePasswordOrFail,
  validateUniqueEmailOrFail
});
