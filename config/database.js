import { Sequelize } from "sequelize";

/* database connection 'database_name','user', 'password */
const db = new Sequelize('crud_product_mern', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});

export default db;