import { createConnection } from 'mongoose';

import { Chase, ChaseList, ChaseMetaData } from 'src/shared/models/chase';
import { GameElement } from 'src/shared/models/gameElement';
import { Narrative } from 'src/shared/models/narrative';
import { Quest } from 'src/shared/models/quest';

import { ChaseDocument } from './models/chaseDocument';
import { ChaseMetaDataSchema } from './models/chaseSchema';
import { ChaseSchema } from './models/chaseSchema';
import { DescriptionSchema } from './models/descriptionSchema';
import { MediaDocument } from './models/mediaDocument';
import { MediaSchema } from './models/mediaSchema';

const connection = createConnection(`mongodb://localhost:27017/test`, { useNewUrlParser: true, useUnifiedTopology: true })

const ChaseModel = connection.model('Chase', ChaseSchema);
const MediaModel = connection.model('Media', MediaSchema);

/**
 * encapsulates database connection
 */
export class Database {
  constructor() {}

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

  /**
   * convert map of game elements into arrays of specialized types
   */
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

  /**
   * create new chase entry in database
   *
   * @param chase - data to add to database
   * @return id of the new database entry
   */
  private createChase(chase: Chase): Promise<string> {
    const doc = chase as ChaseDocument;
    this.gameElementMapToArrays(doc, doc);
    const entry = new ChaseModel(doc);
    console.log('createChase(): save with id ' + entry._id)
    entry.get('metaData').chaseId = entry._id;
    entry.save();
    return entry._id;
  }

  /**
   * update chase in database
   *
   * @param new_chase - will be saved in database
   * @param document - document in database to save the given chase in
   */
  private updateChase(new_chase: Chase, document:ChaseDocument) {
    new_chase.copyToChase(document);
    this.gameElementMapToArrays(new_chase, document);
    document.save();
  }

  /**
   * creates or updates chase
   *
   * If the given chase has a valid id, the chase with this id in the database will be updated.
   * If the given chase has no id, a new database entry will be created.
   *
   * @param chase - new chase data, for updating or creating entry
   * @return id of the chase
   */
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
