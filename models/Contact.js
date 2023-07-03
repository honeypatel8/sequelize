module.exports = (sequelize, Datatypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      permanent_address: {
        type: Datatypes.STRING,
      },
      current_address: {
        type: Datatypes.STRING,
      },
      userId: {
        type: Datatypes.INTEGER,
        reference: {
          model: "userdata",
        },
      },
    },
    {
      tableName: "contact",
      updatedAt: false,
    }
  );

  return Contact;
};
