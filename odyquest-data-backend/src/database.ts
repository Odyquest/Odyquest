import { createConnection } from 'mongoose';

import { getMongoDbUrl } from './environment';

import { Chase, ChaseList, ChaseMetaData, Media } from './chase-model';

import { ChaseDocument } from './models/chaseDocument';
import { ChaseMetaDataSchema } from './models/chaseSchema';
import { ChaseSchema } from './models/chaseSchema';
import { MediaDocument } from './models/mediaDocument';
import { MediaSchema } from './models/mediaSchema';

const connection = createConnection(getMongoDbUrl(), { useNewUrlParser: true, useUnifiedTopology: true })

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

        // copy relevant chase data e.g. meta data
        const chase = new Chase();
        chase.copyFromChase(document);
        return chase;
      } else {
          console.log('getChase() either chase is undefined or no game element keys are available');
      }
    }).catch(error => {
      return error;
    });
  }

  /**
   * Get list of chases
   *
   * @param addNonPublished add also chases which are not published yet
   */
  getChaseList(addNonPublished=false): Promise<Array<ChaseMetaData>> {
    return ChaseModel.find().exec().then(function(item) {
      const list = new Array<ChaseMetaData>();
      for (const value in item) {
        const cmd = item[value].get('metaData');
        if (addNonPublished || cmd.published) {
          list.push(cmd);
        }
      }
      return list;
    }).catch(error => {
      return error;
    });
  }

  /**
   * create new chase entry in database
   *
   * @param chase - data to add to database
   * @return id of the new database entry
   */
  private createChase(chase: Chase): Promise<string> {
    const doc = chase as ChaseDocument;
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
        return db.createChase(chase);
      }
    }).catch(error => {
      return error;
    });
  }

  deleteChase(chaseId: string): Promise<string> {
    var db = this;
    return ChaseModel.deleteOne({_id: chaseId}).then(function(item) {
      console.log('delete chase ' + chaseId);
      console.log('delete containing media...');
      for (const media in db.getMediaInChase(chaseId)) {
        //db.deleteMedia(media);
      }
      return 'success';
    }).catch(error => {
      return error;
    });
  }

  getMediaInChase(chaseId: string): Promise<Array<string>> {
    return MediaModel.find({ _id: chaseId }).exec().then(function(item) {
      const list = new Array<string>();
      for (const value in item) {
        const media = item[value].get('_id');
        list.push(media);
      }
      return list;
    });
  }

  //  getMedia(id: string): Promise<Buffer> {
  //    return MediaModel.findOne({ _id: id }).then(function(item) {
  //      if (item && (item as MediaDocument)) {
  //        const media = (item as MediaDocument);
  //        return media.binary;
  //      }
  //    });
  //  }

  // createOrUpdateMedia(media: Media): string {
  //   const entry = new MediaModel();
  //   const doc = entry as MediaDocument;
  //   // TODO set correct attributes
  //   // TODO set correct id field
  //   media.copyToMedia(doc);
  //   entry.save();
  //   console.log("saved media document");
  //   return entry._id;
  // }

  // deleteMedia(id: string): Promise<string> {
  //   var db = this;
  //   return MediaModel.deleteOne({_id: id}).then(function(item) {
  //     console.log('delete media ' + id);
  //     return 'success';
  //   }).catch(error => {
  //     return error;
  //   });
  // }
};
