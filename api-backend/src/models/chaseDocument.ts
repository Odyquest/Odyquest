import { Document } from 'mongoose';
import { Chase, ChaseList } from 'src/shared/models/chase';
import { Narrative } from 'src/shared/models/narrative';
import { Quest } from 'src/shared/models/quest';

export interface ChaseDocument extends Chase, Document {
  /** list of keys stored in gameElements */
  narrativeKeys: Array<number>;
  questKeys: Array<number>;
  /** list of game elements stored in gameElements, same order as in gameElementKeys  */
  narrativeValues: Array<Narrative>;
  questValues: Array<Quest>;
};

interface ChaseListDocument extends ChaseList, Document {};

