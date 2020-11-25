package x.museum.chase.entity

import java.util.*

open class GameElement(
        val id: UUID,
        val version: Int,
        val title: String,
        val description: Description
) {

}

typealias GameElementId = UUID