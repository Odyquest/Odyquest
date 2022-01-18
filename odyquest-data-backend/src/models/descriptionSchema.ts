import { Schema } from 'mongoose';
import { Description } from '../chase-model';

/**
 * Database schema for class Description
 */
export const DescriptionSchema = new Schema(
  {
    text: {type: String, required: false },
    image: {type: String, required: false }
  }
)

