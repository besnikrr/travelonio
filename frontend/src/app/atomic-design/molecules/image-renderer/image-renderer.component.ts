import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-image-renderer',
  templateUrl: './image-renderer.component.html',
  styleUrls: ['./image-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageRendererComponent implements OnInit, OnChanges {
  @Input() propertyId: string;
  @Input() roomId: string | undefined;
  @Input() imageIds: string[] = [];
  @Input() showPhotoOptions = true;
  @Input() showAllImages = false;
  @Input() horizontalImages = false;

  @Output() public setImageAsPrimaryEmitter = new EventEmitter<{
    propertyId: string;
    roomId: string | undefined;
    imageId: string;
  }>();

  @Output() public deleteImageEmitter = new EventEmitter<{
    propertyId: string;
    roomId: string | undefined;
    imageId: string;
  }>();
  public baseUrl = environment.baseUrl;

  public showOverlay: number | undefined = undefined;
  showModal = false;
  isDelete = false;
  isPrimary = false;
  imageId;
  index;
  public hidePreviousIcon = false;
  public hideNextIcon = false;
  imageBeingDeleted;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageIds']) {
      if (
        this.showModal &&
        changes['imageIds'].currentValue.length <
          changes['imageIds'].previousValue.length &&
        this.imageBeingDeleted === this.imageId
      ) {
        this.imageId = this.imageIds[0];
        this.imageBeingDeleted = undefined;
      }

      if (changes['imageIds'].currentValue.length === 0) {
        this.showModal = false;
      }
    }
  }

  setImageAsPrimary(
    propertyId: string,
    roomId: string | undefined,
    imageId: string
  ): void {
    this.isPrimary = true;
    this.setImageAsPrimaryEmitter.emit({ propertyId, roomId, imageId });
  }

  deleteImage(
    propertyId: string,
    roomId: string | undefined,
    imageId: string,
    $event: Event
  ): void {
    this.isDelete = true;
    $event.stopPropagation();
    $event.preventDefault();
    if (this.showModal) {
      this.imageBeingDeleted = imageId;
    }
    this.deleteImageEmitter.emit({ propertyId, roomId, imageId });
    this.index = this.imageIds.length - 2;
    if (this.imageId === imageId) {
      if (this.imageIds.length === 1) {
        this.onClose();
      } else {
        this.index++;
        this.previous();
      }
    }
  }

  onImageClick(imageID, index): void {
    if (!this.isDelete && !this.isPrimary) {
      this.imageId = imageID;
      this.index = index;
      this.showModal = true;
    }

    if (this.imageIds.length === 1) {
      this.hidePreviousIcon = true;
      this.hideNextIcon = true;
      return;
    }

    if (this.imageIds.length === 2 && index === 0) {
      this.hidePreviousIcon = true;
      this.hideNextIcon = false;
      return;
    }

    if (this.imageIds.length === 2 && index === 1) {
      this.hideNextIcon = true;
      this.hidePreviousIcon = false;
      return;
    }

    if (this.imageIds.length > 2) {
      if (index > 0 && index < this.imageIds.length - 1) {
        this.hidePreviousIcon = false;
        this.hideNextIcon = false;
        return;
      }
      if (index === 0) {
        this.hidePreviousIcon = true;
        this.hideNextIcon = false;
        return;
      }
      if (index === this.imageIds.length - 1) {
        this.hideNextIcon = true;
        this.hidePreviousIcon = false;
        return;
      }
    }

    this.isDelete = false;
    this.isPrimary = false;
  }

  previous(): void {
    if (this.index > 0) {
      this.index--;
      const imageId = this.imageIds.find((item, index) => index === this.index);
      this.imageId = imageId;
      if (this.imageIds[0] === this.imageId) {
        this.hidePreviousIcon = true;
      }
      if (this.imageIds.length > 1) {
        this.hideNextIcon = false;
      }
    }
  }

  next(): void {
    if (this.index < this.imageIds.length - 1) {
      this.index++;
      const imageId = this.imageIds.find((item, index) => index === this.index);
      this.imageId = imageId;

      if (this.imageIds[this.imageIds.length - 1] === this.imageId) {
        this.hideNextIcon = true;
      }
      if (this.imageIds.length > 1) {
        this.hidePreviousIcon = false;
      }
    }
  }

  onClose(): void {
    this.showModal = false;
    this.hideNextIcon = false;
    this.hidePreviousIcon = false;
  }

  public trackByFn = (index: number, item: any) => item;
}
