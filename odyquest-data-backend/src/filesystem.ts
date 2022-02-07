import { readFileSync,
  rm,
  constants,
  createReadStream,
  accessSync,
  writeFileSync,
  writeFile,
  existsSync,
  mkdirSync,
  readdirSync,
  rmdirSync,
  rmSync,
  statSync,
  symlinkSync,
  ReadStream
} from 'fs';
import { deserialize, serialize } from 'typescript-json-serializer';
import FileType from 'file-type';
import { Chase, ChaseList, ChaseMetaData } from './chase-model';
import { File } from './file';

function readObjectSync<T>(file: string,  type: new (...params: any[]) => T): T {
  return deserialize(JSON.parse(readFileSync(file, 'utf8')), type);
}

export function readObject<T>(file: string,  type: new (...params: any[]) => T): Promise<T> {
  return new Promise((resolve, reject) => resolve(readObjectSync<T>(file, type)));
}

export function readSpecializedObject<Parent, Child1 extends Parent, Child2 extends Parent, Child3 extends Parent, Child4 extends Parent>(
  file: string,
  child1: new (...params: any[]) => Child1,
  child2: new (...params: any[]) => Child2,
  child3: new (...params: any[]) => Child3,
  child4: new (...params: any[]) => Child4): Promise<Parent> {
    return new Promise((resolve, reject) => {
      const data = JSON.parse(readFileSync(file, 'utf8'));
      try {
        resolve(deserialize<Child1>(data, child1));
        return;
      } catch(e) {
      }
      try {
        resolve(deserialize<Child2>(data, child2));
        return;
      } catch(e) {
      }
      try {
        resolve(deserialize<Child3>(data, child3));
        return;
      } catch(e) {
      }
      try {
        resolve(deserialize<Child4>(data, child4));
        return;
      } catch(e) {
      }
      console.error("could not convert media file to specific media type");
    });
  }

export function writeObject<T>(file: string, data: T): Promise<void> {
  return new Promise((resolve, reject) => {
    writeFileSync(file, JSON.stringify(serialize(data as T)),
      { flag: "w", mode: 0o666 });
    resolve();
  });
}

export function readData(file: string): Promise<File> {
  const buffer = readFileSync(file);
  return FileType.fromBuffer(buffer).then(type => {
    return new File((type && type.mime) || '', buffer);
  });
}

export function writeData(file: string, data: Buffer): Promise<void> {
  return new Promise((resolve, reject) => {
    writeFileSync(file, data, { flag: "w", mode: 0o666 });
    resolve();
  });
}

export function hasDir(dir: string) {
  return existsSync(dir);
}
export function createDir(dir: string): void {
  mkdirSync(dir, {recursive: true});
}
export function removeDir(dir: string): void {
  rmdirSync(dir, {recursive: true});
}

export function createSymlink(target: string, file: string) {
  symlinkSync(target, file);
}

export function removeFile(file: string) {
  rmSync(file);
}

export function listDirs(prefixPath: string): string[] {
    return readdirSync(prefixPath, {encoding: 'utf8'});
}
export function listObjects<T>(prefixPath: string, suffixPath: string,  type: new (...params: any[]) => T): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const files = listDirs(prefixPath);
    //const files = readdirSync(prefixPath, {encoding: 'utf8'});
    const list = new Array<T>();
    files.forEach(file => {
      const path = prefixPath + file + '/' + suffixPath;
      try {
      accessSync(path, constants.R_OK)
        list.push(readObjectSync<T>(path , type));
      } catch(e) {
      }
    });
    resolve(list);
  });
}

export function readFilesize(file: string): number {
  return statSync(file).size;
}

export function readStream(file: string, options: any): ReadStream {
  return createReadStream(file, options);
}
