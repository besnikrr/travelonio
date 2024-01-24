import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core/option/option';
import { map, startWith } from 'rxjs/operators';
import { TagUpdate } from '../../model/sign-up.data';

@Component({
  selector: 'app-tags-form',
  templateUrl: './tags-form.component.html',
  styleUrls: ['./tags-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsFormComponent implements OnInit, OnChanges {
  @Input() propertyId: string;
  @Input() roomId: string | undefined;
  @Input() label = 'What else is included in this room';
  @Input() placeholder = 'Select your Amenities';
  @Input() tags: string[] = [];
  @Input() options: string[] = [];

  @Output() tagUpdated = new EventEmitter<TagUpdate>();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {}

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  @ViewChild('tagInput') tagInput: ElementRef;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.myControl.setValue('');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.tags === undefined) return this.options;

    return this.tags.length
      ? filterValue
        ? this.options.filter(
            (opt) =>
              this.tags.indexOf(opt) === -1 &&
              !opt.toLowerCase().includes(filterValue)
          )
        : this.options.filter((opt) => this.tags.indexOf(opt) === -1)
      : filterValue
      ? this.options.filter(
          (option) => !option.toLowerCase().includes(filterValue)
        )
      : this.options;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tags) {
      this.filteredOptions = new Observable((obs) =>
        obs.next(this.options.filter((opt) => this.tags.indexOf(opt) === -1))
      );
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.chipInput.inputElement;
    const value = event.value;

    if (this.notUsed(value)) {
      if ((value || '').trim()) {
        this.addTag(value);
      }
    }

    if (input) {
      input.value = '';
      this.myControl.setValue('');
      this.tagInput.nativeElement.value = '';
    }
  }

  remove(tag: string): void {
    this.deleteTag(tag);
  }

  change($event: MatOptionSelectionChange): void {
    if (($event.source.value || '').trim()) {
      if (this.notUsed($event.source.value)) {
        this.addTag($event.source.value);
      }
      this.myControl.setValue('');
      this.tagInput.nativeElement.value = '';
    }
  }

  notUsed(value: string): boolean {
    return this.tags === undefined || !this.tags.includes(value.trim());
  }

  addTag(name: string): void {
    if (name !== '') {
      this.tagUpdated.emit({
        propertyId: this.propertyId,
        roomId: this.roomId,
        tagAdded: name.trim(),
      });
    }
  }

  deleteTag(name: string): void {
    if (name !== '') {
      this.tagUpdated.emit({
        propertyId: this.propertyId,
        roomId: this.roomId,
        tagDeleted: name.trim(),
      });
    }
  }
}
