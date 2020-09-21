package x.museum.api_gateway.service

import mu.KotlinLogging
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.ExchangeFilterFunctions
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.bodyToMono
import x.museum.api_gateway.entity.CustomUser
import x.museum.api_gateway.entity.UserId

@Service
class CustomUserService(
        @Lazy private val clientBuilder: WebClient.Builder
){

    suspend fun findUserById(userId: UserId): CustomUser {
        logger.debug { "findUserById: $userId" }

        var client = clientBuilder
                .baseUrl("http://$userService")
                .filter(ExchangeFilterFunctions.basicAuthentication(username, password))
                .build()

        val getUserFn = client
                .get()
                .uri("/api/$userId")
                .retrieve()
                .bodyToMono<CustomUser>()
                .doOnNext { logger.debug { "findUserById(): $it" } }

        val fallbackFn = { throwable: Throwable ->
            logger.warn(throwable) { "findUserById(): ${throwable.message}" }
            Bearbeiterin(nachname = "fallback", email = "fallback@acme.com").toMono()
        }

        return circuitBreaker.run(getUserFn, fallbackFn).awaitFirst()
    }

    private companion object {
        val logger = KotlinLogging.logger {}

        private const val username = "admin"
        private const val password = "p"
        const val userService = "user"

        const val timeoutShort = 500L
        const val timeoutLong = 2000L
    }
}