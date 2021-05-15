import { Schema } from 'mongoose';
import { Description } from 'src/shared/models/description';

export const DescriptionSchema = new Schema(
  {
    text: {type: String, required: false },
    image: {type: String, required: false }
  }
)

