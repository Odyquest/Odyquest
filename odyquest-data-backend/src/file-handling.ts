import { Chase, ChaseList, ChaseMetaData, Audio, AugmentedReality, Image, Video, Media } from './chase-model';
import { getFilesystemPath } from './environment';
import { readObject,
  readSpecializedObject,
  writeObject,
  readData,
  writeData,
  hasDir,
  createDir,
  createSymlink,
  removeFile,
  removeDir } from './filesystem';
import { File } from './file';

class Path {
  private static getPublicDirName(): string {
    return 'public/';
  }
  public static getProtectedDirName(): string {
    return 'protected/';
  }

  private static getChaseFilepath(chaseId: string): string {
    return getFilesystemPath() + '/chases/' + chaseId + '/';
  }
  public static getPublicChaseFilepath(chaseId: string): string {
    return Path.getChaseFilepath(chaseId) + Path.getPublicDirName();
  }
  public static getProtectedChaseFilepath(chaseId: string): string {
    return Path.getChaseFilepath(chaseId) + Path.getProtectedDirName();
  }
  public static getChaseFilename(chaseId: string): string {
    return 'chase.json';
  }
  public static getChaseMetaDataFilename(chaseId: string): string {
    return 'chase_meta_data.json';
  }

  public static getPublicMediaPath(chaseId: string, mediaId: string): string {
    return Path.getPublicChaseFilepath(chaseId) + 'media/' + mediaId + '/';
  }
  public static getProtectedMediaPath(chaseId: string, mediaId: string): string {
    return Path.getProtectedChaseFilepath(chaseId) + 'media/' + mediaId + '/';
  }
  public static getMediaFilename(): string {
    return 'media.json';
  }

  public static getPublicMediaFile(chaseId: string, mediaId: string, filename: string): string {
    return Path.getPublicMediaPath(chaseId, mediaId) + filename;
  }
  public static getProtectedMediaFilePath(chaseId: string, mediaId: string, filename: string): string {
    return Path.getProtectedMediaPath(chaseId, mediaId);
  }
  public static getProtectedMediaFileFilename(filename: string): string {
    return filename;
  }

}
export class FileHandling {

  public readPublicChase(id: string): Promise<Chase> {
    return readObject<Chase>(Path.getPublicChaseFilepath(id) + Path.getChaseFilename(id), Chase);
  }
  public readProtectedChase(id: string): Promise<Chase> {
    // may add hidden data to the chase
    return readObject<Chase>(Path.getProtectedChaseFilepath(id) + Path.getChaseFilename(id), Chase);
  }

  public writeChase(chase: Chase): void {
    if (!chase.metaData.chaseId) {
      console.error("Chase has no id, can not write it!");
      return;
    }
    const id = chase.metaData.chaseId || 'undefined';
    const path = Path.getProtectedChaseFilepath(id);
    if (!hasDir(path)) {
      createDir(path);
      console.warn("Could not find folder ", path, ", created if for adding a chase");
    }
    writeObject<Chase>(path + Path.getChaseFilename(id), chase);
    writeObject<ChaseMetaData>(path + Path.getChaseMetaDataFilename(id), chase.metaData);
    if (chase.metaData.published) {
      createSymlink('../' + Path.getProtectedDirName(), Path.getPublicChaseFilepath(id));
    } else {
      removeFile(Path.getPublicChaseFilepath(id));
    }
  }

  public readPublicChaseList(): Promise<ChaseList> {
    // TODO
    return new Promise<ChaseList>((resolve, reject) => {
      resolve(new ChaseList());
    });
  }
  public readProtectedChaseList(): Promise<ChaseList> {
    // TODO
    return new Promise<ChaseList>((resolve, reject) => {
      resolve(new ChaseList());
    });
  }

  public readPublicMedia(chaseId: string, mediaId: string): Promise<Media> {
    const file = Path.getPublicMediaPath(chaseId, mediaId) + Path.getMediaFilename();
    return readSpecializedObject<Media, Image, Audio, Video, AugmentedReality>(
      file, Image, Audio, Video, AugmentedReality);
  }

  public readProtectedMedia(chaseId: string, mediaId: string): Promise<Media> {
    const file = Path.getProtectedMediaPath(chaseId, mediaId) + Path.getMediaFilename();
    //return readObject<Media>(file, Image);
    return readSpecializedObject<Media, Image, Audio, Video, AugmentedReality>(
      file, Image, Audio, Video, AugmentedReality);
  }

  public writeMedia(media: Media): void {
    if (!media.mediaId) {
      console.error("Media has no id, can not write it!");
      return;
    }
    const path = Path.getProtectedMediaPath(media.chaseId, media.mediaId || '');
    if (!hasDir(path)) {
      createDir(path);
      console.warn("Could not find folder ", path, ", created if for adding media");
    }
    const file =  path + Path.getMediaFilename();
    if (media instanceof Image) {
      writeObject<Image>(file, media);
    } else if (media instanceof Audio) {
      writeObject<Audio>(file, media);
    } else if (media instanceof Video) {
      writeObject<Video>(file, media);
    } else if (media instanceof AugmentedReality) {
      writeObject<AugmentedReality>(file, media);
    }
  }

  public readMediaFile(chaseId: string, mediaId: string, fileId: string): Promise<File> {
    return readData(Path.getPublicMediaFile(chaseId, mediaId, fileId));
  }

  public writeMediaFile(chaseId: string, mediaId: string, fileId: string, data: Buffer): void {
    const path = Path.getProtectedMediaPath(chaseId, mediaId);
    if (!hasDir(path)) {
      createDir(path);
      console.warn("Could not find folder ", path, ", created if for adding a media file");
    }
    writeData(path + Path.getProtectedMediaFileFilename(fileId), data);
  }

  public getFreeChaseId(): string {
    // TODO get random id generator
    // TODO get Chase list and filter
    return 'free_id';
  }
  public getFreeMediaId(chaseId: string): string {
    // TODO get random id generator
    // TODO get chase and find
    return 'free_id';
  }
}
