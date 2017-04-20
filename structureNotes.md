#words: 
 -- words table: id, lemma
 -- http://0.0.0.0:4000/api/Words/happy
 -- right now id is the lemma


-- words have forms (#morphology): 
	-- wordid | lemma    | pos | morph 
-- http://0.0.0.0:4000/api/Words/aardwolf/morphs


-- senses (#dicts) have caseforms (#casedwords)
	-- get senses, get casedWordID, then get caseforms

	
