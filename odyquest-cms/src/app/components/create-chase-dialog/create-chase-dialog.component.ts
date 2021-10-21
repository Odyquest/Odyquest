import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-chase-dialog',
  templateUrl: './create-chase-dialog.component.html',
  styleUrls: ['./create-chase-dialog.component.scss']
})
export class CreateChaseDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateChaseDialogComponent>) { }

  ngOnInit(): void {
  }

  public closeDialog() {
    console.log('closeDialog')
    this.dialogRef.close()
  }

}
