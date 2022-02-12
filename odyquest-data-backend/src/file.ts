export class File {
  mimetype: string;
  data: Buffer;

  constructor(mimetype: string, data: Buffer) {
    this.mimetype = mimetype;
    this.data = data;
  }
}

