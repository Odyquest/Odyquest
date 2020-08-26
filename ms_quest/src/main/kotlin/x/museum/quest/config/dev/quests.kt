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

package x.museum.quest.config.security.dev


import kotlinx.coroutines.flow.flowOf
import x.museum.quest.config.dev.adminUser
import x.museum.quest.config.dev.exampleEmployee
import x.museum.quest.entity.*
import java.time.LocalDateTime

val quests = flowOf(
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000000"),
                title = "Eine Beispielquest",
                description = Description("Hilfe, zu Hilfe! Ich, die Sphinx, wurde entführt, quasi " +
                        "ge-sphinx-nappt! Seit Jahrhunderten flattere ich durch das Schloss und mir nichts dir " +
                        "nichts kommt da jemand in weißem Kittel um die Ecke und fängt mich. Der fiese Sphinxnapper!" +
                        " Dabei hab ich gar nichts gemacht! Ich doch nicht! Bitte hilf mir!", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = emptyList<Solution>()),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000001"),
                title = "Eine Beispielquest",
                description = Description("Darf ich mich dir, meine strahlende Rettung in der Not!, vorstellen?" +
                        " Ich bin die Sphinx! Den muskulösen Körper habe ich vom Löwen, die starken, aber zarten" +
                        " Flügelchen vom Adler und mein Gesicht von deinesgleichen – dem Mensch! Deswegen bin " +
                        "ich so hübsch. Wie du… \n" +
                        "Mein größtes Hobby, eigentlich meine Berufung, ist es, Rätsel zu stellen. Wenn du alle " +
                        "Rätsel löst, kannst du mich aus den Fängen des fiesen Sphinxnappers befreien.", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = emptyList<Solution>()),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000002"),
                title = "Eine Beispielquest",
                description = Description("Um mich zu befreien, musst du zuerst das finden, was meinem Körper " +
                        "fehlt. Das befindet sich in meinem Heimatland, Ägypten. Der menschliche Kopf auf dem " +
                        "Löwenkörper stellte in Ägypten übrigens den Pharao dar, deswegen habe ich dort oft einen " +
                        "Bart. In Ägypten wache ich vor Grabmälern, Pyramiden und Tempeln. Ich beschütze die Toten. " +
                        "Ist das nicht nett? Wir Sphingen sind sehr nett.\n" +
                        "Wenn du durch das graue Tor trittst, wirst du auf der linken Seite das sehen, was meinem " +
                        "Körper eigentlich fehlt. Was ist es?", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = listOf(
                                Solution(
                                        dataType =  SolutionDataType.TEXT,
                                        fulfilled = false,
                                possibilities = listOf(
                                        "Löwenkopf",
                                        "Kopf",
                                        "Bildhauermodell",
                                        "Relief",
                                        "Kopf eines Löwen",
                                        "Kopf vom Löwen"
                                ))
                        )),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000003"),
                title = "Eine Beispielquest",
                description = Description("Richtig, du schlauer Löwe! Meinem Löwenkörper fehlt der Löwenkopf. " +
                        "Diese Platte mit dem Löwenkopf ist ein Bildhauermodell. Es war also eine Vorlage, die " +
                        "ägyptische Steinmetze benutzten, wenn sie Reliefs anfertigten. Witzigerweise sind die " +
                        "überlieferten Modelle fast immer Köpfe – tatsächlich weiß nicht einmal ich, wie die " +
                        "Bildhauer die Körper gearbeitet haben. Obwohl ich so schlau bin. " +
                        "Und gleich einem Pharao.", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = emptyList<Solution>()),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000004"),
                title = "Eine Beispielquest",
                description = Description("Den größten Ruhm habe ich mir wohl bei den alten Griechen erworben. " +
                        "Dort wohnte ich auf dem Berg Phikeon und hielt – ebenso wie in Ägypten – Wache. Brav, " +
                        "nicht? Wir Sphingen sind gute Wächter und sehr brav. In Griechenland, wie eigentlich in der " +
                        "gesamten klassischen Antike, also auch in Italien, stellte man mich übrigens so gut wie " +
                        "immer weiblich und mit Frauenköpfen dar. \n" +
                        "Findest du mich? Ich bin auf ein sehr kleines Gefäß gemalt. Gegenüber von schlauen Köpfen. " +
                        "Welche Farbe hat das Gefäßchen, auf das man mich gemalt hat?", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = listOf(
                                Solution(
                                        dataType =  SolutionDataType.TEXT,
                                        fulfilled = false,
                                        possibilities = listOf(
                                                "rot",
                                                "red"
                                        ))
                        )),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000005"),
                title = "Eine Beispielquest",
                description = Description("Bin ich nicht hübsch? Und so anmutig! Schau, wie zart geschwungen " +
                        "meine Flügel sind, wie fein meine Federn. Und wie kräftig elegant meine Hinterläufe. Und " +
                        "erst meine Frisur! Kunstvoll, nicht wahr? Und mein sanftes Lächeln, so wissend, denn ich " +
                        "bin sehr klug. Wir Sphingen sind bekannt dafür, sehr klug zu sein..", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = emptyList<Solution>()),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000006"),
                title = "Eine Beispielquest",
                description = Description("Ich war in der Antike ein beliebtes Motiv für Gefäße. Für mich " +
                        "völlig unverständlich bekam ich dort oft keine besondere Stellung, sondern werde zusammen " +
                        "mit ganz gewöhnlichen Tieren auf die Pötte gemalt. Durchschreite zwei Tore und gehe " +
                        "entlang der Grabsteine der Verstorbenen. Wenn du dann nicht nur um die Ecke denkst, " +
                        "sondern auch gehst, siehst du diese – ich möchte fast sagen – Herabsetzung meiner " +
                        "Sphingen-Besonderheit auf einer etruskischen Kanne. Was für ein Tier " +
                        "läuft vor mir?", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = listOf(
                                Solution(
                                        dataType =  SolutionDataType.TEXT,
                                        fulfilled = false,
                                        possibilities = listOf(
                                                "Vogel",
                                                "Huhn",
                                                "Gans",
                                                "Ente"
                                        ))
                        )),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000007"),
                title = "Eine Beispielquest",
                description = Description("Ja, es ist Geflügel, ist das zu fassen? Immerhin sind die anderen " +
                        "Tiere in der Reihe doch irgendwie ähnlich besonders wie wir Sphingen, ein Löwe und ein " +
                        "Panther, wahre Könige des Tierreichs. Natürlich lange nicht so besonders wie ich! " +
                        "Mit hoch erhobenem Haupte.\n" +
                        "Wir Sphingen waren bei den Etruskern als Wächter gegen Böses v.a. bei Gräbern gefragt. " +
                        "Denn wir beschützten die Toten vor dem Übel. Ich bin also sehr tapfer und " +
                        "mutig. Und hilfreich.", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = emptyList<Solution>()),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000008"),
                title = "Eine Beispielquest",
                description = Description("Als geflügelte Schutzdämonin spielte ich auch bei den alten Römern " +
                        "eine große Rolle im Begräbniskult – als Grabwächterin. Wenn du dich auf der Gräberstraße " +
                        "zwischen all den Grabsteinen und Sarkophagen näher umsiehst, findest du ein sehr schweres " +
                        "Objekt, auf dem ich – ziemlich gut getroffen in meiner Eleganz – zusammen Delphinen und " +
                        "Medusen dargestellt bin. Wie viele Bilder von mir sind es?", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = listOf(
                                Solution(
                                        dataType =  SolutionDataType.TEXT,
                                        fulfilled = false,
                                        possibilities = listOf(
                                                "XX",
                                                "xx"
                                        ))
                        )),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000009"),
                title = "Eine Beispielquest",
                description = Description("… Medusa, Sphinx, Unterwelt…", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = emptyList<Solution>()),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000010"),
                title = "Eine Beispielquest",
                description = Description("In Griechenland war ich auch als Rätselstellerin bekannt. Das " +
                        "wundert dich jetzt wahrscheinlich nicht. Ich bewachte ja den Berg Phikeon und stellte " +
                        "den Reisenden, die über den Berg gehen wollten, ein Rätsel. Wer aber mein Rätsel nicht " +
                        "beantworten konnten, den habe ich... ähm… nicht durchgelassen. So geht das ja nicht. Wir " +
                        "Sphingen sind nämlich auch sehr konsequent. \n" +
                        "Wenn du zurückgehst, woher du kamst, und dich nach dem zweiten Tor links hältst, kannst du " +
                        "das Heim einer Griechin betreten. Darin gibt es ein Objekt, das zeigt, was ich mit " +
                        "den Unwissenden tue. Einst konnte sich in diesem Objekt jeder und jede, die hineinsah, " +
                        "wiedererkennen. Wie viele Federn hat denn einer meiner Flügel hier?", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = listOf(
                                Solution(
                                        dataType =  SolutionDataType.TEXT,
                                        fulfilled = false,
                                        possibilities = listOf(
                                                "13",
                                                "dreizehn"
                                        ))
                        )),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000011"),
                title = "Eine Beispielquest",
                description = Description("Richtig, du kannst zählen! Das ist ja sehr beeindruckend. \n" +
                        "Vielleicht wunderst du dich, dass ich hier den jungen Mann angreife. Aber es ist so: Er " +
                        "konnte mein Rätsel nicht lösen! Das mag dir jetzt etwas dünnhäutig erscheinen, aber mit " +
                        "Unwissenheit kann ich einfach nicht gut umgehen… Vielleicht sind wir Sphingen ein klein " +
                        "wenig reizbar. Du brauchst hiervor aber gar keine Angst zu haben, denn du bist ja " +
                        "wahrhaft meisterlich im Rätsellösen und ich tue dir nichts. Vorerst.", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = emptyList<Solution>()),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000012"),
                title = "Eine Beispielquest",
                description = Description("Ich hatte auch ein Lieblings-Rätsel, das Reisende beantwortet " +
                        "mussten: „Was geht am Morgen auf vier Füßen, am Mittag auf zweien und am " +
                        "Abend auf dreien?“\n" +
                        "Der einzige Mensch, der das Rätsel bislang lösen konnte, war Ödipus. Dieser Ödipus… Wenn " +
                        "du ihn finden möchtest, auf seinem Stein, musst du hinunter gehen, in die Dunkelheit. " +
                        "Gehe in Richtung der römischen Provinz und dann linker Hand am Wald aus Meilensteinen " +
                        "vorbei. Ödipus, der einzige Bezwinger der mächtigen Sphinx, steht neben mir… Was halte " +
                        "ich in Händen?", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = listOf(
                                Solution(
                                        dataType =  SolutionDataType.TEXT,
                                        fulfilled = false,
                                        possibilities = listOf(
                                                "Haupt",
                                                "Kopf",
                                                "Menschenkopf",
                                                "Toter"
                                        ))
                        )),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000013"),
                title = "Eine Beispielquest",
                description = Description("Du hast Ödipus gefunden! Glückwunsch. Und ja, das ist ein Kopf in " +
                        "meiner Hand… Kuck nicht so vorwurfsvoll, bitte. Das war keine Überreaktion, der konnte" +
                        " mein Rätsel eben nicht beantworten – diese Unwissenheit! Das ertrage ich einfach nicht! " +
                        "Ab mit seinem Kopf! Wie sieht es nun eigentlich mit dir aus:\n" +
                        "„Was geht am Morgen auf vier Füßen, am Mittag auf zweien und am Abend auf dreien?“\n" +
                        "Weißt du es? Dann gehe zurück, am Wald aus Meilensteinen vorbei, dann immer geradeaus " +
                        "weiter in die Dunkelheit bis es wieder hell wird. Dort triffst du auf… den fiesen " +
                        "Sphinxnapper im weißen Kittel! Sag ihm das Lösungswort und du kannst mich " +
                        "endlich befreien!", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = listOf(
                                Solution(
                                        dataType =  SolutionDataType.TEXT,
                                        fulfilled = false,
                                        possibilities = listOf(
                                                "Mensch",
                                                "Menschen"
                                        ))
                        )),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        ),
        Quest(
                id = QuestId.fromString("00000000-0000-0000-0000-000000000014"),
                title = "Eine Beispielquest",
                description = Description("Ja, der Mensch! Und ihr Menschen seid so naiv! Selbst du, " +
                        "Meisterrätsellöser*in. Du hast mich befreit. Mich, die mächtige Sphinx, die Menschen " +
                        "frisst! Jetzt kann ich weiterflattern, Rätsel stellen und unwissende Menschen " +
                        "fressen!!! Wuahahaha!\n", null),
                requirement = Requirement(
                        fulfilled = false,
                        logicType = LogicType.OR,
                        solutions = emptyList<Solution>()),
                tags = listOf(
                        antike
                ),
                lastEdited = LocalDateTime.now(),
                lastEditor = exampleEmployee,
                creationDate = LocalDateTime.now(),
                author = exampleEmployee
        )
)


