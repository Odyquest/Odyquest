package x.museum.quest.config.db

import org.springframework.data.mongodb.core.convert.MongoCustomConversions

fun customConversions() = MongoCustomConversions(
        listOf(
                QuestIdConverter.ReadConverter(),
                QuestIdConverter.WriteConverter()
        )
)