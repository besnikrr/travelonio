import { Action, createReducer, on } from '@ngrx/store';
import {
  addProperty,
  addPropertyImageId,
  deleteAPropertyImage,
  deleteProperty,
  markPropertyInputsDirty,
  setProperties,
  setProperty,
  setPropertyList,
  updateProperty,
} from '../actions/properties.actions';
import { PropertyTypes } from '../../atomic-design/pages/sign-up/model/property-types';
import { logoutPropertyUserSuccess } from '../actions/property-user.actions';
import {
  BankDetails,
  BusinessInfo,
  PaymentOptions,
  PropertyPoliciesData,
  RatePlan,
} from '../../atomic-design/pages/sign-up/model/sign-up.data';
import { Location } from 'src/app/atomic-design/pages/sign-up/model/locations';
import { PropertySummaryInfo } from '../../shared/interfaces/property';
import { Room } from './rooms.reducers';

export interface Property {
  rooms: Room[];
  propertyId: string;
  propertyType: PropertyTypes | undefined;
  name: string | undefined;
  imageIds: string[];
  keywords: string[];
  description: string;
  aminityIds: {
    name: string;
    option: {
      name: string;
      selected: boolean;
      distance?: number;
    }[];
  }[];
  propertyPoliciesData: PropertyPoliciesData;
  ratePlan: RatePlan;
  paymentOptions: PaymentOptions;
  bankDetails: BankDetails;
  discountForTheFirstFiveGuests: boolean;
  readyForBooking: boolean | undefined;
  startBookingDate: string | undefined;
  acceptedTermAndConditions: boolean;
  location: Location;
  tags: string[];
  updatedAt: string;
  businessInfo: BusinessInfo;
  amenitiesDescription: string;
  active: boolean;
  completed: boolean | undefined;
}

export interface State {
  properties: Property[] | undefined;
  property: Property | undefined;
  propertyList: PropertySummaryInfo[] | undefined;
  dirtyInputs: boolean;
}

export const initialState: State = {
  properties: undefined,
  property: undefined,
  propertyList: undefined,
  dirtyInputs: false,
};

export const reducer = createReducer<State, Action>(
  initialState,
  on(setProperties, (state, { properties }) => {
    return {
      ...state,
      properties,
    };
  }),
  on(setPropertyList, (state, { properties }) => {
    return {
      ...state,
      propertyList: properties,
    };
  }),
  on(setProperty, (state, { property }) => {
    return {
      ...state,
      property,
    };
  }),
  on(addProperty, (state, { property }) => {
    return {
      ...state,
      properties: state.properties
        ? [...state.properties, property]
        : [property],
    };
  }),
  on(updateProperty, (state, { propertyId, updatedProperty }) => {
    return {
      ...state,
      property: updatedProperty,
      properties: state.properties
        ? state.properties.map((oldProperty) => {
            if (oldProperty.propertyId === propertyId) {
              return {
                ...updatedProperty,
              };
            }
            return oldProperty;
          })
        : undefined,
    };
  }),
  on(addPropertyImageId, (state, { propertyId, imageId }) => ({
    ...state,
    property: {
      ...state.property,
      imageIds: state.property.imageIds
        ? [...state.property.imageIds, imageId]
        : [],
    },
    properties: state.properties
      ? state.properties.map((property) => {
          if (property.propertyId === propertyId) {
            return { ...property, imageIds: [...property.imageIds, imageId] };
          }
          return property;
        })
      : [],
  })),
  on(deleteAPropertyImage, (state, { propertyId, roomId, imageId }) => ({
    ...state,
    property: {
      ...state.property,
      imageIds: state.property.imageIds.filter((id) => id !== imageId),
    },
    properties: state.properties
      ? state.properties.map((property) => {
          if (property.propertyId === propertyId) {
            return {
              ...property,
              imageIds: property.imageIds.filter((id) => id !== imageId),
            };
          }
          return property;
        })
      : [],
  })),
  on(logoutPropertyUserSuccess, (state) => ({
    ...state,
    properties: undefined,
    property: undefined,
  })),

  on(deleteProperty, (state, { propertyId }) => {
    return {
      ...state,
      properties: state.properties
        ? state.properties.filter((p) => p.propertyId !== propertyId)
        : undefined,
    };
  }),
  on(markPropertyInputsDirty, (state, { setTo }) => {
    return {
      ...state,
      dirtyInputs: setTo,
    };
  })
);
