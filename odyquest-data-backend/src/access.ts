export enum AccessLevel {
  Public,
  Protected
}

export class Access {
  private level: AccessLevel;

  constructor(level: AccessLevel) {
    this.level = level;
  }

  get(): AccessLevel {
    return this.level;
  }
}
