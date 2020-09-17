import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Task } from '../chase';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() selection: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.task = new Task();
    this.task.title = 'Task title';
    this.task.text = 'Task text';
  }

  select(button: string): void {
    // TODO set output selection
    this.selection.emit(0);
  }

}
