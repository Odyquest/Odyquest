import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChaseStatus } from 'chase-model';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class FinishedComponent implements OnInit {
  status: ChaseStatus;
  loading = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.status = this.activatedRoute.snapshot.queryParams.status;
  }

  ngOnInit(): void {
  }

  finishedSuccessfully(): boolean {
    return this.status === ChaseStatus.Succeeded;
  }
  finishedFailure(): boolean {
    return this.status === ChaseStatus.Failed;
  }

  backToList(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigateByUrl('/list');
    }, 1500);
  }

  getPath(): string {
    return $localize`:@@pathToFinished:assets/finished.en.md`;
  }
}
