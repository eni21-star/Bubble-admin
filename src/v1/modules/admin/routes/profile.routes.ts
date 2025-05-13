import express from "express";
import { container } from "tsyringe";
import ProfileController from "../controllers/profile.controllers";
import { authMiddleware } from "../../../../shared/middleware/auth.middleware";
const profileRouter = express.Router();

const profileController = container.resolve(ProfileController);

profileRouter
  .get(
    "/profile",
    authMiddleware,
    profileController.getProfile.bind(profileController)
  )
  .delete(
    "/profile/:id",
    authMiddleware,
    profileController.deleteProfile.bind(profileController)
  );

export default profileRouter;
