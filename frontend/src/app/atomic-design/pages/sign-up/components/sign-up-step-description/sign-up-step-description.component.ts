import { Component, Input, OnInit } from '@angular/core';
import { signUpTexts } from './sign-up-steps-text';

@Component({
  selector: 'app-sign-up-step-description',
  templateUrl: './sign-up-step-description.component.html',
  styleUrls: ['./sign-up-step-description.component.scss']
})
export class SignUpStepDescriptionComponent implements OnInit {
  @Input() signUpJourneyStep: number;

  public signUpTexts = signUpTexts;

  constructor() {
  }

  ngOnInit(): void {
  }
}
