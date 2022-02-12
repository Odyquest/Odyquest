import { UiService } from './core/services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Entdecke eine Schnitzeljagd!';

  constructor(private uiService: UiService){
  }

  ngOnInit(): void {
    this.uiService.toolbarTitle.subscribe(title => {
      this.title = title;
    });
  }
}
