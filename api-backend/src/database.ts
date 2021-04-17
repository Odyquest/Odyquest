import { model, createConnection, Document, Model, Schema } from 'mongoose';
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
    metaData: {type: ChaseMetaDataSchema, required: true }
  }
);

interface DescriptionDocument extends Description, Document {
  text: string|any;
  image: string|any;
};
interface ChaseMetaDataDocument extends ChaseMetaData, Document {};
interface ChaseDocument extends Chase, Document {};
interface ChaseListDocument extends ChaseList, Document {};

export const connection = createConnection(`mongodb://localhost:27017/test`, { useNewUrlParser: true, useUnifiedTopology: true })

export const DescriptionModel = connection.model('Description', DescriptionSchema);
export const ChaseMetaDataModel = connection.model('ChaseMetaData', ChaseMetaDataSchema);
export const ChaseModel = connection.model('Chase', ChaseSchema);

export class Database {
  constructor() {

    console.log(connection.modelNames())

  }

  getChase(id: string) {
    ChaseModel.find( function (err, doc) {
      if (err) { console.log(err); }
      console.log(doc);
    });
  }

  getChaseList() {
    ChaseModel.find( function (err, doc) {
      if (err) { console.log(err); }
      console.log(doc);
      //return doc;
    });
    //console.log(list);
  }

  createChase(chase: Chase) {
    const entry = new ChaseModel(chase);
    console.log(entry);
    entry.save();
  }

};
