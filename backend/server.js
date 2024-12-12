const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = require("./app");
const sequelize = require("./config/db");

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Conexión exitosa a la base de datos."
    );
  })
  .catch((err) => {
    console.error("No se pudo conectar:", err);
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
