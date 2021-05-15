import { Document } from 'mongoose';

export class MediaDocument extends Document {
  chaseId: string = "";
  name: string = "";
  mimetype: string = '';
  binary: any;
  // TODO add more
};
