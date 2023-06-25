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

// src/middlewares/authentication-middleware.ts
var authentication_middleware_exports = {};
__export(authentication_middleware_exports, {
  authenticateToken: () => authenticateToken
});
module.exports = __toCommonJS(authentication_middleware_exports);
var import_http_status = __toESM(require("http-status"));
var jwt = __toESM(require("jsonwebtoken"));

// src/errors/unauthorized-error.ts
function unauthorizedError() {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue"
  };
}

// src/config/envs.ts
var import_dotenv = __toESM(require("dotenv"));
var import_dotenv_expand = __toESM(require("dotenv-expand"));

// src/config/database.ts
var import_client = require("@prisma/client");
var prisma;

// src/middlewares/authentication-middleware.ts
async function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return generateUnauthorizedResponse(res);
  const token = authHeader.split(" ")[1];
  if (!token)
    return generateUnauthorizedResponse(res);
  try {
    const { user_id } = jwt.verify(token, process.env.JWT_SECRET);
    const session = await prisma.sessions.findFirst({
      where: {
        token
      }
    });
    if (!session)
      return generateUnauthorizedResponse(res);
    res.locals.user_id = user_id;
    return next();
  } catch (err) {
    return generateUnauthorizedResponse(res);
  }
}
function generateUnauthorizedResponse(res) {
  res.status(import_http_status.default.UNAUTHORIZED).send(unauthorizedError());
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticateToken
});
