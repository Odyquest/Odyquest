package x.museum.chase.entity

class SolutionTerm(
        val requiredItems: Array<Boolean>,
        val logicType: LogicType,
        val destination: GameElementId
) {
}