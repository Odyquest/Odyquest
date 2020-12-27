import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { deserialize, serialize, JsonProperty, Serializable } from 'typescript-json-serializer';

import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { ChaseStatus } from 'src/app/core/models/chase_status';
import { Chase } from '../../shared/models/chase';

@Serializable()
class ChaseStatusList {
  @JsonProperty({
    isDictionary: true,
    onDeserialize: value => {
      console.log('deserialize status list');
      const list = new Map<string, ChaseStatus>();
      for (const v in value.list) {
        console.log('deserialize ' + v);
        list.set(v, value.list[v]);
      }
      return list;
    },
    onSerialize: value => {
      console.log('serialize status list');
      const l = new Object();
      for (const element of value.keys()) {
          console.log('serialize status of ' + element);
          l[element] = serialize(value.get(element));
      }
      console.log(JSON.stringify(l));
      return {
        list: l
      };
    }
  }) map: Map<string, ChaseStatus>;
  constructor() {
    this.map = new Map<string, ChaseStatus>();
  }

}

@Injectable({
  providedIn: 'root'
})
export class ChaseStorageService {

  constructor(private storage: LocalStorageService) { }

  getRunningChase(): Chase | undefined {
    console.log('load chase from storage');
    const j = this.storage.get('running_chase');
    if (!j) {
      return undefined;
    }
    return deserialize<Chase>(j, Chase);
  }

  setRunningChase(chase: Chase): void {
    const j = serialize(chase);
    this.storage.set('running_chase', j);
    console.log('wrote chase to storage');
  }

  hasRunningChase(): boolean {
    return !!this.getRunningChase();
  }

  deleteRunningChase(): boolean {
    return this.storage.remove('running_chase');
    return this.storage.remove('current_chase_position');
  }

  getCurrentPosition(): number | undefined {
    return this.storage.get('current_chase_position');
  }

  setCurrentPosition(position: number): void {
    this.storage.set('current_chase_position', position);
  }

  deleteCurrentPosition(): boolean {
    return this.storage.remove('running_chase');
    return this.storage.remove('current_chase_position');
  }

  getChaseStatus(chaseId: string): ChaseStatus | undefined {
    const j = this.storage.get('chase_status_list');
    const list = deserialize<ChaseStatusList>(j, ChaseStatusList);
    if (list === undefined || list === null) {
      return undefined;
    }
    return list.map.get(chaseId);
  }
  setChaseStatus(chaseId: string, chaseStatus: ChaseStatus): void {
    const j = this.storage.get('chase_status_list');
    let list = deserialize<ChaseStatusList>(j, ChaseStatusList);
    if (!list || !list.map) {
      list = new ChaseStatusList();
    }
    list.map.set(chaseId, chaseStatus);
    this.storage.set('chase_status_list', serialize(list));
  }
}

