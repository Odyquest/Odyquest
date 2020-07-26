package x.museum.quest.service

import org.springframework.data.mongodb.core.ReactiveFluentMongoOperations
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.stereotype.Service

/**
 * [Florian Göbel](mailto:florian.goebel@outlook.de)
 */

@Service
class QuestService(
        private val mongo: ReactiveFluentMongoOperations,
        private val mongoTemplate: ReactiveMongoTemplate
        ) {


}