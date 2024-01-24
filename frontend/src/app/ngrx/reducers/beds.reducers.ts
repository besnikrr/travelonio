import { Action, createReducer, on } from '@ngrx/store';
import { setBeds } from '../actions/beds.actions';
import { BedType } from '../../atomic-design/pages/sign-up/model/bed-type.enum';
import ApiValue = BedType.ApiValue;

export interface Bed {
  bedId: string;
  bedType: string;
  adults: number;
  children: number;
  infants: number;
  dimensions: string;
  icon: string;
}

export interface BedData {
  bedId: string;
  bedType: BedType;
  adults: number;
  children: number;
  infants: number;
  dimensions: string;
  icon: string;
}

export function mapToBedData(data: Bed): BedData {
  return {
    bedId: data.bedId,
    bedType: BedType.convertFromApiValue(data.bedType as ApiValue),
    adults: data.adults,
    children: data.children,
    infants: data.infants,
    dimensions: data.dimensions,
    icon: data.icon,
  };
}

export interface State {
  beds: BedData[] | undefined;
}

export const initialState: State = {
  beds: undefined,
};

export const reducer = createReducer<State, Action>(
  initialState,
  on(setBeds, (state, { beds }) => {
    return {
      ...state,
      beds,
    };
  })
);
