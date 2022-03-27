import { deserialize, serialize } from 'typescript-json-serializer';
import { MediaContainer, MediaFileListContainer } from './media-container';
import { AudioFile, Image, ImageFile, VideoFile } from './media';

function getTestImageContainer(): MediaContainer {
  const image = new Image();
  return new MediaContainer(image);
}
function getTestImageFileListContainer(): MediaFileListContainer {
  const files = new Array<ImageFile>();
  files.push(new ImageFile());
  return new MediaFileListContainer(files);
}
function getTestAudioFileListContainer(): MediaFileListContainer {
  const files = new Array<AudioFile>();
  files.push(new AudioFile('audio.ogg', 'audio/ogg', 48));
  return new MediaFileListContainer(files);
}
function getTestVideoFileListContainer(): MediaFileListContainer {
  const files = new Array<VideoFile>();
  files.push(new VideoFile('video.mp4', 'video/mp4', 1080));
  return new MediaFileListContainer(files);
}

describe('MediaFileListContainer', () => {
  let imageContainer = getTestImageContainer();
  let imageList = getTestImageFileListContainer();
  let audioList = getTestAudioFileListContainer();
  let videoList = getTestVideoFileListContainer();

  beforeEach(() => {
  });

  it('should be able to serialize and deserialize image container', () => {
    const serialized = serialize(imageContainer);
    const result = deserialize(serialized, MediaContainer);
    expect(result.get() instanceof Image).toBeTruthy();
  });

  it('should be able to serialize and deserialize image file list', () => {
    const serialized = serialize(imageList);
    const result = deserialize(serialized, MediaFileListContainer);
    expect(result.get().length).toEqual(1);
    expect(result.get()[0] instanceof ImageFile).toBeTruthy();
  });

  it('should be able to serialize and deserialize audio file list', () => {
    const serialized = serialize(audioList);
    const result = deserialize(serialized, MediaFileListContainer);
    expect(result.get().length).toEqual(1);
    expect(result.get()[0] instanceof AudioFile).toBeTruthy();
    const audio = result.get()[0] as AudioFile;
    expect(audio.filename).toEqual('audio.ogg');
    expect(audio.bitrate).toEqual(48);
  });

  it('should be able to serialize and deserialize video file list', () => {
    const serialized = serialize(videoList);
    const result = deserialize(serialized, MediaFileListContainer);
    expect(result.get().length).toEqual(1);
    expect(result.get()[0] instanceof VideoFile).toBeTruthy();
  });

});
