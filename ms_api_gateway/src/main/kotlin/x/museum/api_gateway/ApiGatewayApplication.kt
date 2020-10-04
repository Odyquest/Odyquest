package x.museum.api_gateway

import kotlinx.coroutines.InternalCoroutinesApi
//import org.springframework.boot.actuate.autoconfigure.context.ShutdownEndpointAutoConfiguration
//import org.springframework.boot.actuate.autoconfigure.endpoint.EndpointAutoConfiguration
//import org.springframework.boot.actuate.autoconfigure.health.HealthContributorAutoConfiguration
//import org.springframework.boot.actuate.autoconfigure.health.HealthEndpointAutoConfiguration
//import org.springframework.boot.actuate.autoconfigure.web.reactive.ReactiveManagementContextAutoConfiguration
//import org.springframework.boot.actuate.autoconfigure.web.server.ManagementContextAutoConfiguration
import org.springframework.boot.autoconfigure.ImportAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import x.museum.api_gateway.config.Settings.banner

//@SpringBootApplication
//@ImportAutoConfiguration(
//		classes = [
//
//			// Actuator
//			EndpointAutoConfiguration::class,
//			HealthEndpointAutoConfiguration::class,
//			HealthContributorAutoConfiguration::class,
//			ManagementContextAutoConfiguration::class,
//			ReactiveManagementContextAutoConfiguration::class,
//			ShutdownEndpointAutoConfiguration::class]
//)

@SpringBootApplication
@EnableWebFluxSecurity
class ApiGatewayApplication

@InternalCoroutinesApi
fun main(args: Array<String>) {
	runApplication<ApiGatewayApplication>(*args) {
		setBanner(banner)
		addInitializers(beans)
	}
}