import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import * as properties from '../reducers/properties.reducers';
import { Property } from '../reducers/properties.reducers';
import {
  AmenitiesData,
  ReviewInfoData,
} from '../../atomic-design/pages/sign-up/model/sign-up.data';
import { Amenities } from '../../atomic-design/pages/sign-up/model/amenities.enum';
import ApiValue = Amenities.ApiValue;

const propertiesSelect = (state: AppState) => state.properties;

export const propertiesSelector = createSelector(
  propertiesSelect,
  (state: properties.State) => state.properties
);

export const propertySelector = createSelector(
  propertiesSelect,
  (state: properties.State) => {
    return state.property;
  }
);

export const propertyType = createSelector(propertySelector, (property) => {
  return property && property.propertyType ? property.propertyType : undefined;
});

export const propertyId = createSelector(propertySelector, (property) => {
  return property && property.propertyId ? property.propertyId : undefined;
});

export const propertyLocation = createSelector(propertySelector, (property) => {
  return property && property.location ? property.location : undefined;
});

export const propertyKeywords = createSelector(propertySelector, (property) => {
  return property && property.keywords ? property.keywords : undefined;
});

export const propertyTags = createSelector(propertySelector, (property) => {
  return property && property.tags ? property.tags : undefined;
});

export const propertyAmenities = createSelector(
  propertySelector,
  (property) => {
    return property && property.aminityIds
      ? property.aminityIds.map((a) => {
          return {
            name: Amenities.convertFromApiValue(a.name as ApiValue),
            option: a.option.map((o) => {
              return {
                name: Amenities.convertFromApiValue(o.name as ApiValue),
                selected: o.selected,
                distance: o.distance,
              };
            }),
          } as AmenitiesData;
        })
      : undefined;
  }
);

export const propertyAmenitiesDescription = createSelector(
  propertySelector,
  (property) => {
    return property && property.amenitiesDescription
      ? property.amenitiesDescription
      : undefined;
  }
);

export const propertyPoliciesData = createSelector(
  propertySelector,
  (property) => {
    return property && property.propertyPoliciesData
      ? property.propertyPoliciesData
      : undefined;
  }
);

export const propertyDescription = createSelector(
  propertySelector,
  (property) => {
    return property && property.description ? property.description : '';
  }
);

export const propertyDiscountForTheFirstFiveGuests = createSelector(
  propertySelector,
  (property) => {
    return property && property.discountForTheFirstFiveGuests
      ? property.discountForTheFirstFiveGuests
      : undefined;
  }
);

export const propertyRatePlan = createSelector(propertySelector, (property) => {
  return property && property.ratePlan ? property.ratePlan : undefined;
});

export const propertyPaymentOptions = createSelector(
  propertySelector,
  (property) => {
    return property && property.paymentOptions
      ? property.paymentOptions
      : undefined;
  }
);

export const propertyBankDetails = createSelector(
  propertySelector,
  (property) => {
    return property && property.bankDetails ? property.bankDetails : undefined;
  }
);

export const propertyReviewInfo = createSelector(
  propertySelector,
  (property) => {
    return property
      ? ({
          name: property.businessInfo.name,
          businessAddress: property.businessInfo.address,
          businessRegistrationNumber:
            property.businessInfo.businessRegistrationNumber,
          licenseNumber: property.businessInfo.licenseNumber,
          propertyAddress: property.location.address,
          vatNumber: property.businessInfo.vatNumber,
        } as ReviewInfoData)
      : undefined;
  }
);

export const propertyReadyForBooking = createSelector(
  propertySelector,
  (property) => {
    if (property && property.startBookingDate !== '') {
      const splitDate = property.startBookingDate.split('-');

      return {
        ready: property.readyForBooking,
        startDate: new Date(
          splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]
        ).toISOString(),
        termsAndConditionAccepted: property.acceptedTermAndConditions,
      };
    }

    return {
      ready: property.readyForBooking,
      startDate: '',
      termsAndConditionAccepted: property.acceptedTermAndConditions,
    };
  }
);

export const propertyPrimaryImage = createSelector(
  propertySelector,
  (property) => {
    return property ? property.imageIds[0] : undefined;
  }
);

export const publicPropertySelector = createSelector(
  propertiesSelect,
  (state: properties.State) => state.property
);

export const acceptedTermsOfSelectedPropertySelector = createSelector(
  propertySelector,
  (property: Property) =>
    property ? property.acceptedTermAndConditions : undefined
);

export const propertyListSelector = createSelector(
  propertiesSelect,
  (state: properties.State) => state.propertyList
);

export const dirtyInputs = createSelector(
  propertiesSelect,
  (state: properties.State) => state.dirtyInputs
);

export const areAllStepsCompleted = createSelector(
  propertySelector,
  (property) => {
    return property && property.completed ? property.completed : undefined;
  }
);
