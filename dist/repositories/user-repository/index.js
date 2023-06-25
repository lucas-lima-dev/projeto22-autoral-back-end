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

// src/repositories/user-repository/index.ts
var user_repository_exports = {};
__export(user_repository_exports, {
  default: () => user_repository_default
});
module.exports = __toCommonJS(user_repository_exports);

// src/config/envs.ts
var import_dotenv = __toESM(require("dotenv"));
var import_dotenv_expand = __toESM(require("dotenv-expand"));

// src/config/database.ts
var import_client = require("@prisma/client");
var prisma;

// src/repositories/user-repository/index.ts
async function create(data) {
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
var userRepository = { create, findByEmail, searchUsers };
var user_repository_default = userRepository;
