import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-single-line-field',
  templateUrl: './single-line-field.component.html',
  styleUrls: ['./single-line-field.component.scss'],
})
export class SingleLineFieldComponent implements OnInit {
  @Input() initialValue: string | undefined;
  @Input() label: string | undefined;
  @Input() placeholder: string;
  @Input() required = false;
  @Input() displayEye = false;
  @Input() hideCharacters = false;
  @Input() validators = [];
  @Input() maxLength = 255;
  @Input() type = 'text';
  @Input() readOnly = false;
  @Input() symbol: string | undefined;

  @Output() onChange = new EventEmitter<string>();
  @Output() accept = new EventEmitter<string>();

  public formControl: FormControl;

  constructor() {}

  public getErrorMessage(): string {
    if (this.formControl.hasError('required')) {
      return $localize`:must enter value validation text@@musEnterValueText:You must enter a value`;
    }

    if (this.formControl.hasError('email')) {
      return $localize`:not valid email validation text@@notValidEmail:Not a valid email`;
    }

    if (
      this.formControl.errors &&
      this.formControl.errors.pattern &&
      this.formControl.errors.pattern.requiredPattern
    ) {
      if (
        this.formControl.errors.pattern.requiredPattern === '^[a-zA-Z\\s]*$'
      ) {
        return $localize`:only letters allowed validation text@@onlyLettersAllowed:Only letters allowed`;
      } else if (
        this.formControl.errors.pattern.requiredPattern === '^[0-9]*$'
      ) {
        return $localize`:only numbers allowed validation text@@onlyNumberAllowed:Only numbers allowed`;
      }
    }

    return this.formControl.hasError('email')
      ? $localize`:not valid email validation text@@notValidEmail:Not a valid email`
      : '';
  }

  public inputValueChanged(): void {
    this.onChange.emit(this.formControl.value);
  }

  ngOnInit(): void {
    this.formControl = new FormControl(this.initialValue, this.validators);
  }
}
