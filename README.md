## Pair Gen

### Description
Small svelte frontend and express backend to produce random pairs from a list of names. Includes support for members and pairs to exclude

Especially useful for generating random pair programming pairs while avoiding duplicate pairs week to week and accounting for out of office team members. 

### Endpoints
* GET /
  * Health Check
* POST /pairs/
    * Generates pairs from supplied data
    

### /pairs/ Body
```

{
    "teamMembers": string[], // min 1 element
    "excludedTeamMembers": string[],
    "excludedPairs": Pair[] // Pairs are 2 length string arrays
}
```

### Processing Limits
To prevent wasted processing time and to account for possible errors, a maximum limit of 500ms is enforced during the randomization process. If this limit is exceeded the server will respond with a 500.