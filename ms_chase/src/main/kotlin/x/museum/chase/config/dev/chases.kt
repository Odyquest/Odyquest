/*
 * Copyright (C) 2020 - museum x, Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

package x.museum.chase.config.dev

import kotlinx.coroutines.flow.flowOf
import x.museum.chase.config.security.CustomUser
import x.museum.chase.entity.*
import java.time.LocalDateTime

val chases = flowOf(
        Chase(
                metaData =  ChaseMetaData(
                        id = ChaseId.fromString("10000000-0000-0000-0000-000000000000"),
                        version = 1,
                        title = "Zeitreise mit Xaver",
                        description = "Eine digitale Schnitzeljagd durch das Badische Landesmuseum",
                        author = "Silke",
                        preview = Preview(
                                Description(
                                        text = "Gehe mit Xaver auf eine Zeitreise durch das Badische Landesmuseum!",
                                        image = "assets-shared/examples/silke/images/xaver.png"
                                )
                        ),
                        lastEdited = LocalDateTime.now(),
                        creationDate = LocalDateTime.now(),
                        comment = "no comment"
                ),
                narratives = listOf(
                        mapOf(1 to Narrative(
                            id = GameElementId.fromString("20000000-0000-0000-0000-000000000000"),
                            version = 1,
                            title = "Zeitreise mit Xaver",
                            description = Description(
                                    text = "Oh nein, ich stecke völlig im Schlamassel. Ich habe mich hier im Museum umgesehen und wollte Fotos von den hübschen Kunstwerken machen, doch dabei habe ich wohl etwas falsch gemacht. Statt Fotos zu machen, habe ich irgendwie mehrere Objekte aus den verschiedenen Räumen des Museums verschwinden lassen! Keine Ahnung, wie das passieren konnte!",
                                    image = "assets-shared/examples/silke/images/xaver.png"
                            ),
                            buttons = arrayOf(
                                    XButton(
                                            name = "weiter",
                                            destination = GameElementId.fromString("20000000-0000-0000-0000-000000000001")
                                    )
                            )

                )),
                        mapOf(2 to Narrative(
                                id = GameElementId.fromString("20000000-0000-0000-0000-000000000001"),
                                version = 1,
                                title = "Zeitreise mit Xaver",
                                description = Description(
                                        text = "Oh nein, ich stecke völlig im Schlamassel. Ich habe mich hier im Museum umgesehen und wollte Fotos von den hübschen Kunstwerken machen, doch dabei habe ich wohl etwas falsch gemacht. Statt Fotos zu machen, habe ich irgendwie mehrere Objekte aus den verschiedenen Räumen des Museums verschwinden lassen! Keine Ahnung, wie das passieren konnte!",
                                        image = "assets-shared/examples/silke/images/xaver.png"
                                ),
                                buttons = arrayOf(
                                        XButton(
                                                name = "weiter",
                                                destination = GameElementId.fromString("20000000-0000-0000-0000-000000000001")
                                        )
                                )

                        ))),
                quests = listOf(
                        mapOf(9 to Quest(
                                id = GameElementId.fromString("30000000-0000-0000-0000-000000000000"),
                                version = 1,
                                title = "Zeitreise mit Xaver",
                                description = Description(
                                        "Weißt du, was es damals noch nicht gegeben hat und an der Statue des Sokrates ergänzt wurde? Nenne nur ein Wort!",
                                        image = "assets-shared/examples/silke/images/xaver.png"
                                ),
                                questType = QuestType.MULTIPLE_CHOICE,
                                maxTries = 7,
                                requirementCombination = RequirementCombination(
                                        solutionItems = arrayOf("Buch", "Bücher", "Papier"),
                                        combinationMap = arrayOf(SolutionTerm(
                                                requiredItems = arrayOf(
                                                        true,
                                                        false,
                                                        false
                                                ),
                                                logicType = LogicType.AND,
                                                destination = GameElementId.fromString("50000000-0000-0000-0000-000000000000")
                                        ),
                                        SolutionTerm(
                                                requiredItems = arrayOf(
                                                        false,
                                                        true,
                                                        false
                                                ),
                                                logicType = LogicType.AND,
                                                destination = GameElementId.fromString("60000000-0000-0000-0000-000000000000")
                                        ))
                                ),
                                displayImageFirst = false,
                                maxTime = 10,
                                help = arrayOf(Description(
                                        text = "text",
                                        image = ""
                                ))
                        ))
                ),
                solutions = listOf(
                        mapOf(10 to Solution(
                                destination = GameElementId.fromString("20000000-0000-0000-0000-000000000001"),
                                description = Description(
                                        text = "Damals gab es noch keine Bücher",
                                        image = "assets-shared/examples/silke/images/xaver.png"
                                ),
                                id = GameElementId.fromString("40000000-0000-0000-0000-000000000001"),
                                version = 1,
                                title = "Hmm tbd"
                        ))
                ),
                initialGameElement = GameElementId.fromString("10000000-0000-0000-0000-000000000001"),
                tags = listOf(Tag(
                        name = "Tag1",
                        description = "sinnvolle Beschreibung"
                ))
        )
)