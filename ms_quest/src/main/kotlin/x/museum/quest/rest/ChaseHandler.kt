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

package x.museum.quest.rest

import x.museum.quest.service.ChaseService
import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.exc.InvalidFormatException
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.handleCoroutineException
import mu.KotlinLogging
import mu.KotlinLogging.logger
import org.springframework.core.codec.DecodingException
import org.springframework.http.HttpHeaders
import org.springframework.stereotype.Component
import org.springframework.http.HttpStatus.FORBIDDEN
import org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR
import org.springframework.http.HttpStatus.NOT_MODIFIED
import org.springframework.http.HttpStatus.PRECONDITION_FAILED
import org.springframework.http.HttpStatus.PRECONDITION_REQUIRED
import org.springframework.web.reactive.function.server.ServerRequest
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.ServerResponse.badRequest
import org.springframework.web.reactive.function.server.ServerResponse.created
import org.springframework.web.reactive.function.server.ServerResponse.noContent
import org.springframework.web.reactive.function.server.ServerResponse.notFound
import org.springframework.web.reactive.function.server.ServerResponse.ok
import org.springframework.web.reactive.function.server.ServerResponse.status
import org.springframework.web.reactive.function.server.awaitBody
import org.springframework.web.reactive.function.server.bodyValueAndAwait
import org.springframework.web.reactive.function.server.buildAndAwait
import x.museum.quest.Router.Companion.apiPath
import x.museum.quest.entity.Chase
import x.museum.quest.entity.ChaseId
import java.net.URI
import x.museum.quest.entity.Quest
import x.museum.quest.entity.QuestId
import x.museum.quest.service.QuestService
import javax.validation.ConstraintViolationException

@Component
class ChaseHandler(
        private val service: ChaseService
) {

    /*******************************************
     *                 CREATE
     *******************************************/

    suspend fun create(request: ServerRequest): ServerResponse {

        val chase = try {
            request.awaitBody<Chase>()
        } catch (e: DecodingException) {
            return handleDecodingException(e)
        }

        val newChase = try {
            service.create(chase)
        }catch (e: ConstraintViolationException) {
            return handleConstraintViolation(e)
        }

        logger.trace { "Saved chase: $newChase" }
        val baseUri = getBaseUri(request.headers().asHttpHeaders(), request.uri())
        val location = URI("$baseUri/${newChase.id}")
        return created(location).buildAndAwait()
    }

    /*******************************************
     *                  READ
     *******************************************/

    suspend fun findAll(request: ServerRequest): ServerResponse {

        val chases = mutableListOf<Chase>()

        service.findAll()
                .toList(chases)

        // Check if list is empty
        if(chases.isEmpty())
            return notFound().buildAndAwait()

        // If list is not empty, return with OK and all chases.
        return ok().bodyValueAndAwait(chases)
    }

    /*******************************************
     *            Utility Functions
     *******************************************/

    /**
     * TODO
     * @param exception
     * @return
     */
    private suspend fun handleDecodingException(exception: DecodingException): ServerResponse {
        ChaseHandler.logger.debug(exception.message)
        return when (val e = exception.cause) {
            is JsonParseException -> {
                val msg = e.message ?: ""
                ChaseHandler.logger.debug { "JsonParseException: $msg" }
                badRequest().bodyValueAndAwait(msg)
            }
            is InvalidFormatException -> {
                val msg = e.message ?: ""
                ChaseHandler.logger.debug { "InvalidFormatException: $msg" }
                badRequest().bodyValueAndAwait(msg)
            }
            else -> status(INTERNAL_SERVER_ERROR).buildAndAwait()
        }
    }

    /**
     * TODO
     * @param exception
     * @return
     */
    private suspend fun handleConstraintViolation(exception: ConstraintViolationException): ServerResponse {
        val violations = exception.constraintViolations
        if (violations.isEmpty()) {
            return badRequest().buildAndAwait()
        }

        val chaseViolations = violations.map { violation ->
            ChaseConstraintViolation(
                    property = violation.propertyPath.toString(),
                    message = violation.message
            )
        }
        ChaseHandler.logger.trace { "violations: $chaseViolations" }
        return badRequest().bodyValueAndAwait(chaseViolations)
    }

    fun getBaseUri(headers: HttpHeaders, uri: URI, id: ChaseId? = null): String {
        val forwardedHost = headers.getFirst("x-forwarded-host")

        return if (forwardedHost == null) {
            val baseUri = uri.toString().substringBefore('?').removeSuffix("/")
            if (id == null) {
                baseUri
            } else {
                baseUri.removeSuffix("/$id")
            }
        } else {
            // x-forwarded-proto: "https"
            // x-forwarded-host: "localhost:8443"
            val forwardedProto = headers.getFirst("x-forwarded-proto")
            val forwardedPrefix = headers.getFirst("x-forwarded-prefix")
            println("!!!$forwardedProto://$forwardedHost")
            println("!!!$forwardedPrefix")
            "$forwardedProto://$forwardedHost$forwardedPrefix$apiPath"
        }
    }

    private companion object {
        val logger = KotlinLogging.logger {}
    }
}