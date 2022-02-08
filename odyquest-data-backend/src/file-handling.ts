import { Chase, ChaseList, ChaseMetaData, Image, Media, MediaContainer } from './chase-model';
import {
  readObject,
  readSpecializedObject,
  writeObject,
  readData,
  writeData,
  readFilesize,
  readStream,
  hasDir,
  createDir,
  createSymlink,
  listObjects,
  listDirs,
  removeFile,
  removeDir
} from './filesystem';
import { File } from './file';
import { Path } from './file-paths';
import { Access, AccessLevel } from './access';

export class FileHandling {
  private access: Access;

  constructor(access: Access) {
    this.access = access
  }

  public readChase(id: string): Promise<Chase> {
    return readObject<Chase>(new Path(this.access).getChaseFilepath(id) + new Path(this.access).getChaseFilename(id), Chase);
  }

  public writeChase(chase: Chase): void {
    if (!chase.metaData.chaseId) {
      console.error("Chase has no id, can not write it!");
      return;
    }
    const id = chase.metaData.chaseId || 'undefined';
    const path = new Path(this.access).getChaseFilepath(id);
    if (!hasDir(path)) {
      console.warn("Could not find folder ", path, ", create it for adding a chase");
      createDir(path);
    }
    writeObject<Chase>(path + new Path(this.access).getChaseFilename(id), chase);
    writeObject<ChaseMetaData>(path + new Path(this.access).getChaseMetaDataFilename(), chase.metaData);
    for (const mediaId in chase.media.keys()) {
      const media = chase.media.get(mediaId);
      if (!media) {
        return;
      }
      this.writeMedia(media);
    }
    const list = listDirs(new Path(this.access).getChaseFolderpath(id));
    if (chase.metaData.published) {
      if (!list.includes(new Path(new Access(AccessLevel.Public)).getAccessDirName())) {
        console.log('publish chase, create symlink: ',
          new Path(new Access(AccessLevel.Public)).getChaseFilepath(id), '->', new Path(new Access(AccessLevel.Protected)).getAccessDirName());
        createSymlink(new Path(new Access(AccessLevel.Protected)).getAccessDirName(),
          new Path(new Access(AccessLevel.Public)).getChaseFilepath(id));
      }
    } else {
      if (list.includes(new Path(this.access).getAccessDirName())) {
        console.log('unpublish chase, remove symlink');
        removeFile(new Path(new Access(AccessLevel.Public)).getChaseFilepath(id));
      }
    }
  }

  public removeChase(chaseId: string): void {
    removeDir(new Path(this.access).getChaseFolderpath(chaseId));
  }

  public readChaseList(): Promise<ChaseList> {
    return new Promise<ChaseList>((resolve, reject) => {
      listObjects<ChaseMetaData>(new Path(this.access).getChasesPrefixPath(), new Path(this.access).getChaseMetaDataSuffixPath(), ChaseMetaData).then(list => {
        const chaseList = new ChaseList()
        chaseList.chases = list;
        resolve(chaseList);
      });
    });
  }

  public readMedia(chaseId: string, mediaId: string): Promise<Media> {
    const file = new Path(this.access).getMediaPath(chaseId, mediaId) + new Path(this.access).getMediaFilename();
    return readObject<MediaContainer>(file, MediaContainer).then(container => container.get());
  }

  public writeMedia(media: Media): void {
    console.log("writing media");
    if (!media.mediaId) {
      console.error("Media has no id, can not write it!");
      return;
    }
    const path = new Path(this.access).getMediaPath(media.chaseId, media.mediaId || '');
    if (!hasDir(path)) {
      console.warn("Could not find folder ", path, ", create it for adding media");
      createDir(path);
    }
    const file =  path + new Path(this.access).getMediaFilename();
    const container = new MediaContainer(media);
    writeObject<MediaContainer>(file, container);
  }

  public removeMedia(chaseId: string, mediaId: string): void {
    removeDir(new Path(this.access).getMediaPath(chaseId, mediaId));
  }


  public readMediaFile(chaseId: string, mediaId: string, fileId: string): Promise<File> {
    return readData(new Path(this.access).getMediaFilePath(chaseId, mediaId, fileId));
  }

  public writeMediaFile(chaseId: string, mediaId: string, fileId: string, data: Buffer): void {
    const path = new Path(this.access).getMediaPath(chaseId, mediaId);
    if (!hasDir(path)) {
      createDir(path);
      console.warn("Could not find folder ", path, ", created if for adding a media file");
    }
    writeData(path + new Path(this.access).getMediaFileFilename(fileId), data);
  }

  public readMediaFileSize(chaseId: string, mediaId: string, fileId: string): number {
    return readFilesize(new Path(this.access).getMediaFilePath(chaseId, mediaId, fileId));
  }

  public readMediaFileStream(chaseId: string, mediaId: string, fileId: string, start: number, end: number): any {
    return readStream(new Path(this.access).getMediaFilePath(chaseId, mediaId, fileId), {start, end });
  }

  private getUniqueId(): string {
    // tslint:disable-next-line:no-bitwise
    const S6 = (((1 + Math.random()) * 0x1000000) | 0).toString(16).substring(1);
    return S6;
  }

  public getFreeChaseId(): string {
    const list = listDirs(new Path(this.access).getChasesPrefixPath());
    let uuid;
    do {
      uuid = this.getUniqueId();
    } while (list.includes(uuid));
    return uuid;
  }
  public getFreeMediaId(chaseId: string): string {
    let list: string[] = [];
    try {
       list = listDirs(new Path(this.access).getMediaPrefixPath(chaseId));
    } catch (e) {
    }
    let uuid;
    do {
      uuid = this.getUniqueId();
    } while (list.includes(uuid));
    return uuid;
  }
}
