package x.museum.quest.entity

import java.util.*

/**
 * [Florian Göbel](mailto:florian.goebel@outlook.de)
 */

data class Quest(

        val id: QuestId?,
        val version: Int? = null,
        val title: String,
        val description: String

) {
}

typealias QuestId = UUID
