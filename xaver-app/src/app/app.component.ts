import { UiService } from './services/ui.service';
import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Entdecke eine Schnitzeljagd!';

  constructor(private uiService: UiService){
  }

  ngOnInit() {
    this.uiService.toolbarTitle.subscribe(title => {
      this.title = title;
    })
    
  }
}
