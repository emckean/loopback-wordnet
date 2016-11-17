var tableArray = ['adjectiveswithpositions',
'lexdomains',
'lexlinks',
'linktypes',
'morphmaps',
'morphology',
'morphs',
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

var objects = {}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

tableArray.forEach(function(table) {
	var tableName = table.toProperCase();
	var configData = {dataSource: 'wordNet', public: true}
	objects[tableName] = configData;

});
var jsonConfig = JSON.stringify(objects, null, 2)
    console.log(jsonConfig);