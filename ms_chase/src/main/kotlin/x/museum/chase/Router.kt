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

package x.museum.chase

import org.springframework.context.annotation.Bean
import org.springframework.hateoas.MediaTypes.HAL_JSON
import org.springframework.http.MediaType
import org.springframework.web.reactive.function.server.coRouter // webflux
import x.museum.chase.entity.Chase
import x.museum.chase.entity.Quest
import x.museum.chase.rest.ChaseHandler
import x.museum.chase.rest.QuestHandler

/**
 * @author [Florian Göbel](mailto:alfiron.begoel@gmail.com)
 */
interface Router {

    @Bean
    fun router(
            chaseHandler: ChaseHandler
    ) = coRouter {

        // Chase
        val chasePath = "${apiPath}/chase"
        val chaseIdPathPattern = "{$idPathVar:${Chase.ID_PATTERN}}"
        val chaseIdPath = "$chasePath/$chaseIdPathPattern"

        println("ROUTER: $chaseIdPath")

        accept(HAL_JSON).nest {
            // Chase
            GET(chasePath, chaseHandler::findAll)
            GET(chaseIdPath, chaseHandler::findById)
        }

        contentType(MediaType.APPLICATION_JSON).nest {
            // Chase
            POST(chasePath, chaseHandler::create)
            PUT(chaseIdPath, chaseHandler::update)

        }
    }

    companion object {

        const val idPathVar = "id"

        const val apiPath = "/api"

        const val authPath = "$apiPath/auth"
    }
}