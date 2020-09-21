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

package x.museum.api_gateway.config.security

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
import x.museum.api_gateway.config.security.Roles.actuator
//import org.springframework.boot.actuate.autoconfigure.security.reactive.EndpointRequest
//import org.springframework.boot.actuate.autoconfigure.security.reactive.EndpointRequest.toAnyEndpoint



    fun securityWebFilterChain(http: ServerHttpSecurity) : SecurityWebFilterChain = http
            .authorizeExchange { exchanges ->
                val chasePath = "/chases/api"
                val chasePathId = "/chases/api/*"
                val questPath = "/quests/api"
                val questPathId = "quests/api/*"

                exchanges
                        // Chase
                        .pathMatchers(GET, chasePath).permitAll()
                        .pathMatchers(GET, chasePathId).permitAll()

                        // Quest
                        .pathMatchers(GET, questPath).permitAll()
                        .pathMatchers(GET, questPathId).permitAll()

                        // Consul
//                        .matchers(EndpointRequest.to("health")).permitAll()
//                        .matchers(toAnyEndpoint()).hasRole(actuator)

                        .pathMatchers(GET, "/*").permitAll()
            }
            .httpBasic{}
            .formLogin{ form -> form.disable() }
            .headers { headers -> headers.contentSecurityPolicy("default-src 'self'") }
            .csrf { csrf -> csrf.disable() }
            .build()
