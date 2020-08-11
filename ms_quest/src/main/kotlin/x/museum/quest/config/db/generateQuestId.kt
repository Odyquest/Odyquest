package x.museum.quest.config.db

import org.springframework.data.mongodb.core.mapping.event.ReactiveBeforeConvertCallback
import reactor.kotlin.core.publisher.toMono
import x.museum.quest.entity.Quest
import java.util.*

fun generateQuestId() = ReactiveBeforeConvertCallback<Quest> {
    quest, _ ->
    if (quest.id == null) {
        quest.copy(id = UUID.randomUUID())
    } else {
        quest
    }.toMono()
}