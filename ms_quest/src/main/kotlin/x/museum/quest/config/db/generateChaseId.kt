package x.museum.quest.config.db

import org.springframework.data.mongodb.core.mapping.event.ReactiveBeforeConvertCallback
import reactor.kotlin.core.publisher.toMono
import x.museum.quest.entity.Chase
import java.util.*


fun generateChaseId() = ReactiveBeforeConvertCallback<Chase> {
    chase, _ ->
    if (chase.id == null) {
        chase.copy(id = UUID.randomUUID())
    } else {
        chase
    }.toMono()
}