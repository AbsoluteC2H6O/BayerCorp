const mysql = require('mysql');
const Vehicle = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : 'elarabe1616',
  database  : 'BayerCorp'
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