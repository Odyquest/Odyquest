import { Document } from 'mongoose';

export class MediaDocument extends Document {
  /** id of the chase to which the document is connected */
  chaseId: string = "";
  /** user readable name of the stored file */
  name: string = "";
  /** mime type of the file */
  mimetype: string = '';
  /** actual binary data of the file */
  binary: any;
};
