var path = require('path');
var fs = require('fs');
//need to know the app so that you can resolve the dataSources
var app = require(path.resolve(__dirname, '../server/server'));
// have an output path to save the model to
var outputPath = path.resolve(__dirname, '../common/models');
// the name of your database, which should be in server/datasources.json
var dataSource = app.dataSources.wordNet;

var tableArray = [
'postypes',
'samples',
'samplesets',
'semlinks',
'sensesxlexlinksxsenses',
'sensesxsemlinksxsenses',
'sensesxsynsets',
'synsets',
'synsetsxsemlinksxsynsets',
'verbswithframes',
'vframemaps',
'vframes',
'vframesentencemaps',
'vframesentences',
'words',
'wordsxsenses',
'wordsxsensesxsynsets']


function schemaCB(err, schema) {
  if(schema) {
    console.log("Auto discovery success: " + schema.name);
    var outputName = outputPath + '/' +schema.name + '.json';
    fs.writeFile(outputName, JSON.stringify(schema, null, 2), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputName);
      }
    });
  }
  if(err) {
    console.error(err);
    return;
  }
  return;
};


tableArray.forEach(function(table) {
    console.log(table);
    dataSource.discoverSchema(table,schemaCB);
});
