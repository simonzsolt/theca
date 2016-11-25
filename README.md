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

`GET /latin`

##### German

`GET /german`


##### Italian

`GET /italian`

##### Origin

Search by place of origin.

`GET /origin/{place}`
