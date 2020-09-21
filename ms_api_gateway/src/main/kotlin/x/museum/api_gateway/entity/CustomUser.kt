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

package x.museum.api_gateway.entity

import org.springframework.core.convert.converter.Converter
import org.springframework.data.annotation.PersistenceConstructor
import org.springframework.data.convert.ReadingConverter
import org.springframework.data.convert.WritingConverter
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.util.ReflectionUtils.findField
import org.springframework.util.ReflectionUtils.makeAccessible
import org.springframework.util.ReflectionUtils.setField
import x.museum.user.entity.Chase
import x.museum.user.config.security.Roles
import java.util.*

class CustomUser(
        val id: UserId?,
        username: String,
        password: String,
        authorities: Collection<GrantedAuthority> = listOf(SimpleGrantedAuthority(Roles.admin))
): User(username, password, authorities) {

    @PersistenceConstructor
    constructor(
            id: UserId,
            username: String,
            password: String,
            enabled: Boolean,
            accountNonExpired: Boolean,
            credentialsNonExpired: Boolean,
            accountNonLocked: Boolean,
            authorities: Collection<GrantedAuthority>
    ) : this(id = id, username = username, password = password,authorities = authorities) {
        setFinalField("enabled", enabled)
        setFinalField("accountNonExpired", accountNonExpired)
        setFinalField("credentialsNonExpired", credentialsNonExpired)
        setFinalField("accountNonLocked", accountNonLocked)

    }



    override fun toString() =
        "CustomUser(super=${super.toString()}, id='$id')"

    private fun setFinalField(fieldName: String, value: Any) {
        val field = findField(User::class.java, fieldName) ?: return
        makeAccessible(field)
        setField(field, this, value)
    }

    @ReadingConverter
    class RoleReadConverter: Converter<String, GrantedAuthority> {
        override fun convert(role: String) = SimpleGrantedAuthority(role)
    }

    @WritingConverter
    class RoleWriteConverter : Converter<GrantedAuthority, String> {
        override fun convert(grantedAuthority: GrantedAuthority): String? = grantedAuthority.authority
    }

    companion object {
        private const val HEX_PATTERN = "[\\dA-Fa-f]"
        const val ID_PATTERN =
                "$HEX_PATTERN{8}-$HEX_PATTERN{4}-$HEX_PATTERN{4}-" +
                        "$HEX_PATTERN{4}-$HEX_PATTERN{12}"
    }
}

typealias  UserId = UUID