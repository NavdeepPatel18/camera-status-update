// var Request = require("tedious").Request;
const sql = require("mssql");
const { config } = require("./db.config");

const Read = async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    const pool = await sql.connect(config);
    const result1 = await pool.request().query("SELECT * FROM streamlist;");

    var offline = [];
    var online = [];

    result1.recordset.forEach((camera) => {
      if (camera.id != null) {
        online.push(camera);
      } else {
        offline.push(camera);
      }
    });

    pool.close();

    // console.dir(result1);
    return { offline, online };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  Read,
};
