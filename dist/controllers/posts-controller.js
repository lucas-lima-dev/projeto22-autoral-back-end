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

// src/controllers/posts-controller.ts
var posts_controller_exports = {};
__export(posts_controller_exports, {
  default: () => posts_controller_default
});
module.exports = __toCommonJS(posts_controller_exports);
var import_http_status = __toESM(require("http-status"));

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

// src/config/envs.ts
var import_dotenv = __toESM(require("dotenv"));
var import_dotenv_expand = __toESM(require("dotenv-expand"));

// src/config/database.ts
var import_client = require("@prisma/client");
var prisma;

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
    return res.status(import_http_status.default.CREATED).send(createdPost);
  } catch (error) {
    next(error);
  }
}
async function readPost(req, res, next) {
  try {
    const allPosts = await posts_service_default.readAllPosts();
    return res.status(import_http_status.default.OK).send(allPosts);
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
    return res.status(import_http_status.default.OK).send(updatedDescription);
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
    return res.status(import_http_status.default.NO_CONTENT).send("OK");
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
