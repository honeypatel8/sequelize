const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("blog", "Honey", "honey", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("DB connected.");
} catch (error) {
  console.log("Failed to connect to DB.");
}

let obj = {};

obj.Sequelize = Sequelize;
obj.sequelize = sequelize;
sequelize.sync({ force: false });

obj.userdata = require("./User")(sequelize, DataTypes);
obj.contact = require("./Contact")(sequelize, DataTypes);

obj.userdata.hasMany(obj.contact, { foreignKey: "userId", as: "contact" });
obj.contact.belongsTo(obj.userdata, { foreignKey: "userId", as: "user" });

module.exports = obj;
