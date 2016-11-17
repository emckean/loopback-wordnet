var loopback = require('loopback');
var ds = loopback.createDataSource('mysql', {
  "host": "localhost",
  "port": 3306,
  "database": "wordNet",
  "username": "root",
  "password": "yourSQL"
});

// Discover and build models from INVENTORY table
ds.discoverAndBuildModels('senses', {visited: {}, associations: true},
function (err, models) {
if (err) throw err;

  var json = JSON.stringify(schema, null, '  ');
  console.log(json);

  ds.disconnect();
});

