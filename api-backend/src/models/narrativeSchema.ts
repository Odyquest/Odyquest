import { Schema } from 'mongoose';
import { Narrative, NarrativeType, NarrativeStatus } from 'src/shared/models/narrative';
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
    narrativeType: {type: String, default: NarrativeType.Text, enum: Object.values(NarrativeType), required: true },
    narrativeStatus: {type: String, default: NarrativeStatus.Continue, enum: Object.values(NarrativeStatus), required: true },
  }, { _id: false }
);

