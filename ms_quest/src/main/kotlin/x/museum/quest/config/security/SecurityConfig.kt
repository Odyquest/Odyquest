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
//import x.museum.quest.config.security.dev.quest

interface SecurityConfig {

    @Bean
    fun securityWebFilterChain(http: ServerHttpSecurity, context: ApplicationContext) : SecurityWebFilterChain = http
            .authorizeExchange { exchanges ->
                val questPath = "$apiPath/quest/*"
                val chasePath = "$apiPath/chase"
                val chasePathId = "$chasePath/*"


                exchanges
                        .pathMatchers(GET, questPath).permitAll()
                        .pathMatchers(POST, questPath).permitAll()
                        .pathMatchers(GET, chasePath).permitAll()
                        .pathMatchers(GET, chasePathId).permitAll()
                        .pathMatchers(POST, chasePath).permitAll()
                        .pathMatchers(PUT, chasePathId).permitAll()
                        .pathMatchers(DELETE).permitAll()
            }
            .httpBasic{}
            .formLogin{ form -> form.disable() }
            .headers { headers -> headers.contentSecurityPolicy("default-src 'self'") }
            // Cross-Site-Request-Forgery (TODO: Check if we need to enable it)
            .csrf { csrf -> csrf.disable() }
            .build()


}