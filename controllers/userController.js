const obj = require("../models/index");
const { Op } = require("sequelize");

const User = obj.userdata;
const Contact = obj.contact;
const sequelize = obj.sequelize;

const createUser = async (req, res) => {
  try {
    const data = await User.create(req.body);
    if (data) {
      var data2 = await Contact.create({
        permanent_address: "abc",
        current_address: "xyz",
        userId: data.id,
      });
    }

    res.status(200).json({ data: data2 });
  } catch (e) {
    let message;
    e.errors?.forEach((error) => {
      switch (error.validatorKey) {
        case "isNumeric":
          message = error.message;
          break;
        case "notNull":
          message = error.message;
          break;

        default:
          message = error.message;
          break;
      }
    });

    res.status(500).json({ message: message });
  }
};

const fetchUsers = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: ["firstName", "lastName", "age"],
      include: [
        {
          model: Contact,
          attributes: ["permanent_address", "current_address"],
          as: "contact",
        },
      ],
    });

    // const data = await Contact.findAll({
    //   attributes: ["permanent_address", "current_address"],
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["firstName", "lastName", "age"],
    //       as: "user",
    //     },
    //   ],
    // });

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const fetchUser = async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const data = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const dummy = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: [
        "lastName",
        [sequelize.fn("COUNT", sequelize.col("age")), "averageAge"],
      ],
      group: ["lastName"],
    });

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createUser,
  fetchUsers,
  fetchUser,
  deleteUser,
  updateUser,
  dummy,
};
