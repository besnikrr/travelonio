import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class NotificationService {
  // Observable string sources
  private missionConfirmedSource = new Subject<boolean>();

  // Observable string streams
  termsAccepted$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  public acceptTerms(value: boolean): void {
    this.missionConfirmedSource.next(value);
  }
}
