import { Router } from "express";
import * as postController from "../controllers/post.controller";

const router = Router();

// Posts
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);

// Posts de un usuario
router.get("/user/:id", postController.getPostsByUser);

export const postRoutes = router;
