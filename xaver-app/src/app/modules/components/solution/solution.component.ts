import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import { Solution } from 'src/app/shared/models/solution';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit {
  @Input() solution: Solution;
  @Output() selection: EventEmitter<number> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  select(button: number): void {
    this.selection.emit(button);
  }

  getImage(): SafeResourceUrl {
     return this.sanitizer.bypassSecurityTrustUrl(this.solution.description.image);
  }

}
