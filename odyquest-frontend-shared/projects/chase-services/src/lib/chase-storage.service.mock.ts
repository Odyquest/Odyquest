import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ChaseStatus } from 'chase-model';
import { Chase } from 'chase-model';

@Injectable({
  providedIn: 'root'
})
export class ChaseStorageServiceMock {
  runningChase = false;

  getRunningChase(): Chase | undefined {
      return new Chase();
  }

  setRunningChase(chase: Chase): void {
  }

  hasRunningChase(): boolean {
    return this.runningChase;
  }

  deleteRunningChase(): boolean {
    return true;
  }

  getCurrentPosition(): number | undefined {
    return 0;
  }

  setCurrentPosition(position: number): void {
  }

  deleteCurrentPosition(): boolean {
    return true;
  }

  getChaseStatus(chaseId: string): ChaseStatus | undefined {
    return undefined;
  }
  setChaseStatus(chaseId: string, chaseStatus: ChaseStatus): void {
  }
}

