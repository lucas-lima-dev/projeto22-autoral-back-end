var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/errors/index.ts
var errors_exports = {};
__export(errors_exports, {
  badRequestError: () => badRequestError,
  duplicatedEmailError: () => duplicatedEmailError,
  forBiddenError: () => forBiddenError,
  invalidCredentialsError: () => invalidCredentialsError,
  invalidDataError: () => invalidDataError,
  notFoundError: () => notFoundError,
  unauthorizedError: () => unauthorizedError
});
module.exports = __toCommonJS(errors_exports);

// src/errors/not-found-error.ts
function notFoundError() {
  return {
    name: "NotFoundError",
    message: "No result for this search!"
  };
}

// src/errors/unauthorized-error.ts
function unauthorizedError() {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue"
  };
}

// src/errors/forbidden-error.ts
function forBiddenError() {
  return {
    name: "ForBiddenError",
    message: "Forbidden Error!"
  };
}

// src/errors/bad-request-error.ts
function badRequestError() {
  return {
    name: "BadRequestError",
    message: "Bad Request Error!"
  };
}

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  badRequestError,
  duplicatedEmailError,
  forBiddenError,
  invalidCredentialsError,
  invalidDataError,
  notFoundError,
  unauthorizedError
});
