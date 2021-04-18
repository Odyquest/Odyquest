import { model, createConnection, Document, Model, Schema } from 'mongoose';
import { Chase, ChaseList, ChaseMetaData } from './shared/models/chase';
import { Description } from './shared/models/description';
import { Narrative } from './shared/models/narrative';
import { Quest } from './shared/models/quest';

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

const NarrativeSchema = new Schema(
  {
    /* attributes representing GameElements */
    id: {type: Number, required: false },
    version: {type: Number, required: false },
    title: {type: String, required: false },
    description: {type: DescriptionSchema, required: true }
    // TODO add help

    /* attributes representing Narrative */
    // TODO buttons
  }
);

const QuestSchema = new Schema(
  {
    /* attributes representing GameElements */
    id: {type: Number, required: false },
    version: {type: Number, required: false },
    title: {type: String, required: false },
    description: {type: DescriptionSchema, required: true }
    // TODO add help

    /* attributes representing Quest */
    // TODO fill
  }
);

interface DescriptionDocument extends Description, Document {};
interface ChaseMetaDataDocument extends ChaseMetaData, Document {};
interface ChaseDocument extends Chase, Document {};
interface ChaseListDocument extends ChaseList, Document {};

export const connection = createConnection(`mongodb://localhost:27017/test`, { useNewUrlParser: true, useUnifiedTopology: true })

export const DescriptionModel = connection.model('Description', DescriptionSchema);
export const ChaseMetaDataModel = connection.model('ChaseMetaData', ChaseMetaDataSchema);
export const ChaseModel = connection.model('Chase', ChaseSchema);

export class Database {
  constructor() {
    console.log('Registered models: ' + connection.modelNames())
  }

  getChase(id: string): Promise<Chase> {
    return ChaseModel.findOne({_id: id}).then(item => {
      return item;
    }).catch(error => {
      return error;
    });
  }

  getChaseList(): Promise<Array<ChaseMetaData>> {
    return ChaseModel.find().then(item => {
      return item;
    }).catch(error => {
      return error;
    });
  }

  createChase(chase: Chase) {
    const entry = new ChaseModel(chase);
    console.log(entry);
    entry.save();
  }

};
