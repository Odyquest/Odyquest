package x.museum.config

import x.museum.config.config.banner
import org.springframework.boot.SpringBootConfiguration
import org.springframework.boot.actuate.autoconfigure.context.ShutdownEndpointAutoConfiguration
import org.springframework.boot.actuate.autoconfigure.endpoint.EndpointAutoConfiguration
import org.springframework.boot.actuate.autoconfigure.endpoint.web.WebEndpointAutoConfiguration
import org.springframework.boot.actuate.autoconfigure.web.server.ManagementContextAutoConfiguration
import org.springframework.boot.actuate.autoconfigure.web.servlet.ServletManagementContextAutoConfiguration
import org.springframework.boot.autoconfigure.ImportAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.context.ConfigurationPropertiesAutoConfiguration
import org.springframework.boot.autoconfigure.context.PropertyPlaceholderAutoConfiguration
import org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration
import org.springframework.boot.autoconfigure.info.ProjectInfoAutoConfiguration
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration
import org.springframework.boot.autoconfigure.web.embedded.EmbeddedWebServerFactoryCustomizerAutoConfiguration
import org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration
import org.springframework.boot.autoconfigure.web.servlet.ServletWebServerFactoryAutoConfiguration
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.cloud.autoconfigure.LifecycleMvcEndpointAutoConfiguration
import org.springframework.cloud.autoconfigure.RefreshAutoConfiguration
import org.springframework.cloud.client.CommonsClientAutoConfiguration
import org.springframework.cloud.client.discovery.composite.CompositeDiscoveryClientAutoConfiguration
import org.springframework.cloud.client.discovery.simple.SimpleDiscoveryClientAutoConfiguration
import org.springframework.cloud.client.serviceregistry.AutoServiceRegistrationAutoConfiguration
import org.springframework.cloud.client.serviceregistry.ServiceRegistryAutoConfiguration
import org.springframework.cloud.commons.util.UtilAutoConfiguration
import org.springframework.cloud.config.server.EnableConfigServer
import org.springframework.cloud.config.server.config.ConfigServerAutoConfiguration

// Spring centralized configuration guide
// https://spring.io/guides/gs/centralized-configuration/#scratch

@EnableConfigServer
@SpringBootApplication
class Application

/**
 * Starts the config server
 * @param args Additional arguments to start the config server
 */
fun main(args: Array<String>) {
	runApplication<Application>(*args) {
		setBanner(banner)
		addInitializers(beans) // https://stackoverflow.com/questions/45935931/how-to-use-functional-bean-definition-kotlin-dsl-with-spring-boot-and-spring-w/46033685#46033685
	}
}
