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

import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import java.util.*

// https://spring.io/guides/gs/securing-web/

class SecurityConfig : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        http
                .authorizeRequests { requests ->
                    requests
                            .antMatchers("/quest/*").authenticated()
                            .requestMatchers(EndpointRequest.to("health")).permitAll()
                            .requestMatchers(EndpointRequest.to("shutdown")).hasRole(ACTUATOR)
                }
                .httpBasic { basic ->
                    // Name der REALM = Name des Parent-Package in Grossbuchstaben, z.B. CONFIG
                    val pkgName = SecurityConfig::class.java.`package`.name
                    val parentPkgName = pkgName.substringBeforeLast('.')
                    val realm = parentPkgName
                            .substringAfterLast('.')
                            .toUpperCase(Locale.getDefault())
                    basic.realmName(realm)
                }
                .csrf { csrf -> csrf.disable() }
                .headers { headers -> headers.frameOptions().disable() }
    }

    companion object {
        const val ACTUATOR = "ACTUATOR"
    }
}