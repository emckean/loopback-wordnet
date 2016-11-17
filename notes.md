here are some notes for you

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