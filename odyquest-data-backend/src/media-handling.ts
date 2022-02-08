import { FileHandling } from './file-handling';
import {
  Audio, AudioFile,
  Image, ImageFile,
  Video, VideoFile,
  AugmentedReality,
  Media, MediaFile
} from './chase-model';

export class MediaHandling {
  private filehanding = new FileHandling();

  public createMultipleImageResolutions(chaseId: string, mediaId: string, origin: string): ImageFile[] {
    const list = new Array<ImageFile>();
    // TODO implement
    list.push(new ImageFile(origin, 0));
    return list;
  }

}
