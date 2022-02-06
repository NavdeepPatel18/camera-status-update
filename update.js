const sql = require("mssql");
const { config } = require("./db.config");

const Update = async (getoffline, getonline, offline, online) => {
  try {
    var streamUpdate = "";
    var CameraStopDurationUpdate = "";
    const date = new Date().toISOString();

    for (data of getoffline) {
      const compare = online.find(({ streamname }) => {
        if (streamname == data) {
          return true;
        } else {
          return false;
        }
      });

      if (compare) {
        streamUpdate += `UPDATE streamlist SET status = 'RUNNING', lastseen = '${date}' , statusFlag = 3 , isLive = 1 WHERE streamname= '${data}';`;
        CameraStopDurationUpdate += `INSERT INTO CameraStopDurationUpdate (streamname,OffLineStartTime) VALUES ('${data}','${date}')`;
      } else {
        streamUpdate += `UPDATE streamlist SET status = 'RUNNING', lastseen = '${date}' , statusFlag = 3 , isLive = 1 WHERE streamname= '${data}';`;
      }
    }

    for (data of getonline) {
      const compare = offline.find(({ streamname }) => {
        if (streamname == data) {
          return true;
        } else {
          return false;
        }
      });

      if (compare) {
        streamUpdate += `UPDATE streamlist SET status = 'RUNNING', lastseen = '${date}' , statusFlag = 3 , isLive = 1 WHERE streamname= '${data}';`;
        CameraStopDurationUpdate += `UPDATE CameraStopDurationUpdate SET OffLineStopTime = '${date}' WHERE streamname= '${data}';`;
      } else {
        streamUpdate += `UPDATE streamlist SET status = 'RUNNING', lastseen = '${date}' , statusFlag = 3 , isLive = 1 WHERE streamname= '${data}';`;
      }
    }

    // for (data of getonline) {
    //   query_string += `UPDATE streamlist SET status = 'RUNNING', lastseen = '${date}' , statusFlag = 3 , isLive = 1 WHERE streamname= '${data}';`;
    // }

    // for (data of getoffline) {
    //   query_string += `UPDATE streamlist SET status = 'STOPPED' WHERE streamname= '${data}';`;
    // }

    const pool = await sql.connect(config);
    const streamResult = await pool.request().query(streamUpdate);
    const cameraStopResult = await pool
      .request()
      .query(CameraStopDurationUpdate);

    pool.close();

    console.dir(streamResult);
    console.dir(cameraStopResult);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  Update,
};
