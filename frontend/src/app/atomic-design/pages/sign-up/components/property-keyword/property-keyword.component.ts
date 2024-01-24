import { Component } from '@angular/core';
import { Keywords } from '../../model/keywords.enum';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  dirtyInputs,
  propertyId,
  propertyKeywords,
} from '../../../../../ngrx/selectors/properties.selectors';
import { updatePropertyRequest } from '../../../../../ngrx/actions/properties.actions';

@Component({
  selector: 'app-property-keyword',
  templateUrl: './property-keyword.component.html',
  styleUrls: ['./property-keyword.component.scss'],
})
export class PropertyKeywordComponent {
  public selectedKeywords: string[];
  public keywords = Keywords.getAllKeywords();
  public propertyId: string | undefined;
  public dirtyInputs = this.store.pipe(select(dirtyInputs));
  public subscription = new Subscription();

  constructor(private store: Store) {
    this.subscription.add(
      this.store.pipe(select(propertyKeywords)).subscribe((keywords) => {
        if (keywords) {
          this.selectedKeywords = keywords;
        }
      })
    );

    this.subscription.add(
      this.store.pipe(select(propertyId)).subscribe((id) => {
        this.propertyId = id;
      })
    );
  }

  selectKeyword(keywordId: string): void {
    if (
      this.selectedKeywords.includes(keywordId) ||
      this.selectedKeywords.length > 2
    ) {
      this.store.dispatch(
        updatePropertyRequest({
          propertyId: this.propertyId,
          data: { removeKeyword: keywordId },
        })
      );
    } else {
      this.store.dispatch(
        updatePropertyRequest({
          propertyId: this.propertyId,
          data: { addKeyword: keywordId },
        })
      );
    }
  }
}
