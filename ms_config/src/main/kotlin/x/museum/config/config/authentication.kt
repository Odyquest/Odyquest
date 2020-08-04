package x.museum.config.config

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.core.userdetails.User

fun authentication(auth: AuthenticationManagerBuilder) {
    @Suppress("DEPRECATION")
    auth.inMemoryAuthentication()
        .withUser(
            User.withDefaultPasswordEncoder()
                .username("config")
                .password("p")
                .roles(SecurityConfig.ACTUATOR)
        )
}
