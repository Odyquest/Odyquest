import { Component, OnInit } from '@angular/core';
import { CreateChaseDialogComponent } from '../create-chase-dialog/create-chase-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chase-selector',
  templateUrl: './chase-selector.component.html',
  styleUrls: ['./chase-selector.component.scss']
})
export class ChaseSelectorComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openCreateChaseDialog() {
    this.dialog.open(CreateChaseDialogComponent, {
      height: '',
      width: '',
    })
  }
}
