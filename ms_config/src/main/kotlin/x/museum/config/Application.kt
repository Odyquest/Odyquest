package x.museum.config

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

@EnableConfigServer
@SpringBootConfiguration(proxyBeanMethods = false)
/**
 * https://stackoverflow.com/questions/43653655/what-is-difference-between-importautoconfiguration-and-import
 * You would use @ImportAutoConfiguration when you don't want to enable the default autoconfiguration with
 * @EnableAutoConfiguration. As you probably know, @EnableAutoConfiguration attemps to configure beans that are
 * located on your classpath eg tomcat-embedded.jar. Whereas @ImportAutoConfiguration only runs the configuration
 * classes that you provided in the annotation.
 */
@ImportAutoConfiguration(
		classes = [
			// Spring Framework und Spring Boot
			ConfigurationPropertiesAutoConfiguration::class,
			ProjectInfoAutoConfiguration::class,
			PropertyPlaceholderAutoConfiguration::class,

			// Spring WebMVC
			DispatcherServletAutoConfiguration::class,
			EmbeddedWebServerFactoryCustomizerAutoConfiguration::class,
			HttpMessageConvertersAutoConfiguration::class,
			ServletWebServerFactoryAutoConfiguration::class,
			WebMvcAutoConfiguration::class,

			// Jackson
			JacksonAutoConfiguration::class,

			// Spring Cloud Config
			ConfigServerAutoConfiguration::class,
			LifecycleMvcEndpointAutoConfiguration::class,
			RefreshAutoConfiguration::class,
			UtilAutoConfiguration::class,

			// Spring Security
			SecurityAutoConfiguration::class,
			SecurityFilterAutoConfiguration::class,
			UserDetailsServiceAutoConfiguration::class,

			// Spring Cloud Commons
			CommonsClientAutoConfiguration::class,

			// Spring Cloud Consul
			AutoServiceRegistrationAutoConfiguration::class,
			CompositeDiscoveryClientAutoConfiguration::class,
			ConsulAutoConfiguration::class,
			ConsulAutoServiceRegistrationAutoConfiguration::class,
			ConsulCatalogWatchAutoConfiguration::class,
			ConsulServiceRegistryAutoConfiguration::class,
			ServiceRegistryAutoConfiguration::class,
			SimpleDiscoveryClientAutoConfiguration::class,

			// Actuator
			EndpointAutoConfiguration::class,
			ManagementContextAutoConfiguration::class,
			ServletManagementContextAutoConfiguration::class,
			WebEndpointAutoConfiguration::class,
			ShutdownEndpointAutoConfiguration::class,

			// i.a. ausreichend:   .\gradlew bootRun --args='--debug'
			// BeansEndpointAutoConfiguration::class,
			// MappingsEndpointAutoConfiguration::class,
		]
)

@SpringBootApplication
class Application

/**
 * Starts the config server
 * @param args Additional arguments to start the config server
 */
fun main(args: Array<String>) {
	runApplication<Application>(*args)
}
