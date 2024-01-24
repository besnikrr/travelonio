import { createAction, props } from '@ngrx/store';
import { BedData } from '../reducers/beds.reducers';

const actionPrefix = '[Beds actions] ';

export const getBedsRequest = createAction(actionPrefix + 'Get Beds Request');

export const setBeds = createAction(
  actionPrefix + 'Set Beds',
  props<{ beds: BedData[] }>()
);
