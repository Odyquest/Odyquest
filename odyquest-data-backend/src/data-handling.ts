import { Chase, ChaseList, ChaseMetaData,
  Audio, AudioFile,
  Image, ImageFile,
  Video, VideoFile,
  AugmentedReality,
  Media, MediaFile } from './chase-model';
import { getFilesystemPath } from './environment';
import { FileHandling } from './file-handling';
import { MediaHandling } from './media-handling';
import { File } from './file';
import { Access, AccessLevel } from './access';

export class DataHandling {
  private filehandling: FileHandling;
  private mediahandling: MediaHandling;

  constructor(access: Access) {
    this.filehandling = new FileHandling(access);
    this.mediahandling = new MediaHandling(access);
  }

  public getChaseList(): Promise<ChaseList> {
    return this.filehandling.readChaseList();
  }

  public getChase(id: string): Promise<Chase> {
    return this.filehandling.readChase(id);
  }

  public createOrUpdateChase(chase: Chase): Promise<string> {
    let id: string;
    if (chase.metaData.chaseId) {
      id = chase.metaData.chaseId;
    } else {
      id = this.filehandling.getFreeChaseId();
      chase.metaData.chaseId = id;
    }
    return new Promise<string>((resolve, reject) => {
      this.filehandling.writeChase(chase);
      resolve(id);
    });
  }

  public deleteChase(id: string): Promise<void> {
    return new Promise(() => {
      this.filehandling.removeChase(id);
    });
  }

  public getMedia(chaseId: string, mediaId: string): Promise<Media> {
    return this.filehandling.readMedia(chaseId, mediaId);
  }

  public createOrUpdateMedia(media: Media): Promise<Media> {
    return new Promise((resolve, reject) => {
      if (!media.mediaId) {
        media.mediaId = this.filehandling.getFreeMediaId(media.chaseId);
      }
      this.filehandling.writeMedia(media);
      resolve(media);
    });
  }

  public deleteMedia(chaseId: string, mediaId: string): Promise<void> {
    return new Promise(() => {
      this.filehandling.removeMedia(chaseId, mediaId);
    });
  }

  public getMediaFile(chaseId: string, mediaId: string, filename:string): Promise<File> {
    return this.filehandling.readMediaFile(chaseId, mediaId, filename);
  }

  public addMediaFile(chaseId: string, mediaId: string, name: string, mimetype: string, data: Buffer): Promise<Media> {
    return new Promise((resolve, reject) => {
      this.getMedia(chaseId, mediaId).then(media => {
        this.filehandling.writeMediaFile(chaseId, mediaId, name, data);
        if (media instanceof Image) {
          const list = this.mediahandling.createMultipleImageResolutions(chaseId, mediaId, name);
          list.forEach((item:ImageFile) => (media as Image).files.push(item));
          console.log('media entry has following files now: ', (media as Image).files);
        } else if (media instanceof Audio) {
          const file = new AudioFile(name, mimetype, 0);
          (media as Audio).files.push(file);
        } else if (media instanceof Video) {
          const file = new VideoFile(name, mimetype, 0);
          (media as Video).files.push(file);
        } else if (media instanceof AugmentedReality) {
          const file = new MediaFile(name);
          (media as AugmentedReality).files.push(file);
        }
        this.createOrUpdateMedia(media);
        resolve(media);
      });
    });
  }

  public deleteMediaFile(chaseId: string, mediaId: string, filename:string): Promise<Media> {
    return new Promise((resolve, reject) => {
      this.getMedia(chaseId, mediaId).then(media => {
        console.warn('Deleting media files is not yet implemented');
        // TODO delete file
        // TODO remove file from media entry
        // TODO get updated media entry
        this.createOrUpdateMedia(media);
        resolve(media);
      });
    });
  }

  public getMediaFileSize(chaseId: string, mediaId: string, filename:string): number {
    return this.filehandling.readMediaFileSize(chaseId, mediaId, filename);
  }

  public getMediaFileStream(chaseId: string, mediaId: string, filename:string, start: number, end: number): any {
    return this.filehandling.readMediaFileStream(chaseId, mediaId, filename, start, end);
  }
};
