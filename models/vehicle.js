const mysql = require('mysql');
const Vehicle = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'elarabe1616',
  database: 'testing2'
});

// Check connect
Vehicle.connect(error =>{
  if (error) throw error;
  console.log('Database server connected and running well!');
});

/* const blogSchema = new Schema({
  plate: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true
  },
}, { timestamps: true }); */

module.exports = Vehicle;