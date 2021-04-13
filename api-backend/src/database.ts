import { model, Schema } from 'mongoose';
import { Chase, ChaseList, ChaseMetaData } from './shared/models/chase';
import { Description } from './shared/models/description';

const DescriptionSchema = new Schema(
  {
    text: {type: String, required: false },
    image: {type: String, required: false }
  }
)


const ChaseMetaDataSchema = new Schema(
  {
   id: {type: String, required: false },
   version: {type: Number, required: false },
   title: {type: String, required: false },
   description: {type: String, required: false },
   preview: {
     description: DescriptionSchema
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

interface DescriptionDocument extends Description, Document {}
interface ChaseMetaDataDocument extends ChaseMetaData, Document {}
interface ChaseDocument extends Chase, Document {}
interface ChaseListDocument extends ChaseList, Document {}

