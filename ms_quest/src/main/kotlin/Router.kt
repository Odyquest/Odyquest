package x.museum.quest

import org.springframework.context.annotation.Bean
import org.springframework.web.reactive.function.server.coRouter // webflux

/**
 * @author [Florian Göbel](mailto:florian.goebel@outlook.de)
 */
interface Router {

    @Bean
    fun router() = coRouter {}
}