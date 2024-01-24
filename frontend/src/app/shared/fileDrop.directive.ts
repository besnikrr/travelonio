import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

export interface DroppedFilesInterface {
  validFiles: File[];
  invalidFileExtensions: string[];
  oversizeFiles: string[];
}

export const allowedImageTypes: string[] = ['png', 'jpg', 'jpeg', 'gif'];

// FIXME: it should not be needed to redefine the DragEvent. But jest and storybook failed without :(
interface DragEvent extends MouseEvent {
  readonly dataTransfer: DataTransfer | null;
}

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {
  @Input() allowedFileExtensions: string[] = ['png', 'jpg', 'jpeg'];
  @Output() filesDropped = new EventEmitter<File[]>();
  @Output() invalidExtensionsDropped = new EventEmitter<string[]>();
  @Output() oversizeFilesDropped = new EventEmitter<string[]>();
  @Output() dragOver = new EventEmitter<void>();
  @Output() dragLeave = new EventEmitter<void>();

  constructor() {
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.dataTransfer) {
      // NOTE: This line of code enables the transfer of files in the Drop event.
      event.dataTransfer.dropEffect = 'copy';
    }
    this.dragOver.emit();
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.dragLeave.emit();
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files: FileList = event.dataTransfer
      ? event.dataTransfer.files
      : new FileList();
    if (files.length > 0) {
      const droppedFiles: DroppedFilesInterface = extractFilesFromFileList(
        files,
        this.allowedFileExtensions,
        10485760
      );

      if (droppedFiles.validFiles.length > 0) {
        this.filesDropped.emit(droppedFiles.validFiles);
      }

      if (droppedFiles.invalidFileExtensions.length > 0) {
        this.invalidExtensionsDropped.emit(droppedFiles.invalidFileExtensions);
      }

      if (droppedFiles.oversizeFiles.length > 0) {
        this.oversizeFilesDropped.emit(droppedFiles.oversizeFiles);
      }
    }
  }
}

export function extractFilesFromFileList(
  files: FileList,
  allowedFileExtensions: string[],
  maxFileSize?: number
): DroppedFilesInterface {
  const validFiles: Array<File> = [];
  const invalidFileExtensions: Array<string> = [];
  const oversizeFiles: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    if (file) {
      // INFO: if the allowedFileExtensions array is empty it means all files are accepted
      if (
        allowedFileExtensions.length === 0
          ? true
          : allowedFileExtensions.includes(extractExtensionFromFile(file.name))
      ) {
        if (maxFileSize !== undefined && file.size > maxFileSize) {
          oversizeFiles.push(file.name);
        } else {
          validFiles.push(file);
        }
      } else {
        invalidFileExtensions.push(extractExtensionFromFile(file.name));
      }
    }
  }

  return {
    validFiles,
    invalidFileExtensions: Array.from(new Set(invalidFileExtensions)),
    oversizeFiles
  };
}

export function extractExtensionFromFile(fileName: string): string {
  const lastDotPosition = fileName.lastIndexOf('.');
  const extension = fileName.slice(lastDotPosition + 1, fileName.length);

  return extension.toLowerCase();
}
