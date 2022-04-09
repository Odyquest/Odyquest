import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Image } from 'chase-model';
import { RuntimeConfigurationService } from 'chase-services';

import { ChaseEditorService } from 'src/app/services/chase-editor.service';

@Component({
  selector: 'app-image-selection',
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.scss']
})
export class ImageSelectionComponent implements OnInit {

  constructor(
    private configuration: RuntimeConfigurationService,
    public chaseEditor: ChaseEditorService,
    public dialogRef: MatDialogRef<ImageSelectionComponent>,
  ) { }

  ngOnInit(): void {
  }

  getUrl(image: Image): string {
    return image.getDefaultUrl(this.configuration.getMediaUrlPrefix());
  }

  select(mediaId: string) {
    console.log("Select ", mediaId);
    this.dialogRef.close(mediaId);
  }

  getMatCardImageClass(): string {
    return 'game_element_image';
  }
}
