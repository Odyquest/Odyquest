import { model, createConnection, Document, Model, Schema, Query } from 'mongoose';
import { Chase, ChaseList, ChaseMetaData } from './shared/models/chase';
import { Description } from './shared/models/description';
import { GameElement } from './shared/models/gameElement';
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
   chaseId: {type: String, required: true },
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

const GameElementSchema = new Schema(
  {
    id: {type: Number, required: false },
    version: {type: Number, required: false },
    title: {type: String, required: false },
    description: {type: DescriptionSchema, required: true }
    // TODO add help
  }
);

const ChaseSchema = new Schema(
  {
    metaData: {type: ChaseMetaDataSchema, required: true },
    gameElementValues: {type: [GameElementSchema], required: true},
    gameElementKeys: {type: [Number], required: true},
    initialGameElement: {type: Number, required: true }
  }
);

const NarrativeSchema = new Schema(
  {
    /* attributes representing Narrative */
    // TODO buttons
  }
);

const QuestSchema = new Schema(
  {
    /* attributes representing Quest */
    // TODO fill
  }
);

/* handle inheritance in gameElementValues */
const GameElementArray = ChaseSchema.path('gameElementValues') as Schema.Types.DocumentArray;
const NarrativeType = GameElementArray.discriminator('Narrative', NarrativeSchema);
const QuestType = GameElementArray.discriminator('Quest', QuestSchema);

interface DescriptionDocument extends Description, Document {};
interface ChaseMetaDataDocument extends ChaseMetaData, Document {};
interface ChaseDocument extends Chase, Document {
  /** list of keys stored in gameElements */
  gameElementKeys: Array<number>;
  /** list of game elements stored in gameElements, same order as in gameElementKeys  */
  gameElementValues: Array<GameElement>;
};
interface ChaseListDocument extends ChaseList, Document {};

///* set middleware: pre and post hooks (needs to be done before defining models) */
//ChaseSchema.pre<ChaseDocument>('save', function(next) {
//  next();
//});
//ChaseSchema.post<Query<ChaseDocument, ChaseDocument>>('findOne', function(next) {
//  next();
//});

export const connection = createConnection(`mongodb://localhost:27017/test`, { useNewUrlParser: true, useUnifiedTopology: true })

export const DescriptionModel = connection.model('Description', DescriptionSchema);
export const ChaseMetaDataModel = connection.model('ChaseMetaData', ChaseMetaDataSchema);
export const ChaseModel = connection.model('Chase', ChaseSchema);

export class Database {
  constructor() {
    console.log('Registered models: ' + connection.modelNames())
  }

  getChase(id: string): Promise<Chase> {
    return ChaseModel.findOne({_id: id}).then(function(item) {
      if (item && (item as ChaseDocument).gameElementKeys) {
        let chase = item as ChaseDocument
        chase.gameElements = new Map<number, GameElement>();
        for (var i = 0; i < chase.gameElementKeys.length; i++) {
          chase.gameElements.set(chase.gameElementKeys[i], chase.gameElementValues[i]);
        }
        return item;
      }
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
    console.log('there are ' + chase.gameElements.size + ' game elements');
    const doc = chase as ChaseDocument;
    doc.gameElementKeys = new Array<number>();
    doc.gameElementValues = new Array<GameElement>();
    for (let [key, value] of doc.gameElements.entries()) {
      doc.gameElementKeys.push(key);
      doc.gameElementValues.push(value);
    }
    const entry = new ChaseModel(doc);
    console.log(entry);
    entry.save();
  }

};
