const { getdata } = require("./data");
const { Read } = require("./find");
const { Insert } = require("./insert");
const { Update } = require("./update");
const { connection } = require("./db.config");

const data = async () => {
  try {
    const { offlinedata, onlinedata } = await getdata();
    // console.dir(offlinedata, { depth: 1 });
    // console.dir(onlinedata, { depth: 1 });
    const { offline, online } = await Read();
    // await Insert(offlinedata, onlinedata);
    await Update(offlinedata, onlinedata, offline, online);
    // console.dir(offline, { depth: 1 });
    // console.dir(online, { depth: 1 });
  } catch (err) {
    throw new Error(err);
  } finally {
    // connection.on("end", (err) => {
    //   console.log("Disconnected");
    // });
    // await connection.close();
  }
};
data();
// setInterval(data, 10000);
