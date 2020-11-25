package x.museum.chase.entity

import x.museum.chase.config.security.CustomUser
import java.time.LocalDateTime

data class ChaseMetaData (
        val id: ChaseId?,
        val version: Int? = null,
        val title: String,
        val description: String,
        val preview: Preview,
        val author: String,
        val lastEdited: LocalDateTime?,
        val creationDate: LocalDateTime?,
        val comment: String?
) {

}