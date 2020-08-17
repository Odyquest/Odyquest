package x.museum.quest.config.db

import org.springframework.core.convert.converter.Converter
import org.springframework.data.convert.ReadingConverter
import org.springframework.data.convert.WritingConverter
import x.museum.quest.entity.ChaseId

interface ChaseIdConverter {

    @ReadingConverter
    class ReadConverter : Converter<String, ChaseId> {
        override fun convert(chaseId: String): ChaseId = ChaseId.fromString(chaseId)
    }

    @WritingConverter
    class WriteConverter : Converter<ChaseId, String> {
        override fun convert(chaseId: ChaseId): String? = chaseId.toString()
    }

}