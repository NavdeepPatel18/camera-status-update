// var Connection = require("tedious").Connection;

const config = {
  server: "localhost",
  authentication: {
    type: "default",
    options: {
      userName: "root", // update me
      password: "password@1234", // update me
    },
  },
  options: {
    port: 1433,
    database: "vmukti",
    enableArithAbort: true,
    trustServerCertificate: true,
    rowCollectionOnDone: true,
  },
};

// var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through

module.exports = { config };
