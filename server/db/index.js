const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const userDB = {
  all: () =>
    new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users`, (err, results) => {
        if (err) {
          console.log({ err });
          return reject(err);
        } else {
          console.log({ results });
          return resolve(results);
        }
      });
    }),

  userBy: (by, value) =>
    new Promise((resolve, reject) => {
      switch (by) {
        case "id":
          pool.query(
            `SELECT * FROM users WHERE id = ?`,
            value,
            (err, results) => {
              if (err) {
                return reject(err);
              } else {
                return resolve(results);
              }
            }
          );
          break;

        default:
          pool.query(
            `SELECT * FROM users WHERE name = ?`,
            value,
            (err, results) => {
              if (err) {
                return reject(err);
              } else {
                return resolve(results);
              }
            }
          );
          break;
      }
    }),
};

module.exports = userDB;
