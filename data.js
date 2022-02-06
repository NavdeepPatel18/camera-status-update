const axios = require("axios");
async function getdata() {
  var offlinedata = [];
  var onlinedata = [];

  try {
    const response = await axios.get("http://ptz1.vmukti.com:8080/api/streams");
    if (response) {
      const dataStream = response.data;

      const d = Object.entries(dataStream.data["live-record"]);

      for (index of d) {
        if (index[1].publisher.id != "") {
          onlinedata.push(index[1].publisher.name);
        } else {
          offlinedata.push(index[0]);
        }
      }
    } else {
      console.log(err);
    }

    // 08061999973

    // console.log(Object.entries(dataStream.data["live-record"]), typeof dataStream);
  } catch (error) {
    console.error(error);
  } finally {
    return { offlinedata, onlinedata };
  }
}

module.exports = {
  getdata,
};
