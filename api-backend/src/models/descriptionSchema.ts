import { Schema } from 'mongoose';
import { Description } from '../shared/models/description';

/**
 * Database schema for class Description
 */
export const DescriptionSchema = new Schema(
  {
    text: {type: String, required: false },
    image: {type: String, required: false }
  }
)

