const mysql = require("mysql2");

const dbConnection = async (context) => {
  const config = {
    host: context.HOST,
    user: context.USER,
    port: 16817,
    password: context.PASSWORD,
    database: context.DATABASE
  };

  console.log("connected", config);
  try {
    const db = new Database(config);
    return db;
    
  } catch (error) {
    throw(error)
  }

};
module.exports = dbConnection;

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}


