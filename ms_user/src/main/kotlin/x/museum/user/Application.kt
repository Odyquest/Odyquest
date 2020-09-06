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

package x.museum.user

import kotlinx.coroutines.InternalCoroutinesApi
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
//import org.springframework.cloud.autoconfigure.ConfigurationPropertiesRebinderAutoConfiguration
//import org.springframework.cloud.autoconfigure.RefreshAutoConfiguration
//import org.springframework.cloud.client.CommonsClientAutoConfiguration
//import org.springframework.cloud.client.ReactiveCommonsClientAutoConfiguration
//import org.springframework.cloud.commons.util.UtilAutoConfiguration
//import org.springframework.cloud.configuration.CompatibilityVerifierAutoConfiguration
import org.springframework.boot.WebApplicationType.REACTIVE
import org.springframework.data.mongodb.config.EnableMongoAuditing
import org.springframework.hateoas.config.EnableHypermediaSupport
import x.museum.user.config.Settings.banner
import org.springframework.hateoas.config.EnableHypermediaSupport.HypermediaType.HAL
import org.springframework.hateoas.support.WebStack.WEBFLUX
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity


/**
 * https://stackoverflow.com/questions/43653655/what-is-difference-between-importautoconfiguration-and-import
 * You would use @ImportAutoConfiguration when you don't want to enable the default autoconfiguration with
 * @EnableAutoConfiguration. As you probably know, @EnableAutoConfiguration attemps to configure beans that are
 * located on your classpath eg tomcat-embedded.jar. Whereas @ImportAutoConfiguration only runs the configuration
 * classes that you provided in the annotation.
 */
@EnableHypermediaSupport(type = [HAL], stacks = [WEBFLUX])
@EnableWebFluxSecurity
@EnableMongoAuditing
@SpringBootApplication(proxyBeanMethods = false)
class Application

@InternalCoroutinesApi
fun main(args: Array<String>) {
    runApplication<Application>(*args) {
        webApplicationType = REACTIVE
        setBanner(banner)
    }
}
