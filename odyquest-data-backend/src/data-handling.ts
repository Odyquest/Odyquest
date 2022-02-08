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

export class DataHandling {
  private filehandling = new FileHandling();
  private mediahandling = new MediaHandling();

  public getChaseList(protectedAccess = false): Promise<ChaseList> {
    if (protectedAccess) {
      return this.filehandling.readProtectedChaseList();
    } else {
      return this.filehandling.readPublicChaseList();
    }
  }

  public getChase(id: string): Promise<Chase> {
    return this.filehandling.readPublicChase(id);
  }

  public getProtectedChase(id: string): Promise<Chase> {
    return this.filehandling.readProtectedChase(id);
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
    return this.filehandling.readPublicMedia(chaseId, mediaId);
  }

  public getProtectedMedia(chaseId: string, mediaId: string): Promise<Media> {
    return this.filehandling.readProtectedMedia(chaseId, mediaId);
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
      this.getProtectedMedia(chaseId, mediaId).then(media => {
        this.filehandling.writeMediaFile(chaseId, mediaId, name, data);
        if (media instanceof Image) {
          (media as Image).files.concat(
            this.mediahandling.createMultipleImageResolutions(chaseId, mediaId, name));
        } else if (media instanceof Audio) {
          const attributes = this.filehandling.getAudioAttributes(chaseId, mediaId, name);
          const file = new AudioFile(name, mimetype, 0);
          (media as Audio).files.push(file);
        } else if (media instanceof Video) {
          const attributes = this.filehandling.getVideoAttributes(chaseId, mediaId, name);
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
      this.getProtectedMedia(chaseId, mediaId).then(media => {
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
