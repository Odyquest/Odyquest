import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FinishStatus } from '../../../core/models/finish_status';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class FinishedComponent implements OnInit {
  status: FinishStatus;

  constructor(private activatedRoute: ActivatedRoute) {
    this.status = this.activatedRoute.snapshot.queryParams.status;
  }

  ngOnInit(): void {
  }

  finishedSuccessfully(): boolean {
    return this.status === FinishStatus.Success;
  }
  finishedFailure(): boolean {
    return this.status === FinishStatus.Failed;
  }
}
