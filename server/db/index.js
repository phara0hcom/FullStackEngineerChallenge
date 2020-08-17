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
      pool.query(`SELECT * FROM employees`, (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(results);
        }
      });
    }),

  userBy: (by, value) =>
    new Promise((resolve, reject) => {
      switch (by) {
        case "id":
          pool.query(
            `SELECT * FROM employees WHERE id = ?`,
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
            `SELECT * FROM employees WHERE name = ?`,
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

  putById: (id, data) =>
    new Promise((resolve, reject) => {
      pool.query(
        `UPDATE employees SET firstName = ?, lastName = ?, email = ? , lastReview = ? , manager = ? WHERE id = ?`,
        [
          data.firstName,
          data.lastName,
          data.email,
          data.lastReview,
          data.manager,
          id,
        ],
        (err, results) => {
          if (err) {
            console.log("putById", { err });
            return reject(err);
          } else {
            console.log("putById", { results });
            return resolve(results);
          }
        }
      );
    }),

  deleteById: (id) =>
    new Promise((resolve, reject) => {
      pool.query(`DELETE FROM employees WHERE id = ?`, id, (err, results) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(results);
        }
      });
    }),

  putNew: (data) =>
    new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO employees SET ?`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          lastReview: data.lastReview,
          manager: data.manager,
        },
        (err, results) => {
          if (err) {
            console.log("putById", { err });
            return reject(err);
          } else {
            console.log("putById", { results });
            return resolve({ status: "inserted", id: results.insertId });
          }
        }
      );
    }),
};

module.exports = userDB;
