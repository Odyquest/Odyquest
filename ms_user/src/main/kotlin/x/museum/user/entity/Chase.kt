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

package x.museum.user.entity


import x.museum.user.entity.CustomUser
import java.time.LocalDateTime
import java.util.*

data class Chase (
        val id: ChaseId?,
        val version: Int? = null,
        val author: CustomUser? = null,
        val title: String
) {
    companion object {
        private const val HEX_PATTERN = "[\\dA-Fa-f]"
        const val ID_PATTERN =
                "$HEX_PATTERN{8}-$HEX_PATTERN{4}-$HEX_PATTERN{4}-" +
                        "$HEX_PATTERN{4}-$HEX_PATTERN{12}"
    }
}

typealias ChaseId = UUID