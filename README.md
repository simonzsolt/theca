# THECA

## Overview

THECA is the databse of Hungarian book catalogues and records, within the Hungarian Kingdom, in the period of 1000&mdash;1526.

## API

Result are returned in a `JSON` array.


### Full database

    GET https://theca-online.herokuapp.com/data

### Search API

For every other method the **base URL** is: https://theca-online.herokuapp.com/search

#### Language 

Sorting by the language of the records.

##### Latin

`GET /lang/latin`

##### German

`GET /lang/german`


##### Italian

`GET /lang/italian`

##### Origin

Search by place of origin.

`GET /origin/{place}`

##### Possessor

Search by name attributed to the reocrds.

`GET /possessor/{name}`
