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

package x.museum.quest.entity

import x.museum.quest.config.security.CustomUser
import java.util.*

/**
 * @author [Florian Göbel](mailto:florian.goebel@outlook.de)
 */

data class Quest(

        val id: QuestId?,
        val version: Int? = null,
        val username: String?= null,
        var user: CustomUser? = null,
        val title: String,
        val description: String

) {
}

typealias QuestId = UUID
