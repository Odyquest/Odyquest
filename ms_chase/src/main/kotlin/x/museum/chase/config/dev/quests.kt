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

package x.museum.chase.config.security.dev

import kotlinx.coroutines.flow.flowOf
import x.museum.chase.config.dev.adminUser
import x.museum.chase.entity.*
import java.time.LocalDateTime

val quests = flowOf(
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000000"),
                title = "Eine Beispielquest",
                description = Description("Dies ist eine Beispielquest", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = listOf<Solution>(Solution(SolutionDataType.TEXT, false))),
                tags = listOf(
                        Tag(
                                name = "Archäologie in Baden",
                                description = "Teil der Ausstellung Archäologie in Baden"
                        )
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = adminUser,
                creationDate = LocalDateTime.now(),
                author = adminUser
        )
)


