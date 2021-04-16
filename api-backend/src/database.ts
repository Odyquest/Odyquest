import { model, Document, Model, Schema } from 'mongoose';
import { Chase, ChaseList, ChaseMetaData } from './shared/models/chase';
//import { Description } from './shared/models/description';

interface Description extends Document {
  text: string;
  image: string;
}

const DescriptionSchema = new Schema(
  {
    text: {type: String, required: false },
    image: {type: String, required: false }
  }
)


const ChaseMetaDataSchema = new Schema(
  {
   chase_id: {type: String, required: true },
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
const ChaseSchema = new Schema(
  {
    metaData: ChaseMetaDataSchema
  }
);
const ChaseListSchema = new Schema(
  {
    chases: [ ChaseMetaDataSchema ]
  }
);

interface DescriptionDocument extends Description, Document {
  text: string|any;
  image: string|any;
  };
interface ChaseMetaDataDocument extends ChaseMetaData, Document {};
interface ChaseDocument extends Chase, Document {};
interface ChaseListDocument extends ChaseList, Document {};

const DescriptionModel: Model<DescriptionDocument> = model('Description', DescriptionSchema);
//export const DescriptionModel = model('Description', DescriptionSchema);
const ChaseMetaDataModel: Model<ChaseMetaDataDocument> = model('ChaseMetaData', ChaseMetaDataSchema);
//export const ChaseMetaDataModel = model('ChaseMetaData', ChaseMetaDataSchema);
