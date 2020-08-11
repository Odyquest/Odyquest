package x.museum.quest.config.db

import com.mongodb.WriteConcern.ACKNOWLEDGED
import org.springframework.data.mongodb.core.WriteConcernResolver

fun writeConcernResolver() = WriteConcernResolver { ACKNOWLEDGED }