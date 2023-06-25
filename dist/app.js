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

// src/app.ts
var app_exports = {};
__export(app_exports, {
  close: () => close,
  default: () => app_default,
  init: () => init
});
module.exports = __toCommonJS(app_exports);
var import_express_async_errors = require("express-async-errors");
var import_express4 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));

// src/routers/index.ts
var import_express3 = require("express");

// src/routers/user-router.ts
var import_express = require("express");

// src/services/users-service/index.ts
var import_bcrypt2 = __toESM(require("bcrypt"));

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
function handleApplicationErrors(err, _req, res, _next) {
  if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
    return res.status(import_http_status2.default.CONFLICT).send({
      message: err.message
    });
  }
  if (err.name === "InvalidCredentialsError") {
    return res.status(import_http_status2.default.UNAUTHORIZED).send({
      message: err.message
    });
  }
  if (err.name === "UnauthorizedError") {
    return res.status(import_http_status2.default.UNAUTHORIZED).send({
      message: err.message
    });
  }
  if (err.name === "NotFoundError") {
    return res.status(import_http_status2.default.NOT_FOUND).send({
      message: err.message
    });
  }
  if (err.name === "BadRequestError") {
    return res.status(import_http_status2.default.BAD_REQUEST).send({
      message: err.message
    });
  }
  if (err.name === "ForBiddenError") {
    return res.status(import_http_status2.default.FORBIDDEN).send({
      message: err.message
    });
  }
  res.status(import_http_status2.default.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error"
  });
}

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

// src/controllers/posts-controller.ts
var import_http_status4 = __toESM(require("http-status"));

// src/repositories/posts-repository/index.ts
async function createPost(data) {
  return prisma.posts.create({
    data
  });
}
async function readAllPosts() {
  return prisma.posts.findMany({
    select: {
      id: true,
      url: true,
      description: true,
      title: true,
      image: true,
      brief: true,
      users: {
        select: {
          user_url: true,
          username: true
        }
      }
    },
    orderBy: {
      created_at: "desc"
    }
  });
}
async function updatePost({ id, description }) {
  return prisma.posts.update({
    where: {
      id
    },
    data: {
      description
    }
  });
}
async function deletePost(id) {
  return prisma.posts.delete({
    where: {
      id
    }
  });
}
async function readPostById(id) {
  return prisma.posts.findUnique({
    where: {
      id
    }
  });
}
var postRepository = {
  createPost,
  readAllPosts,
  updatePost,
  deletePost,
  readPostById
};
var posts_repository_default = postRepository;

// src/services/posts-service/index.ts
var import_url_metadata = __toESM(require("url-metadata"));
async function createPost2({ url, description, user_id }) {
  const meta = await (0, import_url_metadata.default)(url);
  const data = {
    user_id,
    description,
    url,
    title: meta.title,
    image: meta.image,
    brief: meta.description
  };
  const createdPost = await posts_repository_default.createPost(data);
  return createdPost;
}
async function readAllPosts2() {
  const allPosts = await posts_repository_default.readAllPosts();
  return allPosts;
}
async function updatePost2(id, description, user_id) {
  const post = await posts_repository_default.readPostById(id);
  if (!post) {
    throw badRequestError();
  }
  if (post.user_id !== user_id) {
    throw forBiddenError();
  }
  const updatedPost = await posts_repository_default.updatePost({ id, description });
  return updatedPost;
}
async function deletePost2(id, user_id) {
  const post = await posts_repository_default.readPostById(id);
  if (!post) {
    throw badRequestError();
  }
  if (post.user_id !== user_id) {
    throw forBiddenError();
  }
  await posts_repository_default.deletePost(id);
}
var postService = {
  createPost: createPost2,
  readAllPosts: readAllPosts2,
  updatePost: updatePost2,
  deletePost: deletePost2
};
var posts_service_default = postService;

// src/controllers/posts-controller.ts
async function createPost3(req, res, next) {
  const { url, description } = req.body;
  const user_id = res.locals.user_id;
  try {
    const createdPost = await posts_service_default.createPost({ url, description, user_id });
    return res.status(import_http_status4.default.CREATED).send(createdPost);
  } catch (error) {
    next(error);
  }
}
async function readPost(req, res, next) {
  try {
    const allPosts = await posts_service_default.readAllPosts();
    return res.status(import_http_status4.default.OK).send(allPosts);
  } catch (error) {
    next(error);
  }
}
async function updatePost3(req, res, next) {
  const user_id = res.locals.user_id;
  const { id } = req.params;
  const { description } = req.body;
  try {
    const updatedDescription = await posts_service_default.updatePost(Number(id), description, Number(user_id));
    return res.status(import_http_status4.default.OK).send(updatedDescription);
  } catch (error) {
    next(error);
  }
}
async function deletePost3(req, res, next) {
  const user_id = res.locals.user_id;
  const { id } = req.params;
  console.log(id, user_id);
  try {
    await posts_service_default.deletePost(Number(id), Number(user_id));
    return res.status(import_http_status4.default.NO_CONTENT).send("OK");
  } catch (error) {
    next(error);
  }
}
var postController = {
  createPost: createPost3,
  readPost,
  updatePost: updatePost3,
  deletePost: deletePost3
};
var posts_controller_default = postController;

// src/schemas/post-schema.ts
var import_joi3 = __toESM(require("joi"));
var postSchema = import_joi3.default.object({
  url: import_joi3.default.string().uri().required(),
  description: import_joi3.default.string().allow("")
});

// src/routers/home-router.ts
var import_express2 = require("express");
var homeRouter = (0, import_express2.Router)();
homeRouter.get("/timeline", posts_controller_default.readPost);
homeRouter.post("/posts", validateBody(postSchema), posts_controller_default.createPost);
homeRouter.patch("/posts/:id", posts_controller_default.updatePost);
homeRouter.delete("/posts/:id", posts_controller_default.deletePost);
var home_router_default = homeRouter;

// src/middlewares/authentication-middleware.ts
var import_http_status5 = __toESM(require("http-status"));
var jwt2 = __toESM(require("jsonwebtoken"));
async function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return generateUnauthorizedResponse(res);
  const token = authHeader.split(" ")[1];
  if (!token)
    return generateUnauthorizedResponse(res);
  try {
    const { user_id } = jwt2.verify(token, process.env.JWT_SECRET);
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
  res.status(import_http_status5.default.UNAUTHORIZED).send(unauthorizedError());
}

// src/routers/index.ts
var router = (0, import_express3.Router)();
router.get("/health", (_req, res) => res.send("OK!"));
router.use("/users", user_router_default);
router.all("/*", authenticateToken);
router.use("/home", home_router_default);
var routers_default = router;

// src/app.ts
loadEnv();
var app = (0, import_express4.default)();
app.use([(0, import_express4.json)(), (0, import_cors.default)(), routers_default, handleApplicationErrors]);
function init() {
  connectDb();
  return Promise.resolve(app);
}
async function close() {
  await disconnectDB();
}
var app_default = app;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  close,
  init
});
