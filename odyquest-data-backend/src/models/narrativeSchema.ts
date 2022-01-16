import { Schema } from 'mongoose';
import { Narrative, NarrativeType, NarrativeStatus } from '../chase-model';
import { DescriptionSchema } from './descriptionSchema';

/**
 * Database schema for class Narrative
 *
 * Contains the attributes of parent class GameElement.
 */
export const NarrativeSchema = new Schema(
  {
    /* attributes representing GameElement */
    id: {type: Number, required: false },
    version: {type: Number, required: false },
    title: {type: String, required: false },
    description: {type: DescriptionSchema, required: true },
    help: {type: [DescriptionSchema], required: true},

    /* attributes representing Narrative */
    buttons: {type: [{
      name: {type: String, required: true },
      destination: {type: Number, required: true },
    }], required: true },
    narrativeType: {
      type: String, default: NarrativeType.Text, enum: Object.values(NarrativeType), required: true
    },
    narrativeStatus: {
      type: String, default: NarrativeStatus.Continue, enum: Object.values(NarrativeStatus), required: true
    },
    media: { type: {
      audio: { type: {
        alternative: {type: String, required: true},
        baseUrl: {type: String, required: true},
        formatResolutionTuples: {type: [[Number]], required: true}
      }, required: false },
      video: { type: {
        alternative: {type: String, required: true},
        baseUrl: {type: String, required: true},
        formatResolutionTuples: {type: [[Number]], required: true}
      }, required: false },
      augmentedReality: { type: {
        alternative: {type: String, required: true},
        baseUrl: {type: String, required: true},
        formatResolutionTuples: {type: [[Number]], required: true}
      }, required: false }
    }}
  }, { _id: false }
);

