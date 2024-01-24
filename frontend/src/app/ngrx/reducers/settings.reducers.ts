import { Action, createReducer, on } from '@ngrx/store';
import {
  getCountriesAndCitiesSuccess, setHomePageSelectedLocationIds,
  setOpenWelcomeModal, setPropertyFilters,
} from '../actions/settings.actions';
import {MunicipalityInfoData, PlaceIds} from '../../atomic-design/pages/sign-up/model/locations';

export interface LocationData {
  id: number;
  name: string;
  countryName: string;
}
export interface State {
  openWelcomeModal: boolean;
  locations: MunicipalityInfoData[];
  homePageSelectedPlaceIds: PlaceIds | undefined;
  propertyFilters: {
    location?: MunicipalityInfoData | undefined,
    dates?: { startDate: string, endDate: string } | undefined,
    guests?: { adults: number, children: number, infants: number } | undefined,
  };
}

export const initialState: State = {
  openWelcomeModal: false,
  locations: [],
  homePageSelectedPlaceIds: undefined,
  propertyFilters: { location: undefined, dates: undefined, guests: undefined },
};

export const reducer = createReducer<State, Action>(
  initialState,
  on(setOpenWelcomeModal, (state, { openModal }) => {
    return {
      ...state,
      openWelcomeModal: openModal,
    };
  }),

  on(getCountriesAndCitiesSuccess, (state, { locations }) => {
    return {
      ...state,
      locations,
    };
  }),

  on(setHomePageSelectedLocationIds, (state, { placeIds }) => {
    return {
      ...state,
      homePageSelectedPlaceIds: placeIds,
    };
  }),

  on(setPropertyFilters, (state, { location, dates, guests }) => {
    return {
      ...state,
      propertyFilters: {
        ...state.propertyFilters,
        location,
        dates,
        guests
      },
    };
  })
);
