package x.museum.quest.rest

import x.museum.quest.service.ChaseService
import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.exc.InvalidFormatException
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.handleCoroutineException
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
import x.museum.quest.entity.Chase
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

//    suspend fun create(request: ServerRequest): ServerResponse {
//
//        val quest = try {
//            request.awaitBody<Quest>()
//        } catch (e: DecodingException) {
//            return handleDecodingException(e)
//        }
//
//        val newQuest = try {
//            service.create(quest)
//        }catch (e: ConstraintViolationException) {
//            return handleConstraintViolation(e)
//        }
//
//        logger.trace { "Saved quest: $newQuest" }
//        val baseUri = getBaseUri(request.headers().asHttpHeaders(), request.uri())
//        val location = URI("$baseUri/${newQuest.id}")
//        return created(location).buildAndAwait()
//    }

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
}