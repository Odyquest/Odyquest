import { Document } from 'mongoose';
import { Chase } from 'chase-model';
import { Narrative } from 'chase-model';
import { Quest } from 'chase-model';

/**
 * Database document for class Chase
 *
 * Contains additional attributes from ChaseSchema for type safe reading and writing from database.
 */
export interface ChaseDocument extends Chase, Document {
  /** list of keys stored in gameElements */
  narrativeKeys: Array<number>;
  questKeys: Array<number>;
  /** list of game elements stored in gameElements, same order as in gameElementKeys  */
  narrativeValues: Array<Narrative>;
  questValues: Array<Quest>;
};

