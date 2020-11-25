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

package x.museum.chase.config.dev

import kotlinx.coroutines.flow.flowOf
import x.museum.chase.config.security.CustomUser
import x.museum.chase.entity.*
import java.time.LocalDateTime

val chases = flowOf(
        Chase(
                ChaseMetaData(
                        id = ChaseId.fromString("10000000-0000-0000-0000-000000000000"),
                        version = 1,
                        title = "Zeitreise mit Xaver",
                        description = "Eine digitale Schnitzeljagd durch das Badische Landesmuseum",
                        author = "Silke",
                        preview = Preview (
                                Description (
                                        text = "Gehe mit Xaver auf eine Zeitreise durch das Badische Landesmuseum!",
                                        image = "assets/examples/silke/images/xaver.png"
                                )
                        ),
                        lastEdited = LocalDateTime.now(),
                        creationDate = LocalDateTime.now(),
                        comment = "no comment"
                )

        )
)