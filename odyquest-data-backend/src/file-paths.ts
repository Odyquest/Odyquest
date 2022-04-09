import { getFilesystemPath } from './environment';
import { Access, AccessLevel } from './access';

export class Path {
  private access: Access;

  constructor(access: Access) {
    this.access = access;
  }
  public getAccessDirName(): string {
    switch (this.access.get()) {
      case AccessLevel.Protected:
        return 'protected/';
      case AccessLevel.Public:
        return 'public/';
      default:
        console.log('Access type not known')
        return '/tmp';
    }
  }

  public getChaseFolderpath(chaseId: string): string {
    return this.getChasesPrefixPath() + chaseId + '/';
  }
  public getChaseFilepath(chaseId: string): string {
    return this.getChaseFolderpath(chaseId) + this.getAccessDirName();
  }
  public getChaseFilename(chaseId: string): string {
    return 'chase.json';
  }
  public getChaseSummaryFilename(): string {
    return 'chase_summary.json';
  }
  public getChasesPrefixPath(): string {
    return getFilesystemPath() + '/chases/';
  }
  public getChaseSummarySuffixPath(): string {
    return this.getAccessDirName() + this.getChaseSummaryFilename();
  }

  public getMediaPath(chaseId: string, mediaId: string): string {
    return this.getMediaPrefixPath(chaseId) + mediaId + '/';
  }
  public getMediaFilename(): string {
    return 'media.json';
  }
  public getMediaPrefixPath(chaseId: string): string {
    return this.getChaseFilepath(chaseId) + 'media/';
  }

  public getMediaFilePath(chaseId: string, mediaId: string, filename: string): string {
    return this.getMediaPath(chaseId, mediaId) + filename;
  }
  public getMediaFileFilename(filename: string): string {
    return filename;
  }

}
