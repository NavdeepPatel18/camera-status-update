const sql = require("mssql");
const { config } = require("./db.config");

const Insert = async (offline, online) => {
  try {
    const table = new sql.Table("CameraStatus");
    table.columns.add("CameraID", sql.VarChar("MAX"), { nullable: true });
    table.columns.add("Status", sql.VarChar("MAX"), { nullable: true });
    table.columns.add("lastupdated", sql.VarChar("MAX"), { nullable: true });

    const date = new Date().toISOString();

    for (data of offline) {
      table.rows.add(data, "STOPPED", date);
    }
    for (data of online) {
      table.rows.add(data, "RUNNING", date);
    }

    const pool = await sql.connect(config);
    // const delete_data = await pool.request().query("DELETE FROM CameraStatus");
    const insert_data = await pool.request().bulk(table);
    pool.close();
    console.dir(result1);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  Insert,
};
