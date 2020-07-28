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

import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.flow.toList
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.ServerRequest
import org.springframework.web.reactive.function.server.ServerResponse.notFound
import org.springframework.web.reactive.function.server.buildAndAwait

import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.ServerResponse.ok
import org.springframework.web.reactive.function.server.bodyValueAndAwait
import x.museum.quest.entity.Quest
import x.museum.quest.service.QuestService

/**
 * @author [Florian Göbel](mailto:alfiron.begoel@gmail.com)
 */
@Component
class QuestHandler(
        private val service: QuestService
) {



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


    }
}