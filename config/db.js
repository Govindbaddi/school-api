const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.log("DB connection error:", err);
  } else {
    console.log("MySQL connected");
  }
});

//mysql://root:FisXBIocNSdadwdCpKVafUFPTuUkOQPx@maglev.proxy.rlwy.net:43327/railway
module.exports = connection;