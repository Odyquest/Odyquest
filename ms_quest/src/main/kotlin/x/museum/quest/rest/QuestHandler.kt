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

import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.exc.InvalidFormatException
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.handleCoroutineException
import kotlinx.coroutines.reactive.awaitFirst
import mu.KotlinLogging
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
import x.museum.quest.Router.Companion.idPathVar
import java.net.URI
import x.museum.quest.entity.Quest
import x.museum.quest.entity.QuestId
import x.museum.quest.service.AccessForbiddenException
import x.museum.quest.service.InvalidVersionException
import x.museum.quest.service.QuestService
import java.lang.IllegalArgumentException
import javax.validation.ConstraintViolationException

/**
 * @author [Florian Göbel](mailto:alfiron.begoel@gmail.com)
 */
@Component
class QuestHandler(
        private val service: QuestService
) {

    /*******************************************
     *                 CREATE
     *******************************************/

    suspend fun create(request: ServerRequest): ServerResponse {

        val quest = try {
            request.awaitBody<Quest>()
        } catch (e: DecodingException) {
            return handleDecodingException(e)
        }


        val newQuest = try {
            service.create(quest)

        }catch (e: ConstraintViolationException) {
            return handleConstraintViolation(e)
        }

        val baseUri = getBaseUri(request.headers().asHttpHeaders(), request.uri())
        val location = URI("$baseUri/${newQuest.id}")
        return created(location).buildAndAwait()
    }

    /*******************************************
     *                  READ
     *******************************************/

    suspend fun findById(request: ServerRequest): ServerResponse {
        println("Handler: findById")
        val idStr = request.pathVariable(idPathVar)
        val id = QuestId.fromString(idStr)

        // val username = getUsername(request)

        // TODO: Implement security check with username

        val quest = try {
            service.findById(id) ?: return notFound().buildAndAwait()
        } catch (e: AccessForbiddenException) {
            return status(FORBIDDEN).buildAndAwait()
        }
        QuestHandler.logger.debug { "findById: $quest" }
        return toResponse(quest, request)
    }

    /**
     * Find and return all quests.
     * @param request The incoming request
     * @return Returns status code 404 if nothing is found. Else return all quests with status code 200.
     */
    suspend fun findAll(request: ServerRequest): ServerResponse {

        val quests = mutableListOf<Quest>()

        service.findAll()
                .toList(quests)

        // Check if list is empty
        if(quests.isEmpty())
            return notFound().buildAndAwait()

        // If list is not empty, return with OK and all quests.
        return ok().bodyValueAndAwait(quests)
    }


    /*******************************************
     *                 UPDATE
     *******************************************/

    private suspend fun update(quest: Quest, id: QuestId, version: String): ServerResponse {
        val updatedQuest = try {
            //TODO
            service.update(quest, id, version) ?: return notFound().buildAndAwait()
        } catch (e: ConstraintViolationException) {
            return handleConstraintViolation(e)
        } catch (e: InvalidVersionException) {
            val msg = e.message ?: ""
            QuestHandler.logger.trace { "InvalidVersionException: $msg" }
            return status(PRECONDITION_FAILED).bodyValueAndAwait(msg)
        }

        QuestHandler.logger.trace { "Quest updated: $updatedQuest" }
        return noContent().eTag("\"${updatedQuest.version}\"").buildAndAwait()
    }

    /**
     * @param request The incoming request
     * @return A server response with status code
     */
    suspend fun update(request: ServerRequest): ServerResponse {

        var version = getIfMatch(request)
                ?: return status(PRECONDITION_REQUIRED).bodyValueAndAwait("Missing version")
        QuestHandler.logger.trace { "Version: $version" }

        if (version.length < 3) {
            return status(PRECONDITION_FAILED).bodyValueAndAwait("Version mismatch $version")
        }

        version = version.substring(1, version.length -1 )

        val idStr = request.pathVariable("id")
        val id = QuestId.fromString(idStr)

        val quest = try {
            request.awaitBody<Quest>()
        } catch (e: DecodingException) {
            return handleDecodingException(e)
        }

        return update(quest, id, version)
    }

    /*******************************************
     *                 DELETE
     *******************************************/

    suspend fun deleteById(request: ServerRequest): ServerResponse {
        val idStr = request.pathVariable(idPathVar)
        val id = QuestId.fromString(idStr)
        val deleteResult = service.deleteById(id)
        logger.debug { "deleteById(): $deleteResult" }

        return noContent().buildAndAwait()
    }

    /*******************************************
     *            Utility Functions
     *******************************************/

    private suspend fun toResponse(quest: Quest, request: ServerRequest): ServerResponse {
        val versionHeader = getIfNoneMatch(request)
        val versionStr = "\"${quest.version}\""
        if (versionStr == versionHeader) {
            return status(NOT_MODIFIED).buildAndAwait()
        }

        return ok().eTag(versionStr).bodyValueAndAwait(quest)
    }

    /**
     * @param request The incoming request
     */
    private suspend fun getUsername(request: ServerRequest): String {
        val principal = request.principal().awaitFirst()
        val username = principal.name
        QuestHandler.logger.debug { "username = $username" }
        return username
    }

    /**
     * @param request The incoming request
     */
    private fun getIfMatch(request: ServerRequest): String? {
        val versionList = try {
            request.headers().asHttpHeaders().ifMatch
        } catch (e: IllegalArgumentException) {
            null
        }
        QuestHandler.logger.trace { "Version: $versionList" }
        return versionList?.firstOrNull()
    }

    private fun getIfNoneMatch(request: ServerRequest): String? {
        // https://tools.ietf.org/html/rfc7232#section-2.3
        @Suppress("SwallowedException")
        val versionHeaderList = try {
            request.headers()
                    .asHttpHeaders()
                    .ifNoneMatch
        } catch (e: IllegalArgumentException) {
            emptyList<String>()
        }
        val versionHeader = versionHeaderList.firstOrNull()
        QuestHandler.logger.debug { "versionHeader: $versionHeader" }
        return versionHeader
    }

    /**
     * TODO
     * @param exception
     * @return
     */
    private suspend fun handleDecodingException(exception: DecodingException): ServerResponse {
        logger.debug(exception.message)
        return when (val e = exception.cause) {
            is JsonParseException -> {
                val msg = e.message ?: ""
                logger.debug { "JsonParseException: $msg" }
                badRequest().bodyValueAndAwait(msg)
            }
            is InvalidFormatException -> {
                val msg = e.message ?: ""
                logger.debug { "InvalidFormatException: $msg" }
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

        val questViolations = violations.map { violation ->
            QuestConstraintViolation(
                    property = violation.propertyPath.toString(),
                    message = violation.message
            )
        }
        logger.trace { "violations: $questViolations" }
        return badRequest().bodyValueAndAwait(questViolations)
    }

    fun getBaseUri(headers: HttpHeaders, uri: URI, id: QuestId? = null): String {
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