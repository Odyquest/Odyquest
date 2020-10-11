import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-submit-solution',
  templateUrl: './submit-solution.component.html',
  styleUrls: ['./submit-solution.component.scss']
})
export class SubmitSolutionComponent {

  constructor(public dialogRef: MatDialogRef<SubmitSolutionComponent>) { }

  closeDialog(): void  {
    this.dialogRef.close('Pizza!');
  }

}
