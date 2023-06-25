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

// src/repositories/posts-repository/index.ts
var posts_repository_exports = {};
__export(posts_repository_exports, {
  default: () => posts_repository_default
});
module.exports = __toCommonJS(posts_repository_exports);

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
