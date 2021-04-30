import { model, createConnection, Document, Model, Schema, Query } from 'mongoose';
import { Chase, ChaseList, ChaseMetaData } from './shared/models/chase';
import { Description } from './shared/models/description';
import { GameElement } from './shared/models/gameElement';
import { Narrative, NarrativeType, NarrativeStatus } from './shared/models/narrative';
import { Quest, QuestType } from './shared/models/quest';
import { LogicType } from './shared/models/solution_term';

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

//const GameElementSchema = new Schema(
//  {
//    /* attributes representing GameElement */
//    id: {type: Number, required: false },
//    version: {type: Number, required: false },
//    title: {type: String, required: false },
//    description: {type: DescriptionSchema, required: true }
//    // TODO add help
//  }, { _id: false }
//);

const NarrativeSchema = new Schema(
  {
    /* attributes representing GameElement */
    id: {type: Number, required: false },
    version: {type: Number, required: false },
    title: {type: String, required: false },
    description: {type: DescriptionSchema, required: true },
    help: {type: [DescriptionSchema], required: true},

    /* attributes representing Narrative */
    buttons: {type: [{
      name: {type: String, required: true },
      destination: {type: Number, required: true },
    }], required: true },
    narrativeType: {type: String, default: NarrativeType.Text, enum: Object.values(NarrativeType), required: true },
    narrativeStatus: {type: String, default: NarrativeStatus.Continue, enum: Object.values(NarrativeStatus), required: true },
  }, { _id: false }
);

const QuestSchema = new Schema(
  {
    /* attributes representing GameElement */
    id: {type: Number, required: false },
    version: {type: Number, required: false },
    title: {type: String, required: false },
    description: {type: DescriptionSchema, required: true },
    help: {type: [DescriptionSchema], required: true},

    /* attributes representing Quest */
    questType: {type: String, default: QuestType.Text, enum: Object.values(QuestType), required: true },
    maxTries: {type: Number, required: false },
    maxTime: {type: Date, required: false },
    displayImageFirst: {type: Boolean, required: true },
    requirementCombination: {type: {
      solutionItems: {type: [String], required: true},
      combinationMap: {type: [{
        requiredItems: {type: [Boolean], required: true},
        logicType: {type: String, default: LogicType.And, enum: Object.values(LogicType), required: true},
        destination: {type: Number, required: true},
      }], required: true},
    }, required: true }
  }, { _id: false }
);

const ChaseSchema = new Schema(
  {
    metaData: {type: ChaseMetaDataSchema, required: true },
    narrativeValues: {type: [NarrativeSchema], required: true},
    narrativeKeys: {type: [Number], required: true},
    questValues: {type: [QuestSchema], required: true},
    questKeys: {type: [Number], required: true},
    initialGameElement: {type: Number, required: true }
  }
);

/* handle inheritance in gameElementValues */
//const GameElementArray = ChaseSchema.path('gameElementValues') as Schema.Types.DocumentArray;
//const NarrativeType = GameElementArray.discriminator('Narrative', NarrativeSchema);
//const QuestType = GameElementArray.discriminator('Quest', QuestSchema);

//interface DescriptionDocument extends Description, Document {};
//interface ChaseMetaDataDocument extends ChaseMetaData, Document {};
interface ChaseDocument extends Chase, Document {
  /** list of keys stored in gameElements */
  narrativeKeys: Array<number>;
  questKeys: Array<number>;
  /** list of game elements stored in gameElements, same order as in gameElementKeys  */
  narrativeValues: Array<Narrative>;
  questValues: Array<Quest>;
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

const MediaSchema = new Schema(
  {
    chaseId: {type: String, required: true },
    name: {type: String, required: true },
    mimetype: {type: String, required: true },
    binary: {type: Buffer, required: true },
    // TODO add more
  }
)
class MediaDocument extends Document {
  chaseId: string = "";
  name: string = "";
  mimetype: string = '';
  binary: any;
  // TODO add more
};
export const MediaModel = connection.model('Media', MediaSchema);

export class Database {
  constructor() {
    console.log('Registered models: ' + connection.modelNames())
  }

  getChase(id: string): Promise<Chase> {
    return ChaseModel.findOne({_id: id}).then(function(item) {
      if (item && (item as ChaseDocument)) {
        const document = item as ChaseDocument;

        // copy chase data
        const chase = new Chase();
        chase.copyFromChase(document);
        chase.gameElements = new Map<number, GameElement>();

        // copy game elements
        for (let i = 0; i < document.narrativeKeys.length; i++) {
          const element = new Narrative();
          element.copyFromNarrative(document.narrativeValues[i]);
          chase.gameElements.set(document.narrativeKeys[i], element);
        }
        for (let i = 0; i < document.questKeys.length; i++) {
          const element:Quest = new Quest();
          element.copyFromQuest(document.questValues[i]);
          chase.gameElements.set(document.questKeys[i], element);
        }

        return chase;
      } else {
          console.log('getChase() either chase is undefined or no game element keys are available');
      }
    }).catch(error => {
      return error;
    });
  }

  getChaseList(): Promise<Array<ChaseMetaData>> {
    return ChaseModel.find().exec().then(function(item) {
      const list = new Array<ChaseMetaData>();
      for (const value in item) {
        const cmd = item[value].get('metaData');
        list.push(cmd);
      }
      return list;
    }).catch(error => {
      return error;
    });
  }

  private gameElementMapToArrays(from: Chase, to:ChaseDocument) {
    to.narrativeKeys = new Array<number>();
    to.narrativeValues = new Array<Narrative>();
    to.questKeys = new Array<number>();
    to.questValues = new Array<Quest>();
    for (let [key, value] of from.gameElements.entries()) {
      if (value instanceof Narrative) {
        to.narrativeKeys.push(key);
        to.narrativeValues.push(value as Narrative);
      } else if (value instanceof Quest) {
        to.questKeys.push(key);
        to.questValues.push(value as Quest);
      } else {
        console.log('createChase(): unknown type of game element');
      }
    }
  }

  private createChase(chase: Chase): Promise<string> {
    const doc = chase as ChaseDocument;
    this.gameElementMapToArrays(doc, doc);
    const entry = new ChaseModel(doc);
    console.log('createChase(): save with id ' + entry._id)
    entry.get('metaData').chaseId = entry._id;
    entry.save();
    return entry._id;
  }

  private updateChase(new_chase: Chase, document:ChaseDocument) {
    new_chase.copyToChase(document);
    this.gameElementMapToArrays(new_chase, document);
    document.save();
  }

  createOrUpdateChase(chase: Chase): Promise<string> {
    var db = this;
    return ChaseModel.findOne({_id: chase.metaData.chaseId}).then(function(item) {
      if (item && (item as ChaseDocument)) {
        const document = item as ChaseDocument;
        console.log('update chase ' + document.metaData.chaseId);
        db.updateChase(chase, document);
        return chase.metaData.chaseId;
      } else {
        console.log('create new chase');
        // console.log('updateChase() either chase is undefined or no game element keys are available');
        return db.createChase(chase);
      }
    }).catch(error => {
      return error;
    });
  }

  getMedia(id: string): Promise<Buffer> {
    return MediaModel.findOne({ _id: id }).then(function(item) {
      if (item && (item as MediaDocument)) {
        const media = (item as MediaDocument);
        return media.binary;
      }
    });
  }

  createMedia(chaseId: string, name: string, mimetype: string, data: Buffer): string {
    console.log("start creating media document");
    const entry = new MediaModel();
    console.log("created media document");
    const doc = entry as MediaDocument;
    doc.chaseId = chaseId;
    doc.name = name;
    doc.mimetype = mimetype;
    doc.binary = data;
    console.log("set data media document");
    entry.save();
    console.log("saved media document");
    return entry._id;
  }
};
