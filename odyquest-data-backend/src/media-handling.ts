import { FileHandling } from './file-handling';
import {
  Audio, AudioFile,
  Image, ImageFile,
  Video, VideoFile,
  AugmentedReality,
  Media, MediaFile
} from './chase-model';
import { Access } from './access';

export class MediaHandling {
  private filehanding: FileHandling;

  constructor(access: Access) {
    this.filehanding = new FileHandling(access);
  }

  public createMultipleImageResolutions(chaseId: string, mediaId: string, origin: string): ImageFile[] {
    const list = new Array<ImageFile>();
    // TODO implement
    list.push(new ImageFile(origin, 0));
    return list;
  }

}
