import { Schema } from 'mongoose';
import { Chase, ChaseList, ChaseMetaData } from 'src/shared/models/chase';
import { DescriptionSchema } from './descriptionSchema';
import { NarrativeSchema } from './narrativeSchema';
import { QuestSchema } from './questSchema';

export const ChaseMetaDataSchema = new Schema(
  {
   chaseId: {type: String, required: true },
   version: {type: Number, required: false },
   title: {type: String, required: true },
   description: {type: String, required: false },
   preview: {
     description: {type: DescriptionSchema }
   },
   author: {type: String, required: false },
   lastEdited: {type: Date, required: false },
   creationDate: {type: Date, required: false },
   comment: {type: String, required: false }
  }
);

export const ChaseSchema = new Schema(
  {
    metaData: {type: ChaseMetaDataSchema, required: true },
    narrativeValues: {type: [NarrativeSchema], required: true},
    narrativeKeys: {type: [Number], required: true},
    questValues: {type: [QuestSchema], required: true},
    questKeys: {type: [Number], required: true},
    initialGameElement: {type: Number, required: true }
  }
);

/* handle inheritance in gameElementValues */
//const GameElementArray = ChaseSchema.path('gameElementValues') as Schema.Types.DocumentArray;
//const NarrativeType = GameElementArray.discriminator('Narrative', NarrativeSchema);
//const QuestType = GameElementArray.discriminator('Quest', QuestSchema);
