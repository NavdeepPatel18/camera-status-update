//   new Promise((resolve, reject) => {
//     connection.on("connect", (err) => {
//       if (err) {
//         console.log("Connection Failed");
//         throw err;
//       }
//       console.log("Connected");
//       console.log("Reading rows from the Table...");
//       connection.execSql(request);
//     });
//     connection.connect();
//     // Read all rows from table
//     const request = new Request(
//       "SELECT * FROM streamlist;",
//       (err, rowCount, rows) => {
//         if (err) {
//           console.log(err);
//           reject(err);
//         } else {
//           console.log(rowCount + " row(s) returned");
//         }
//       }
//     ).on("doneInProc", (rowCount, more, rows) => {
//       // console.log(rows); // not empty
//       var offline = [];
//       var online = [];
//       rows.forEach(function (columns) {
//         var rowObject = {};
//         columns.forEach(function (column) {
//           rowObject[column.metadata.colName] = column.value;
//         });
//         if (rowObject.status.match("STOPPED")) {
//           offline.push(rowObject);
//         } else {
//           online.push(rowObject);
//         }
//       });

//       resolve({ offline, online });
//     });
//   });



// =========================================================================================







