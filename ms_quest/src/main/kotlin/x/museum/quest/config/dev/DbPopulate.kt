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

package x.museum.quest.config.security.dev

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
import x.museum.quest.entity.Quest

import kotlinx.coroutines.flow.collect
import org.springframework.data.mongodb.core.oneAndAwait
import org.springframework.data.mongodb.core.insert
import org.springframework.data.mongodb.core.schema.JsonSchemaProperty.*
import x.museum.quest.config.dev.chases
import x.museum.quest.entity.Chase

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
            createCollectionAndSchema(mongo, logger)

            chases.onEach { chase -> mongo.insert<Chase>().oneAndAwait(chase) }
                    .collect { chase -> logger.warn { chase } }
        }
    }

    /**
     * Creates a Schema for MongoDB and then creates a collection with the schema.
     * @param mongo Template for MongoDB
     */
    private suspend fun createCollectionAndSchema(
            mongo: ReactiveMongoOperations,
            logger: KLogger
    ): MongoCollection<Document> {

        val schema = MongoJsonSchema.builder()
                .required("title")
                .properties(
                        string("title"),
                        string("comment"),
                        array("quests"),
                        string("path"), // TODO: replace String
                        array("tags"),
                        date("lastEdited"),
                        `object`("lastEditor"),
                        date("creationDate")

                ).build()

        logger.info { "Created JSON Schema for Chase: ${schema.toDocument().toJson()}"}
        return mongo.createCollection<Chase>(CollectionOptions.empty().schema(schema)).awaitFirst()
    }
}