import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  inputUrl: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onInputUrl(): void {
    console.log('input url called');
    this.inputUrl = true;
  }
}

