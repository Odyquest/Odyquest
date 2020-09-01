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

package x.museum.quest.config.dev

import kotlinx.coroutines.flow.flowOf
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import x.museum.quest.config.security.CustomUser
import x.museum.quest.config.security.Roles.adminAuthority
import x.museum.quest.config.security.Roles.emloyeeAuthority
import java.util.*

private val passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder()
private val password = passwordEncoder.encode("Admin123")

val adminUser =
        CustomUser(
                id = UUID.fromString("10000000-0000-0000-0000-000000000000"),
                username = "admin",
                password = password,
                authorities = listOf(adminAuthority)
        )

val exampleEmployee =         CustomUser(
        id = UUID.fromString("10000000-0000-0000-0000-000000000001"),
        username = "mitarbeiterMuseum",
        password = password,
        authorities = listOf(emloyeeAuthority)
)

val users = flowOf(
        CustomUser(
                id = UUID.fromString("10000000-0000-0000-0000-000000000002"),
                username = "randomUser",
                password = password,
                authorities = listOf(emloyeeAuthority)
        )
)