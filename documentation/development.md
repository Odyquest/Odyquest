# Development

For details about the parts, there is corresponding README.md for each:

* [App](../odyquest-app/README.md)
* [CMS](../odyquest-cms/README.md)
* [Data backent](../odyquest-data-backend/README.md)
* [Library for shared code](../odyquest-shared/README.md)
* [Angular related library](../odyquest-frontend-shared/README.md)

## Data model

Each scaventure hunt or escape game is represented as an object of type [Chase](../odyquest-shared/chase-model/src/chase.ts). It consists of [Game Elements](../odyquest-shared/chase-model/src/game_element.ts) which are either [Narratives](../odyquest-shared/chase-model/src/narrative.ts) or [Quests](../odyquest-shared/chase-model/src/quest.ts).

The chases are passed between the components as json objects serialized by [typescript-json-serializer](https://www.npmjs.com/package/typescript-json-serializer).

