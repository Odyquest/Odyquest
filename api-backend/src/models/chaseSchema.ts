import { Schema } from 'mongoose';
import { Chase, ChaseList, ChaseMetaData } from 'src/shared/models/chase';
import { DescriptionSchema } from './descriptionSchema';
import { NarrativeSchema } from './narrativeSchema';
import { QuestSchema } from './questSchema';

/**
 * Database schema for class ChaseMetaData
 */
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

/**
 * Database schema for class Chase
 *
 * Separates map gameElements into Key and Value arrays, each for every GameElement specialization.
 * Separating the map is necessary to store and read the map entries from database in a type safe way.
 */
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
