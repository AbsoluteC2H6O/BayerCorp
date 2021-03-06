require('dotenv').config({path: './.env'})
const mysql = require('mysql');
console.log(process.env.HOST);

const Vehicle = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// Check connect
Vehicle.connect(err => {
  if (err) throw err;
  console.log('Database server connected and running well!');
});

module.exports = Vehicle;
/* {
  getConnection() {
    return new Vehicle(function (res, rej) {
      Vehicle.getConnection()
        .then(function (conn) {
          res(conn);
          console.log('Database server connected and running well!');
        })
        .catch(function (error) {
          rej(error);
        });
    });
  },
} */