const { Channel, User, Subscription, Video } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const channels = await Channel.findAll();

      return res.status(200).json({
        status: true,
        message: "success",
        data: channels,
      });
    } catch (error) {
      next(error);
    }
  },

  indexSubscriber: async (req, res, next) => {
    try {
      const channels = await Channel.findAll({
        include: [
          {
            model: User,
            through: Subscription,
            as: "subscriber",
          },
        ],
        order: [["id", "ASC"]],
      });

      return res.status(200).json({
        status: true,
        message: "success",
        data: channels,
      });
    } catch (error) {
      next(error);
    }
  },

  indexUser: async (req, res, next) => {
    try {
      const channels = await Channel.findAll({
        include: [
          {
            model: User,
            as: "user",
          },
        ],
        order: [["id", "ASC"]],
      });

      return res.status(200).json({
        status: true,
        message: "success",
        data: channels,
      });
    } catch (error) {
      next(error);
    }
  },

  indexVideo: async (req, res, next) => {
    try {
      const channels = await Channel.findAll({
        include: [
          {
            model: Video,
            as: "videos",
          },
        ],
        order: [["id", "ASC"]],
      });

      return res.status(200).json({
        status: true,
        message: "success",
        data: channels,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { name, description, user_id } = req.body;

      if (!user_id || !name) {
        return res.status(400).json({
          status: false,
          message: "userid and name is required!",
          data: null,
        });
      }

      const user = await User.findOne({ where: { id: user_id } });
      if (!user) {
        return res.status(404).json({
          status: false,
          message: `can't find user with id ${user_id}`,
          data: null,
        });
      }

      const channel = await Channel.create({
        name: name,
        description: description,
        user_id: user_id,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: channel,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { name, description, user_id } = req.body;

      if (!user_id || !name) {
        return res.status(400).json({
          status: false,
          message: "userid and name is required!",
          data: null,
        });
      }

      const user = await User.findOne({ where: { id: user_id } });
      if (!user) {
        return res.status(404).json({
          status: false,
          message: `can't find user with id ${user_id}`,
          data: null,
        });
      }

      const channel = await Channel.create({
        name: name,
        description: description,
        user_id: user_id,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: channel,
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const { channel_id } = req.params;

      const channel = await Channel.findOne({
        where: {
          id: channel_id,
        },
        include: [
          {
            model: User,
            through: Subscription,
            as: "subscriber",
          },
          {
            model: Video,
            as: "videos",
          },
          {
            model: User,
            as: "user",
          },
        ],
      });

      if (!channel) {
        return res.status(404).json({
          status: false,
          message: `can't find channel with id ${channel_id}`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: channel,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { channel_id } = req.params;

      const updated = await Channel.update(req.body, {
        where: { id: channel_id },
      });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `can't find channel with id ${channel_id}`,
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
      const { channel_id } = req.params;

      const deleted = await Channel.destroy({
        where: { id: channel_id },
      });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `can't find channel with id ${channel_id}`,
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
