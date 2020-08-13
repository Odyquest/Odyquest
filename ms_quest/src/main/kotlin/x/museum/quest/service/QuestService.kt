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

import org.springframework.stereotype.Service
import org.springframework.util.MultiValueMap
import x.museum.quest.entity.Quest
import kotlinx.coroutines.flow.Flow
import mu.KotlinLogging
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.withTimeout
import org.springframework.data.mongodb.SessionSynchronization
import org.springframework.transaction.ReactiveTransactionManager
import org.springframework.transaction.reactive.TransactionalOperator
import org.springframework.transaction.reactive.executeAndAwait
import org.springframework.context.annotation.Lazy
import org.springframework.data.mongodb.core.*
import org.springframework.transaction.annotation.Transactional
import javax.validation.ConstraintViolationException
import javax.validation.ValidatorFactory


/**
 * This Service represents the main application logic.
 * Functions are called by the handler and then perform operations
 * on the database.
 * @author [Florian Göbel](mailto:alfiron.begoel@gmail.com)
 */

@Service
class QuestService(
        private val mongo: ReactiveFluentMongoOperations,
        @Lazy private val mongoTemplate: ReactiveMongoTemplate,
        @Lazy private val tm: ReactiveTransactionManager,
        @Lazy private val validatorFactory: ValidatorFactory
        ) {
        private val validator by lazy { validatorFactory.validator }

        /*******************************************
         *                 CREATE
         *******************************************/

        suspend fun create(quest: Quest): Quest {

                validate(quest)

                val newQuest = quest

                // https://spring.io/blog/2019/05/16/reactive-transactions-with-spring
                mongoTemplate.setSessionSynchronization(SessionSynchronization.ALWAYS)
                val rxtx = TransactionalOperator.create(tm)
                val issueDb = rxtx.executeAndAwait {
                        create(quest)
                }

                logger.trace { "Create new quest: $quest" }
                return withTimeout(timeoutShort) { mongo.insert<Quest>().oneAndAwait(newQuest) }
        }

        /*******************************************
         *                  READ
         *******************************************/

        /**
         * Find and return all quests.
         */
        suspend fun findAll() = withTimeout(timeoutShort) {
                mongo.query<Quest>()
                        .flow()
                        .onEach{ logger.debug { "findAll(): $it"} }
        }

        /*******************************************
         *                 UPDATE
         *******************************************/


        /*******************************************
         *                 DELETE
         *******************************************/

        /*******************************************
         *            Utility Functions
         *******************************************/

        private fun validate(quest: Quest){
                val violations = validator.validate(quest)
                if (violations.isNotEmpty()) throw ConstraintViolationException(violations)
        }

        private companion object {
                val logger = KotlinLogging.logger {}

                const val timeoutShort = 500L
                const val timeoutLong = 2000L
        }

}