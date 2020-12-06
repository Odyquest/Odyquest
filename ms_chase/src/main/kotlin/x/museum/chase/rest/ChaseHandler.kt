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

package x.museum.chase.rest

import x.museum.chase.service.ChaseService
import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.exc.InvalidFormatException
import kotlinx.coroutines.flow.filter
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.handleCoroutineException
import kotlinx.coroutines.reactive.awaitFirst
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
import x.museum.chase.Router.Companion.apiPath
import x.museum.chase.Router.Companion.idPathVar
import x.museum.chase.entity.*
import java.net.URI
import x.museum.chase.service.AccessForbiddenException
import x.museum.chase.service.InvalidVersionException
//import x.museum.chase.service.QuestService
import java.lang.IllegalArgumentException
import javax.validation.ConstraintViolationException

/**
 * @author [Florian Göbel](mailto:alfiron.begoel@gmail.com)
 */
@Component
class ChaseHandler(
        private val service: ChaseService
) {

    /*******************************************
     *                 CREATE
     *******************************************/

    /**
     * @param request The incoming request
     * @return A server response with status code
     */
//    suspend fun create(request: ServerRequest): ServerResponse {
//
//        val chase = try {
//            request.awaitBody<Chase>()
//        } catch (e: DecodingException) {
//            return handleDecodingException(e)
//        }
//
//        val newChase = try {
//            service.create(chase)
//        }catch (e: ConstraintViolationException) {
//            return handleConstraintViolation(e)
//        }
//
//        logger.trace { "Saved chase: $newChase" }
//        val baseUri = getBaseUri(request.headers().asHttpHeaders(), request.uri())
//        val location = URI("$baseUri/${newChase.id}")
//        return created(location).buildAndAwait()
//    }

    /*******************************************
     *                  READ
     *******************************************/

//    suspend fun findById(request: ServerRequest): ServerResponse {
//        println("Handler: findById")
//        val idStr = request.pathVariable(idPathVar)
//        val id = ChaseId.fromString(idStr)
//
//        // val username = getUsername(request)
//
//        // TODO: Implement security check with username
//
//        val chase = try {
//            service.findById(id) ?: return notFound().buildAndAwait()
//        } catch (e: AccessForbiddenException) {
//            return status(FORBIDDEN).buildAndAwait()
//        }
//        logger.debug { "findById: $chase" }
//        return toResponse(chase, request)
//    }


    /**
     * @param request The incoming request
     */
    suspend fun findAll(request: ServerRequest): ServerResponse {

        val chases = mutableListOf<Chase>()
        val chasesMetaData = mutableListOf<ChaseMetaData>()

        service.findAll()
                .toList(chases)

        chases.forEach{ chase -> chasesMetaData.add(chase.metaData) }
        // Check if list is empty
        if(chasesMetaData.isEmpty())
            return notFound().buildAndAwait()

        // If list is not empty, return with OK and all chases.
        return ok().bodyValueAndAwait(chasesMetaData)
    }

    /*******************************************
     *                 UPDATE
     *******************************************/

//    /**
//     * @param chase The chase with updated data
//     * @param id The id of the chase
//     * @param version Version for ETag
//     * @return A server response with status code
//     */
//    private suspend fun update(chase: Chase, id: ChaseId, version: String): ServerResponse {
//        val updatedChase = try {
//            //TODO
//            service.update(chase, id, version) ?: return notFound().buildAndAwait()
//        } catch (e: ConstraintViolationException) {
//            return handleConstraintViolation(e)
//        } catch (e: InvalidVersionException) {
//            val msg = e.message ?: ""
//            logger.trace { "InvalidVersionException: $msg" }
//            return status(PRECONDITION_FAILED).bodyValueAndAwait(msg)
//        }
//
//        logger.trace { "Chase updated: $updatedChase" }
//        return noContent().eTag("\"${updatedChase.version}\"").buildAndAwait()
//    }
//
//    /**
//     * @param request The incoming request
//     * @return A server response with status code
//     */
//    suspend fun update(request: ServerRequest): ServerResponse {
//
//        var version = getIfMatch(request)
//                ?: return status(PRECONDITION_REQUIRED).bodyValueAndAwait("Missing version")
//        logger.trace { "Version: $version" }
//
//        if (version.length < 3) {
//            return status(PRECONDITION_FAILED).bodyValueAndAwait("Version mismatch $version")
//        }
//
//        version = version.substring(1, version.length -1 )
//
//        val idStr = request.pathVariable("id")
//        val id = ChaseId.fromString(idStr)
//
//        val chase = try {
//            request.awaitBody<Chase>()
//        } catch (e: DecodingException) {
//            return handleDecodingException(e)
//        }
//
//        return update(chase, id, version)
//    }

    /*******************************************
     *                 DELETE
     *******************************************/

//    suspend fun deleteById(request: ServerRequest): ServerResponse {
//        val idStr = request.pathVariable(idPathVar)
//        val id = ChaseId.fromString(idStr)
//        val deleteResult = service.deleteById(id)
//        logger.debug { "deleteById(): $deleteResult" }
//
//        return noContent().buildAndAwait()
//    }

    /*******************************************
     *            Utility Functions
     *******************************************/

    private suspend fun toResponse(chase: Chase, request: ServerRequest): ServerResponse {
        val versionHeader = getIfNoneMatch(request)
        val versionStr = "\"${chase.metaData.version}\""
        if (versionStr == versionHeader) {
            return status(NOT_MODIFIED).buildAndAwait()
        }

        return ok().eTag(versionStr).bodyValueAndAwait(chase)
    }

    /**
     * @param request The incoming request
     */
    private suspend fun getUsername(request: ServerRequest): String {
        val principal = request.principal().awaitFirst()
        val username = principal.name
        logger.debug { "username = $username" }
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
        logger.trace { "Version: $versionList" }
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
        logger.debug { "versionHeader: $versionHeader" }
        return versionHeader
    }

    /**
     * TODO
     * @param exception
     * @return A server response with status code
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
     * @return A server response with status code
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

    /**
     * @param headers
     * @param uri
     * @param id
     * @return
     */
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