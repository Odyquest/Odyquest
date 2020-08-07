package x.museum.quest.config.security

import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.http.HttpMethod.DELETE
import org.springframework.http.HttpMethod.GET
import org.springframework.http.HttpMethod.OPTIONS
import org.springframework.http.HttpMethod.PATCH
import org.springframework.http.HttpMethod.POST
import org.springframework.http.HttpMethod.PUT
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.web.server.SecurityWebFilterChain
import x.museum.quest.Router.Companion.apiPath
import x.museum.quest.Router.Companion.authPath

interface AuthorizationConfig {

    @Bean
    fun securityWebFilterChain(http: ServerHttpSecurity, context: ApplicationContext) : SecurityWebFilterChain = http
            .authorizeExchange { exchanges ->
                val questPath = "$apiPath/*"

                exchanges
                        .pathMatchers(GET, questPath).permitAll()
            }
            .httpBasic{}
            .formLogin{ form -> form.disable() }
            .headers { headers -> headers.contentSecurityPolicy("default-src 'self'") }
            // Cross-Site-Request-Forgery (TODO: Check if we need to enable it)
            .csrf { csrf -> csrf.disable() }
            .build()
}