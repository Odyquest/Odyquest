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

package x.museum.user.service

import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.isEqualTo
import kotlinx.coroutines.InternalCoroutinesApi
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.InitializingBean
import org.springframework.context.ApplicationContext
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import x.museum.user.config.dev.users
import mu.KotlinLogging
import org.springframework.data.mongodb.core.*
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import reactor.core.publisher.Mono
import x.museum.user.entity.Chase
import x.museum.user.config.Settings.DEV
import x.museum.user.entity.ChaseId
import x.museum.user.entity.CustomUser
import java.util.*

@Service
class CustomUserDetailsService(
        private val mongo: ReactiveMongoOperations,
        private val passwordEncoder: PasswordEncoder,
        private val context: ApplicationContext
) : ReactiveUserDetailsService, InitializingBean {



    /*******************************************
     *                 CREATE
     *******************************************/

    /**
     * Create a new User
     * @param user The new user
     * @return The new user with generated ID.
     * @throws UsernameExistsException If the user already exists
     */
    suspend fun create(user: CustomUser): CustomUser {

        // Check if the user already exists in the db
        val userExists = mongo.query<CustomUser>()
                .asType<UsernameProj>()
                .matching(where("username").isEqualTo(user.username))
                .exists()
                .awaitFirst()

        if (userExists) throw UsernameExistsException(user.username)

        val password = passwordEncoder.encode(user.password)
        val authorities = user.authorities
                ?.map { grantedAuthority ->  SimpleGrantedAuthority(grantedAuthority.authority) }
                ?: emptyList()
        val newUser = CustomUser(
                id = UUID.randomUUID(),
                username = user.username.toLowerCase(),
                password = password,
                authorities = authorities
        )
        logger.trace { "new User: $newUser" }

        return mongo.insert<CustomUser>().oneAndAwait(newUser)
    }




    /*******************************************
     *                  READ
     *******************************************/

    override fun findByUsername(username: String?): Mono<UserDetails> {
        logger.debug { "findByUsername: $username" }
        return mongo.query<CustomUser>()
                .matching(where("username").isEqualTo(username?.toLowerCase()))
                .one()
                .cast(UserDetails::class.java)
                .doOnNext { logger.debug { "findByUsername: $it" } }
    }

    suspend fun findByUsernameAndAwait(username: String): UserDetails? = findByUsername(username).awaitFirstOrNull()


    /*******************************************
     *            Utility Functions
     *******************************************/

    @InternalCoroutinesApi
    override fun afterPropertiesSet() {
        if(context.environment.activeProfiles.contains(DEV)) return

        // TODO: Remove this!
        runBlocking {
            mongo.dropCollection<CustomUser>().awaitFirstOrNull()

            users.onEach { user -> mongo.insert<CustomUser>().oneAndAwait(user)}
                    .collect { user -> logger.warn { user } }
        }
    }

    private companion object {
        val logger = KotlinLogging.logger {}
    }
}

data class UsernameProj(val username: String)
