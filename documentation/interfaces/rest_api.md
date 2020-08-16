# Rest API definition

```
GET /get_chase?id=chase_abc

returns
{
  id: asdf
  title: HelpXaver
  last_edited: ...
  description: [
       {
           id: global_unique_id_1
           last_edited: ...
           text: help xaver },
       {
           id: global_unique_id_2
           last_edited: ...
           img: img_abc
       }
   ]
  start_quest: quest_abc
}
```

```
GET /get_quest?id=quest_abc

returns
{
  id: asdf
  title: Find golden knife
  last_edited:...
  description: [
  ]
  help: [
       {
           id: global_unique_id_3
           last_edited: ...
           condition: time > 10min
           description: ...
       },
       {
           id: global_unique_id_4
           last_edited: ...
           condition: wrong_solution,
           description: "look closer"
       }
   ]
}
```

```
POST /submit_solition
{
  quest_id: asdf
  solution: markerID
}

returns
{
  accept: true
  solution: solution_abc
  exhibit: item_id
  next_quest: quest_xyz
}
Alternativ
{
    accept:false
    exhibit: item_id
}
```

```
GET /media?id=img_abc

returns
Binary file like image
```

