to start mySQL locally: 
sudo /usr/local/mysql/support-files/mysql.server start
pwd is laptop pwd
to stop mySQl locally: 
sudo /usr/local/mysql/support-files/mysql.server start
to run without pwd
sudo /usr/local/mysql/support-files/mysql.server start --skip-grant-tables

show databases;

here are some notes for you!

4/20:
TODO Next
 look at this, to get models with different foreign keys: http://stackoverflow.com/questions/26802071/loopback-relationship-on-non-id-field

to build models from mysql: discovery-and-build.js
does it do relations? I don't know!
done: senses, dict
http://stackoverflow.com/questions/26128285/loopback-discoverandbuildmodels-not-generating-models
possible tool for relations: https://github.com/savsharma2/loopback-sql-create-model-with-relation/

#Model
1. run discovery-and-build.js for each table
2. add "base" : "PersistedModel" to model
3. add model name to model-config.json, e.g.:
 "Senses": {
    "dataSource": "wordNet",
    "public": true
  } 
4. in model, make sure 
    "idInjection": false,
   then figure out what the key is for the model, e.g. "wordid" and then add "id": "true",

  slc start 

  USE nodemon .

  #relationships
  Words hasMany Senses
  ? Select the model to create the relationship from: Words
? Relation type: has many
? Choose a model to create a relationship with: Senses
? Enter the property name for the relation: senses
? Optionally enter a custom foreign key: wordid
? Require a through model? No

debugging relationships: DEBUG=loopback:connector:mysql,loopback:relations node server/server.js


  ##Explorer
  `npm install --save loopback-component-explorer` 
  Add a section to `server/component-config.json` to setup the component
```{
  "loopback-component-explorer": {
    "mountPath": "/explorer"
  }
}

###Using Explorer
where filter syntax; `{"where":{"lemma":"cat"}}`
how to remove word that's part of the synonym
{
	"include": {
		"relation": "synonyms",
		"scope": {
			"where": {
				"lemma": {
					"nin": ["bountiful"]
				}
			}
		}
	}
}

###wordnet notes
adjpositions: predicate, attributive and immediately postnominal (p, a, ip)
sensekey info https://wordnet.princeton.edu/man/senseidx.5WN.html

###mysql
to find primary key of the table: 

SELECT k.COLUMN_NAME FROM information_schema.table_constraints t LEFT JOIN information_schema.key_column_usage k USING(constraint_name,table_schema,table_name) WHERE t.constraint_type='PRIMARY KEY'     AND t.table_schema=DATABASE()     AND t.table_name='adjpositions';

to find foreign keys:

SELECT 
  TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME
FROM
  INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
  REFERENCED_TABLE_SCHEMA = 'wordNet' AND
  REFERENCED_TABLE_NAME = '<table>';

#get all column names
  select column_name from information_schema.columns
where table_schema = 'wordNet'
order by table_name,ordinal_position

###notes for writeup
get link to wordnet sql (http://wnsql.sourceforge.net/)
instructions for installing mysql, importing wordnet
**read the license**

###TODOS
-- words->>dicts has many rel -- changed key to lemma on 11/28
-- for synonyms words-->dicts-->senses, need to figure out the key, b/c no lemma in senses, maybe wordsxsenses?
-- dict has synsetid, wordsxsensesxsynsets has synsetid, can do hasmany? change id of dict to synsetid, 
--- THIS WORKS: search is GET /Words/{lemma}/dicts, with filter {"include": {          "relation": "synonyms"   }}
-- to set primary key in model it must be "id": true, not "id": one
-- next steps: filter out synonyms with same lemma

-- casedwords, morphology (word(lemma)==>morph(lemma)) [523 abet] word has many morphology? 
-- lexlinks for all relations other than synonyms word1, word2, relation type?

multilevel: 
https://stackoverflow.com/questions/29104149/multi-level-include-filter-with-loopback-js


###some examples
58883 -- good
16516 -- bountiful


### mysql
show databases;
use wordNet;