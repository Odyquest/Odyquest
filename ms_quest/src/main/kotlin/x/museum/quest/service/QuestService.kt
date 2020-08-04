/*
 * Copyright (C) 2020 - museum x, Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

package x.museum.quest.service

import org.springframework.data.mongodb.core.ReactiveFluentMongoOperations
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.stereotype.Service
import org.springframework.util.MultiValueMap
import x.museum.quest.entity.Quest
import kotlinx.coroutines.flow.Flow
import mu.KotlinLogging
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.withTimeout
import org.springframework.data.mongodb.core.flow
import org.springframework.data.mongodb.core.query


/**
 * This Service represents the main application logic.
 * Functions are called by the handler and then perform operations
 * on the database.
 * @author [Florian Göbel](mailto:alfiron.begoel@gmail.com)
 */

@Service
class QuestService(
        private val mongo: ReactiveFluentMongoOperations,
        private val mongoTemplate: ReactiveMongoTemplate
        ) {

        /**
         * Find and return all quests.
         */
        suspend fun findAll() = withTimeout(timeoutShort) {
                mongo.query<Quest>()
                        .flow()
                        .onEach{ logger.debug { "findAll(): $it"} }
        }

        private companion object {
                val logger = KotlinLogging.logger {}

                const val timeoutShort = 500L
                const val timeoutLong = 2000L
        }

}