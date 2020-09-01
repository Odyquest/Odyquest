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
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.withTimeout
import org.springframework.data.mongodb.SessionSynchronization
import org.springframework.transaction.ReactiveTransactionManager
import org.springframework.transaction.reactive.TransactionalOperator
import org.springframework.transaction.reactive.executeAndAwait
import org.springframework.context.annotation.Lazy
import org.springframework.data.mongodb.core.*
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.transaction.annotation.Transactional
import x.museum.quest.config.dev.adminUser
import x.museum.quest.entity.Chase
import x.museum.quest.entity.QuestId
import java.time.LocalDateTime
import javax.validation.ConstraintViolationException
import javax.validation.ValidatorFactory
import kotlin.reflect.full.isSubclassOf


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
        @Lazy private val validatorFactory: ValidatorFactory
        ) {
        private val validator by lazy { validatorFactory.validator }

        /*******************************************
         *                 CREATE
         *******************************************/

        suspend fun create(quest: Quest): Quest {

                // validate(quest)

                val newQuest = quest.copy(
                        creationDate = LocalDateTime.now(),
                        lastEdited = LocalDateTime.now(),
                        author = adminUser,
                        lastEditor = adminUser
                )



                // https://spring.io/blog/2019/05/16/reactive-transactions-with-spring
//                mongoTemplate.setSessionSynchronization(SessionSynchronization.ALWAYS)
//                val rxtx = TransactionalOperator.create(tm)
//                val questDb = rxtx.executeAndAwait {
//                        create(quest)
//                }

                logger.trace { "Create new quest: $quest" }
                return withTimeout(timeoutShort) { mongo.insert<Quest>().oneAndAwait(newQuest) }
//                return newQuest
        }

        /*******************************************
         *                  READ
         *******************************************/

        suspend fun findById(id: QuestId): Quest? {
                println("service findById")
                val quest = withTimeout(QuestService.timeoutShort) {
                        mongo.query<Quest>()
                                .matching(Quest::id isEqualTo id)
                                .awaitOneOrNull()
                }
                QuestService.logger.debug { "findById: $quest" }
                return quest
        }

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

        private suspend fun update(quest: Quest, questDb: Quest, version: Int): Quest {
                check(mongo::class.isSubclassOf(ReactiveMongoTemplate::class)) {
                        "TODO"
                }
                mongo as ReactiveMongoTemplate
                val questCache: MutableCollection<*> = mongo.converter.mappingContext.persistentEntities
                questCache.remove(questDb)

                val newQuest = quest.copy(id = questDb.id, version = version)
                QuestService.logger.trace { "update: newQuest = $newQuest" }

                return withTimeout(QuestService.timeoutShort) { mongo.save(newQuest).awaitFirst() }
        }

        suspend fun update(quest: Quest, id: QuestId, versionStr: String): Quest? {

                val questDb = findById(id) ?: return null

                QuestService.logger.trace { "update: version=$versionStr, questDB=$questDb" }
                val version = versionStr.toIntOrNull() ?: throw InvalidVersionException(versionStr)
                return  update(quest, questDb, version)
        }


        /*******************************************
         *                 DELETE
         *******************************************/

        suspend fun deleteById(id: QuestId) = withTimeout(timeoutShort) {
                logger.debug { "deleteById(): id = $id" }
                val result = mongo.remove<Quest>()
                        .matching(Quest::id isEqualTo id)
                        .allAndAwait()
                logger.debug { "deleteById(): Deleted items = ${result.deletedCount}" }
                return@withTimeout result
        }

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