package x.museum.chase.config.dev

import org.springframework.security.core.userdetails.MapReactiveUserDetailsService
import org.springframework.security.core.userdetails.User
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import x.museum.chase.config.security.Roles.admin

fun devUserService(): MapReactiveUserDetailsService {
    val passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder()
    val password = passwordEncoder.encode("Admin123")

    val admin = User.withUsername("admin")
            .password(password)
            .roles(admin)
            .build()

    return MapReactiveUserDetailsService(admin)
}