const { User, Channel, Subscription } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await User.findAll({
        order: [["id", "ASC"]],
      });

      return res.status(200).json({
        status: true,
        message: "success",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  indexSubscribe: async (req, res, next) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Channel,
            through: Subscription,
            as: "subscribe",
          },
        ],
        order: [["id", "ASC"]],
      });

      return res.status(200).json({
        status: true,
        message: "success",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  indexChannel: async (req, res, next) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Channel,
            as: "channel",
          },
        ],
        order: [["id", "ASC"]],
      });

      return res.status(200).json({
        status: true,
        message: "success",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const user = await User.findOne({
        where: {
          id: user_id,
        },
      });

      if (!supplier) {
        return res.status(404).json({
          status: false,
          message: `can't find user with id ${user_id}`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: supplier,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const user = await User.create({
        name: name,
        email: email,
        password: password,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  storeSubsriber: async (req, res, next) => {
    const { user_id, channel_id } = req.body;

    const check_user = await User.findOne({
      where: {
        id: user_id,
      },
    });

    const check_channel = await Channel.findOne({
      where: {
        id: channel_id,
      },
    });

    if (!check_channel || !check_user) {
      return res.status(404).json({
        status: false,
        message: `can't find id`,
        data: null,
      });
    }

    const check_duplicate_data = await Subscription.findOne({
      where: {
        user_id: user_id,
        channel_id: channel_id,
      },
    });

    const subscription = await Subscription.create({
      user_id: user_id,
      channel_id: channel_id,
    });

    return res.status(201).json({
      status: true,
      message: "success",
      data: subscription,
    });
  },

  update: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const updated = await User.update(req.body, {
        where: { id: user_id },
      });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `can't find user with id ${user_id}`,
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
      const { user_id } = req.params;

      const deleted = await Supplier.destroy({
        where: { id: user_id },
      });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `can't find user with id ${user_id}`,
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
