import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { getCurrentRouteState } from '../../../../../ngrx/reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss'],
})
export class EditPropertyComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private route: ActivatedRoute) {}

  public currentRoute: any;
  public currentStep: number;
  private subscription = new Subscription();

  ngOnInit(): void {
    this.route.params.subscribe((params) => {});
    this.subscription.add(
      this.store.pipe(select(getCurrentRouteState)).subscribe((routes) => {
        this.currentRoute = routes;
        const stepId = +this.currentRoute.state.params.stepId;
        if (isNaN(stepId)) {
          this.currentStep = 0;
        } else {
          this.currentStep = stepId;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
