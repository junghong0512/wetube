import express from "express";
import routes from "../routes";
import {
  getUpload,
  postUpload,
  videoDetail,
  getEditVideo,
  postEditVideo,
  deleteVideo
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middleware";

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail); // function

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo); // function
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo); // function

// Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo); // function

export default videoRouter;
