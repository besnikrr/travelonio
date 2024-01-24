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
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInOutComponent implements OnInit, OnChanges {
  form: FormGroup;
  today = new Date();
  @Input() selectedStartDate: string;
  @Input() selectedEndDate: string;
  @Input() showPlaceholder: boolean;
  @Input() preventDateChange = false;
  @Output() startDate = new EventEmitter<string>();
  @Output() endDate = new EventEmitter<string>();
  private subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      start: new FormControl(null),
      end: new FormControl(null),
    });
    this.subscription.add(
      this.form.valueChanges.subscribe((ctrl) => {
        this.startDate.emit(moment(ctrl.start).format('DD-MM-YYYY'));
        this.endDate.emit(moment(ctrl.end).format('DD-MM-YYYY'));
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if (changes['selectedStartDate'] && this.selectedStartDate) {
        const d = this.selectedStartDate.split('-');
        const date = d[2] + '-' + d[1] + '-' + d[0];

        this.form.get('start').setValue(moment(new Date(date)).toDate());
      }
      if (changes['selectedEndDate'] && this.selectedEndDate) {
        const d = this.selectedEndDate.split('-');
        const date = d[2] + '-' + d[1] + '-' + d[0];

        this.form.get('end').setValue(moment(new Date(date)).toDate());
      }
    });
  }
}
