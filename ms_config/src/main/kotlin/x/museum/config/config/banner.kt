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

package x.museum.config.config

import org.springframework.boot.Banner
import org.springframework.boot.SpringBootVersion
import org.springframework.core.SpringVersion
import org.springframework.security.core.SpringSecurityCoreVersion

val banner = Banner { _, _, out ->
    out.println(
            """
        |   ______            _____
        |  / ____/___  ____  / __(_)___ _
        | / /   / __ \/ __ \/ /_/ / __ `/
        | \____/\____/_/ /_/_/ /_/\__, /
        |                        /____/
        |
        |Version          1.0
        |Spring Boot      ${SpringBootVersion.getVersion()}
        |Spring Security  ${SpringSecurityCoreVersion.getVersion()}
        |Spring Framework ${SpringVersion.getVersion()}
        |Kotlin           ${KotlinVersion.CURRENT}
        |OpenJDK          ${Runtime.version()} @ ${System.getProperty("java.version.date")}
        |Betriebssystem   ${System.getProperty("os.name")}
        |""".trimMargin("|")
    )
}
