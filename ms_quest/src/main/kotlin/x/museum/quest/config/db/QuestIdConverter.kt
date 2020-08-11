package x.museum.quest.config.db

import org.springframework.core.convert.converter.Converter

import org.springframework.data.convert.ReadingConverter
import org.springframework.data.convert.WritingConverter
import x.museum.quest.entity.QuestId

interface QuestIdConverter {

    @ReadingConverter
    class ReadConverter : Converter<String, QuestId> {
        override fun convert(questId: String): QuestId = QuestId.fromString(questId)
    }

    @WritingConverter
    class WriteConverter : Converter<QuestId, String> {
        override fun convert(questId: QuestId): String? = questId.toString()
    }

}