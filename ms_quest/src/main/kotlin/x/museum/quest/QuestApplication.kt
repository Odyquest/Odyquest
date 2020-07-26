package x.museum.quest

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class QuestApplication

fun main(args: Array<String>) {
	runApplication<QuestApplication>(*args)
}
