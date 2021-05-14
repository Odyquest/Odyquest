# Development

For details about the parts, there is corresponding README.md for each:

* [App](../xaver-app/README.md)
* [CMS](../xaver-cms/README.md)
* [Api Backend](../api-backend/README.md)
* [Shared stuff](../xaver-shared/README.md)

## Data model

Each scaventure hunt or escape game is represented as an object of type [Chase](../xaver-shared/src/shared/models/chase.ts). It consists of [Game Elements](../xaver-shared/src/shared/models/gameElement.ts) which are either [Narratives](../xaver-shared/src/shared/models/narrative.ts) or [Quests](../xaver-shared/src/shared/models/quest.ts).

The chases are passed between the components as json objects serialized by [typescript-json-serializer](https://www.npmjs.com/package/typescript-json-serializer).

