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

package x.museum.chase.config.security.dev

import com.mongodb.reactivestreams.client.MongoCollection
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import kotlinx.coroutines.runBlocking
import mu.KLogger
import mu.KotlinLogging
import org.bson.Document
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Description
import org.springframework.data.mongodb.core.CollectionOptions
import org.springframework.data.mongodb.core.ReactiveMongoOperations
import org.springframework.data.mongodb.core.createCollection
import org.springframework.data.mongodb.core.schema.MongoJsonSchema
import org.springframework.data.mongodb.core.dropCollection
import x.museum.chase.entity.Quest

import kotlinx.coroutines.flow.collect
import org.springframework.data.mongodb.core.oneAndAwait
import org.springframework.data.mongodb.core.insert
import org.springframework.data.mongodb.core.schema.JsonSchemaProperty.*
import x.museum.chase.config.dev.chases
import x.museum.chase.entity.Chase

/**
 * Interface to reload the test database, if the development profile is active.
 *
 * @author [Florian Göbel](mailto:alfiron.begoel@gmail.com))
 */
interface DbPopulate {

    @Bean
    @Description("Reloading Developing-DB")
    fun dbPopulate(mongo: ReactiveMongoOperations) = CommandLineRunner {
        val logger = KotlinLogging.logger {}
        logger.warn("The collection 'Chases' will be reloaded.")

        runBlocking {
            mongo.dropCollection<Chase>().awaitFirstOrNull()

            createCollectionAndSchemaForChase(mongo, logger)

            chases.onEach { chase -> mongo.insert<Chase>().oneAndAwait(chase) }
                    .collect { chase -> logger.warn { chase } }
        }
    }

    /**
     * Creates a Schema for MongoDB and then creates a collection with the schema.
     * @param mongo Template for MongoDB
     */
    private suspend fun createCollectionAndSchemaForChase(
            mongo: ReactiveMongoOperations,
            logger: KLogger
    ): MongoCollection<Document> {

        val chaseSchema = MongoJsonSchema.builder()
                .required("metaData")
                .properties(
                        `object`("metaData"),
                        array("narratives"),
                        array("quests"),
                        array("solutions"),
                        string("initialGameElement"),
                        array("tags")


                ).build()

        logger.info { "Created JSON Schema for Chase: ${chaseSchema.toDocument().toJson()}"}
        return mongo.createCollection<Chase>(CollectionOptions.empty().schema(chaseSchema)).awaitFirst()

    }

    private suspend fun createCollectionAndSchemaForQuest(
            mongo: ReactiveMongoOperations,
            logger: KLogger
    ): MongoCollection<Document> {

        val questSchema = MongoJsonSchema.builder()
                .required("title")
                .properties(
                        string("title"),
                        `object`("description").properties(
                                string("id"),
                                int32("version"),
                                string("title"),
                                string("description"),
                                string("author")
                        ),
                        `object`("requirement"),
                        array("tags"),
                        date("lastEdited"),
                        `object`("lastEditor"),
                        `object`("author"),
                        date("creationDate")
                ).build()

        logger.info { "Created JSON Schema for Quest: ${questSchema.toDocument().toJson()}"}
        return mongo.createCollection<Quest>(CollectionOptions.empty().schema(questSchema)).awaitFirst()

    }
}