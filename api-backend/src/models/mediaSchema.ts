import { Schema } from 'mongoose';

export const MediaSchema = new Schema(
  {
    chaseId: {type: String, required: true },
    name: {type: String, required: true },
    mimetype: {type: String, required: true },
    binary: {type: Buffer, required: true },
    // TODO add more
  }
)
