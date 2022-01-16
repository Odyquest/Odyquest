import { Schema } from 'mongoose';
import { Description } from '../chase-model';

/**
 * Database schema for class Description
 */
export const DescriptionSchema = new Schema(
  {
    text: {type: String, required: false },
    image: {type: {
      baseUrl: {type: String, required: false },
      alternative: {type: String, required: false },
      preview: {type: String, required: false },
      resolutions: [{type: Number, required: false  }]
    } }
  }
)

