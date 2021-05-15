import { Schema } from 'mongoose';
import { Quest, QuestType } from 'src/shared/models/quest';
import { LogicType } from 'src/shared/models/solution_term';
import { DescriptionSchema } from './descriptionSchema';

/**
 * Database schema for class Quest
 *
 * Contains the attributes of parent class GameElement.
 */
export const QuestSchema = new Schema(
  {
    /* attributes representing GameElement */
    id: {type: Number, required: false },
    version: {type: Number, required: false },
    title: {type: String, required: false },
    description: {type: DescriptionSchema, required: true },
    help: {type: [DescriptionSchema], required: true},

    /* attributes representing Quest */
    questType: {type: String, default: QuestType.Text, enum: Object.values(QuestType), required: true },
    maxTries: {type: Number, required: false },
    maxTime: {type: Date, required: false },
    displayImageFirst: {type: Boolean, required: true },
    requirementCombination: {type: {
      solutionItems: {type: [String], required: true},
      combinationMap: {type: [{
        requiredItems: {type: [Boolean], required: true},
        logicType: {type: String, default: LogicType.And, enum: Object.values(LogicType), required: true},
        destination: {type: Number, required: true},
      }], required: true},
    }, required: true }
  }, { _id: false }
);

