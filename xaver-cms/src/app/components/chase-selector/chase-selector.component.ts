import { Component, OnInit } from '@angular/core';
import { CreateChaseDialogComponent } from '../create-chase-dialog/create-chase-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ChaseService } from 'src/app/services/chase.service';

@Component({
  selector: 'app-chase-selector',
  templateUrl: './chase-selector.component.html',
  styleUrls: ['./chase-selector.component.scss']
})
export class ChaseSelectorComponent implements OnInit {

  constructor(private dialog: MatDialog, private chaseService: ChaseService) {}

  ngOnInit(): void {
  }

  getQuests() {
    this.chaseService.getAllChases().subscribe(chases => this.chaseService.chases.next(chases))
  }

  openCreateChaseDialog() {
    this.dialog.open(CreateChaseDialogComponent, {
      height: '',
      width: '',
    })
  }
}
