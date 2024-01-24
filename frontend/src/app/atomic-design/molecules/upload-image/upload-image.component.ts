import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { SnackBarService } from '../../../ngrx/services/snackbar.service';
import { IMAGE_SIZE, IMAGE_TYPE } from '../../../shared/general-constants';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  public isDragOver = false;
  public showIcons = false;
  @Input() propertyId: string;
  @Output() filesAdded = new EventEmitter<File[]>();
  @Output() invalidFileExtensionsAdded = new EventEmitter<string[]>();
  @Output() overSizeFilesAdded = new EventEmitter<string[]>();
  @Output() imageUploaded = new EventEmitter<{
    propertyId: string;
    file: File;
  }>();
  @ViewChild('file', { static: true }) fileInput: ElementRef;

  constructor(
    private snackBar: SnackBarService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.showIcons = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }

  public onDragOver(): void {
    this.isDragOver = true;
  }

  public onDragLeave(): void {
    this.isDragOver = false;
  }

  public onFilesDropped(files: File[]): void {
    this.isDragOver = false;
    this.addFiles(Array.from(files));
  }

  public onInvalidFileExtensionsDropped(extensions: string[]): void {
    this.isDragOver = false;
    this.invalidFileExtensionsAdded.emit(extensions);
  }

  public overSizeFilesDropped(fileNames: string[]): void {
    this.overSizeFilesAdded.emit(fileNames);
  }

  public openFileUploadDialog(): void {
    this.fileInput.nativeElement.click();
  }

  fileChange(event): void {
    const fileList: FileList = event.target.files;
    this.addFiles(Array.from(fileList));

    this.fileInput.nativeElement.value = '';
  }

  addFiles(files: File[]): void {
    files.forEach((file) => {
      if (
        file.type !== IMAGE_TYPE.JPEG &&
        file.type !== IMAGE_TYPE.PNG &&
        file.type !== IMAGE_TYPE.JPG
      ) {
        this.snackBar.openSnackBar(
          `${file.name} is not of type JPG, JPEG or PNG!`,
          'Error'
        );
        return;
      }
      if (file.size > IMAGE_SIZE) {
        this.snackBar.openSnackBar(`${file.name} is more than 15MB!`, 'Error');
        return;
      }
      this.imageUploaded.emit({ propertyId: this.propertyId, file });
    });
  }
}
