package x.museum.chase.entity

import java.util.*

class Narrative(val buttons: Array<XButton>, id: UUID, version: Int, title: String, description: Description)
    : GameElement(id, version, title, description) {
}