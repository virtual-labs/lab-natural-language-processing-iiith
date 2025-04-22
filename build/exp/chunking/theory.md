#### Chunking of text invloves
                            dividing a text into
                            syntactically correlated words.

Eg: He ate an apple to satiate his hunger.  [NP He ] [VP ate] [NP an apple] [VP to satiate] [NP his hunger]

Eg: दरवाज़ा खुल गया
[NP दरवाज़ा] [VP खुल गया]

#### Chunk Types

The chunk types are based on the syntactic category part. Besides the head a chunk also contains modifiers (like determiners, adjectives, postpositions in NPs).

The basic types of chunks in English are:

|   |Chunk type|Tag Name|
|---|---|---|
|1  |Noun|NP |
|2  |Verb|VP |
|3  |Adverb|ADVP|
|4  |Adjectivial|ADJP|
|5  |Prepositional|PP|


The basic Chunk Tag Set for Indian Languages

|Sl. No|Chunk type|Tag Name|
|---|---|---|
|1  |Noun Chunk|NP |
|2  |Finite Verb Chunk|VGF|
|3  |Non-Finite Verb Chunk|VGNF|
|4  |Adjectivial Chunk|JJP|
|5  |Adverb Chunk|RBP|


#### NP   Noun Chunks

Noun Chunks will be given the tag NP and include non-recursive noun phrases and postposition for Indian languages and preposition for English. Determiners, adjectives and other modifiers will be part of the noun chunk.

Eg: 

(इस/DEM किताब/NN में/PSP)NP 
'this' 'book'  'in'    

((in/IN the/DT big/ADJ room/NN))NP

#### Verb Chunks


The verb chunks are marked as VP for English, however they would be of several types for Indian languages.  A verb group will include the main verb and its auxiliaries, if any.

For English:

I (will/MD be/VB loved/VBD)VP

The types of verb chunks and their tags are described below.

1. VGF	Finite Verb Chunk

The auxiliaries in the verb group mark the finiteness of the
verb at the chunk level. Thus, any verb group which is
finite will be tagged as VGF. For example,

Eg: मैंने घर पर (खाया/VM)VGF
    'I erg''home' 'at''meal'  'ate'

2. VGNF   Non-finite Verb Chunk

A non-finite verb chunk will be tagged as VGNF. 

Eg: सेब  (खाता/VM  हुआ/VAUX)VGNF लड़का जा रहा है 
  'apple' 'eating' 'PROG'  'boy' go' 'PROG' 'is'

3. VGNN	Gerunds

A verb chunk having a gerund will be annotated as VGNN.

Eg: शराब (पीना/VM)VGNN सेहत के लिए हानिकारक है sharAba  
    'liquor'  'drinking'      'heath'   'for' 'harmful'   'is'

#### JJP/ADJP   	Adjectival Chunk


An adjectival chunk will be tagged as ADJP for English and JJP for Indian languages. This chunk will consist of all adjectival chunks including the predicative adjectives.

Eg: 

वह लड़की है (सुन्दर/JJ)JJP 

The fruit is (ripe/JJ)ADJP

Note: Adjectives appearing before a noun will be grouped together within the noun chunk.

#### RBP/ADVP	    Adverb Chunk


This chunk will include all pure adverbial phrases.

Eg:

वह (धीरे-धीरे/RB)RBP चल रहा था 
'he' 'slowly' 'walk' 'PROG' 'was'

He walks (slowly/ADV)/ADVP

#### PP Prepositional Chunk

This chunk type is present for only English and not for Indian languages. It consists of only the preposition and not the NP argument.

Eg: 

(with/IN)PP a pen  

#### IOB prefixes

Each chunk has an open boundary and close boundary that delimit the word groups as a minimal non-recursive unit. This can be formally expressed by using IOB prefixes: B-CHUNK for the first word of the chunk and I-CHUNK for each other word in the chunk. Here is an example of the file format:

|Tokens|POS|Chunk Tags|
|---|---|---|
|He |PRP|B-NP|
|Ate|VBD|B-VP|
|An |DT |B-NP|
|Apple|NN|I-NP|
|To |TO |B-VP |
|Satiate|VB |I-VP|
|His|PRP$|B-NP|
|Hunger|NN |I-NP|
