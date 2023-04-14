const express = require("express");
const router = express.Router();
const channel = require("../controller/channel");
const video = require("../controller/video");
const user = require("../controller/user");

router.get("/", (req, res) =>
  res.status(200).json({
    message: "Welcome",
  })
);

// channels
router.get("/channels", channel.index);
router.get("/channels-subscriber", channel.indexSubscriber);
router.get("/channels-user", channel.indexUser);
router.get("/channels-video", channel.indexVideo);
router.post("/channels", channel.store);
router.get("/channels/:channel_id", channel.show);
router.put("/channels/:channel_id", channel.update);
router.delete("/channels/:channel_id", channel.destroy);

// video
router.get("/videos", video.index);
router.post("/videos", video.store);
router.get("/videos/:video_id", video.show);
router.put("/videos/:video_id", video.update);
router.delete("/videos/:video_id", video.destroy);

//user
router.get("/users", user.index);
router.get("/user-subscriber", user.indexSubscribe);
router.get("/user-channel", user.indexChannel);
router.post("/add-subscriber", user.storeSubsriber);
router.post("/users", user.store);
router.get("/users/:user_id", user.show);
router.put("/users/:user_id", user.update);
router.delete("/users/:user_id", user.destroy);

module.exports = router;
