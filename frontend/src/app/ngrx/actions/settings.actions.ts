import { createAction, props } from '@ngrx/store';
import { LoginPropertyUser } from './action-models';
import {MunicipalityInfoData, PlaceIds} from '../../atomic-design/pages/sign-up/model/locations';

const actionPrefix = '[Settings Action] ';

export const setOpenWelcomeModal = createAction(
  actionPrefix + 'Set open welcome modal',
  props<{ openModal: boolean; loginPropertyUser?: LoginPropertyUser }>()
);

export const getCountriesAndCities = createAction(
  actionPrefix + 'Set get countries and cities',
  props<{ queryParam?: string }>()
);

export const getCountriesAndCitiesSuccess = createAction(
  actionPrefix + 'Set get countries and cities success',
  props<{ locations: MunicipalityInfoData[] }>()
);

export const setHomePageSelectedLocationIds = createAction(
  actionPrefix + 'Set home page selected location ids',
  props<{ placeIds: PlaceIds }>()
);

export const propertyFiltersChange = createAction(
  actionPrefix + 'Property Filters Change',
  props<{  places?: { countryId: number; cityId: number; villageId?: number }}>()
);

export const setPropertyFilters = createAction(
  actionPrefix + 'Set property filters',
  props<{
    location?: MunicipalityInfoData,
    dates?: { startDate: string, endDate: string },
    guests?: { adults: number, children: number, infants: number }
  }>()
);
