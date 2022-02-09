import sharp from 'sharp';
import { FileHandling } from './file-handling';
import {
  Audio, AudioFile,
  Image, ImageFile,
  Video, VideoFile,
  AugmentedReality,
  Media, MediaFile
} from './chase-model';
import { Access } from './access';
import { Path } from './file-paths';

export class MediaHandling {
  private access: Access
  private filehanding: FileHandling;

  constructor(access: Access) {
    this.access = access;
    this.filehanding = new FileHandling(access);
  }

  public createMultipleImageResolutions(chaseId: string, mediaId: string, origin: string): ImageFile[] {
    const list = new Array<ImageFile>();
    list.push(new ImageFile(origin, 0));
    const widths: number[] = [300, 768, 1024, 1440, 1920];
    widths.forEach(width => {
      const filename = origin + '_' + width;
      sharp(new Path(this.access).getMediaFilePath(chaseId, mediaId, origin))
        .resize({ width: width })
        .toFile(new Path(this.access).getMediaFilePath(chaseId, mediaId, filename))
      .then(function(newFileInfo) {
      })
      .catch(function(err) {
        console.error("Error occured while resizing image");
      });
      list.push(new ImageFile(filename, width));
    });
    return list;
  }

}
