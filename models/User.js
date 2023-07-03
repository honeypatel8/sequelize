module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Userdata",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const value = this.getDataValue("firstName");
          return value.toUpperCase();
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const value = this.getDataValue("lastName");
          return value.toUpperCase();
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Please enter numeric value.",
          },
          notNull: {
            msg: "Please enter age.",
          },
        },
      },
    },
    {
      tableName: "userdata",
      //   timeStamp: true,
      updatedAt: false,
    }
  );

  return User;
};
