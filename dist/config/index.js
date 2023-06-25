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

// src/config/index.ts
var config_exports = {};
__export(config_exports, {
  connectDb: () => connectDb,
  disconnectDB: () => disconnectDB,
  loadEnv: () => loadEnv,
  prisma: () => prisma
});
module.exports = __toCommonJS(config_exports);

// src/config/envs.ts
var import_dotenv = __toESM(require("dotenv"));
var import_dotenv_expand = __toESM(require("dotenv-expand"));
function loadEnv() {
  const path = process.env.NODE_ENV === "test" ? ".env.test" : process.env.NODE_ENV === "development" ? ".env.development" : ".env";
  const currentEnvs = import_dotenv.default.config({ path });
  import_dotenv_expand.default.expand(currentEnvs);
}

// src/config/database.ts
var import_client = require("@prisma/client");
var prisma;
function connectDb() {
  prisma = new import_client.PrismaClient();
}
async function disconnectDB() {
  await prisma?.$disconnect();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  connectDb,
  disconnectDB,
  loadEnv,
  prisma
});
