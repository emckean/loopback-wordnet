var path = require('path');
var fs = require('fs');
//have to define your app so you can find your db
var app = require(path.resolve(__dirname, '../server/server'));
//the path to write your model to
var outputPath = path.resolve(__dirname, '../common/models');
//your database
var ds = app.datasources.wordNet;
//Senses here is the name of a table in our mysql database




// ds.discoverAndBuildModels('Dict', {visited: {}, associations: true},
//     function(err, models) {
//   if (err) throw err;
//   //this is the part of the model object that you want
//   var dictModel = (models.Dict.definition.rawProperties)
//   console.log(dictModel)
//   var Dict = ds.createModel('Dict', dictModel);
//   console.log(Dict)
//   // var outputName = outputPath + '/' +'dict' + '.json';
//   // fs.writeFile(outputName, Dict, function(err) {
//   //     if(err) {
//   //       console.log(err);
//   //     } else {
//   //       console.log("JSON saved to " + outputName);
//   //     }
//   //   });
//     ds.disconnect();
//   // });
// });

ds.discoverAndBuildModels('words', {}, function(err, models) {
  if (err) throw err;

  models.Words.find(function(err, words) {
    if (err) return console.log(err);

    console.log(words);

    ds.disconnect();
  });
});

// ds.discoverModelDefinitions({views: true, limit: 20}, function(err, results){
// 	console.log(results)
// });
// ds.discoverModelProperties('Senses', function(err, results){
// 	console.log(results)
// });

// ds.discoverPrimaryKeys('Senses', function(err, results){
// 	console.log(results)
// });

// ds.discoverForeignKeys('Senses', function(err, results){
// 	console.log(results)
// });

// ds.discoverExportedForeignKeys('Senses',  function(err, results){
// 	console.log(results)
// });