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
import { uploadVideo } from "../middleware";

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail); // function

// Edit Video
videoRouter.get(routes.editVideo(), getEditVideo); // function
videoRouter.post(routes.editVideo(), postEditVideo); // function

// Delete Video
videoRouter.get(routes.deleteVideo(), deleteVideo); // function

export default videoRouter;
