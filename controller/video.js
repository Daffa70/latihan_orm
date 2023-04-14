const { Video, Channel } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const video = await Video.findAll({
        include: [
          {
            model: Channel,
            as: "channel",
          },
        ],
      });

      return res.status(200).json({
        status: true,
        message: "success",
        data: video,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { title, description, channel_id } = req.body;

      const check_channel = await Channel.findOne({
        where: {
          id: channel_id,
        },
      });

      if (!check_channel) {
        return res.status(404).json({
          status: false,
          message: `can't find Channel with id ${channel_id}`,
          data: null,
        });
      }

      const video = await Video.create({
        title: title,
        description: description,
        channel_id: channel_id,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: video,
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const { video_id } = req.params;

      const video = await Video.findOne({
        where: {
          id: video_id,
        },
        include: [
          {
            model: Channel,
            as: "channel",
          },
        ],
      });

      if (!video) {
        return res.status(404).json({
          status: false,
          message: `can't find Video with id ${video_id}`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: video,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { video_id } = req.params;

      const check_channel = await Channel.findOne({
        where: {
          id: req.body.channel_id,
        },
      });

      if (!check_channel) {
        return res.status(404).json({
          status: false,
          message: `can't find Channel with id ${req.body.channel_id}`,
          data: null,
        });
      }

      const updated = await Video.update(req.body, {
        where: { id: video_id },
      });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `can't find Video with id ${video_id}`,
          data: null,
        });
      }

      return res.status(201).json({
        status: true,
        message: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { video_id } = req.params;

      const deleted = await Video.destroy({
        where: { id: video_id },
      });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `can't find Video with id ${video_id}`,
          data: null,
        });
      }

      return res.status(201).json({
        status: true,
        message: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
