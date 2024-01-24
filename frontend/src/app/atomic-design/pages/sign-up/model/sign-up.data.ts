import { PaymentMethodsForUpdate, UpdateProperty } from './models';
import { PropertyTypes } from './property-types';
import { PaymentMethods } from './paymentMethods.enum';
import { Location, LocationForUpdate } from './locations';
import { Amenities } from './amenities.enum';
import ApiValue = Amenities.ApiValue;

export interface PropertyKeywordData {
  id: string;
  icon: string;
  uniqueId: string;
}

export interface AmenitiesData {
  name: Amenities;
  option: AmenityOptions[];
}

export interface AmenitiesDataForUpdate {
  name: Amenities;
  option: AmenityOptions;
}

export interface AmenityOptions {
  name: Amenities;
  selected: boolean;
  distance?: number;
}

export interface RatePlan {
  refundable: {
    fullyRefundable: boolean;
    cancellationPolicy: number;
    pricePerNight: number;
  };
  nonRefundable: {
    setNonRefundable: boolean;
    discount: number;
    pricePerNight: number;
  };
  pricePerGroup: {
    discountPerGroup: boolean;
    discountForThree: number;
    discountForTwo: number;
    discountForOne: number;
    pricePerNight: number;
  };
  weeklyPlan: {
    setWeeklyPlan: boolean;
    discount: number;
    pricePerNight: number;
  };
}

export interface UpdateRatePlan {
  refundable?: {
    fullyRefundable?: boolean;
    cancellationPolicy?: number;
    pricePerNight?: number;
  };
  nonRefundable?: {
    setNonRefundable?: boolean;
    discount?: number;
    pricePerNight?: number;
  };
  pricePerGroup?: {
    discountPerGroup?: boolean;
    discountForThree?: number;
    discountForTwo?: number;
    discountForOne?: number;
    pricePerNight?: number;
  };
  weeklyPlan?: {
    setWeeklyPlan?: boolean;
    discount?: number;
    pricePerNight?: number;
  };
}

export interface PaymentOptions {
  payWhenBooking: {
    selected: boolean;
    upFrontPayPercentage: number;
  };
  payAtProperty: {
    selected: boolean;
    paymentMethods: {
      name: PaymentMethods;
      selected: boolean;
      value?: string;
    }[];
  };
}

export interface UpdatePaymentOptions {
  payWhenBooking?: {
    selected?: boolean;
    upFrontPayPercentage?: number;
  };
  payAtProperty?: {
    selected?: boolean;
    paymentMethods?: PaymentMethod;
  };
}

export interface PaymentMethod {
  name: PaymentMethods;
  selected?: boolean;
  value?: string;
}

export function mapToPaymentMethod(
  data: PaymentMethodsForUpdate
): PaymentMethod {
  return {
    name: data.name
      ? PaymentMethods.convertFromApiValue(data.name)
      : PaymentMethods.Other,
    selected: data.selected,
    value: data.value,
  };
}

export interface BankDetails {
  accountOwner: string;
  accountNumber: string;
  bankName: string;
  swiftCode: string;
}

export interface UpdateBankDetails {
  accountOwner?: string;
  accountNumber?: string;
  bankName?: string;
  swiftCode?: string;
}

export interface ReviewInfoData {
  name: string;
  businessAddress: string;
  propertyAddress: string;
  licenseNumber: string;
  vatNumber: string;
  businessRegistrationNumber: string;
}

export interface PropertyPoliciesData {
  breakfastIncluded: boolean;
  buyBreakfastPossibility: boolean;
  breakfastPricePerPerson: number;
  potentialGuestNumber: number;
  propertySquareSize: number;
  isRoomInsideApartment: boolean;
  staffLanguages: string[];

  smokingAllowed: boolean;
  petsAllowed: boolean;
  eventsAllowed: boolean;
  checkIn: {
    from: string;
    to: string;
  };
  checkOut: {
    from: string;
    to: string;
  };
  lateCheckout: boolean;
}

export interface UpdatePropertyPoliciesData {
  breakfastIncluded?: boolean;
  buyBreakfastPossibility?: boolean;
  breakfastPricePerPerson?: number;
  potentialGuestNumber?: number;
  propertySquareSize?: number;
  isRoomInsideApartment?: boolean;
  staffLanguages?: string[];
  smokingAllowed?: boolean;
  petsAllowed?: boolean;
  eventsAllowed?: boolean;
  checkIn?: {
    from?: string;
    to?: string;
  };
  checkOut?: {
    from?: string;
    to?: string;
  };
  lateCheckout?: boolean;
}

export interface UpdatePropertyData {
  name?: string;
  description?: string;
  propertyType?: PropertyTypes;
  breakfast?: boolean;
  breakfastPrice?: number;
  staffLanguages?: string[];
  country?: string;
  city?: string;
  postalCode?: string;
  amenity?: AmenitiesDataForUpdate;
  addKeyword?: string;
  removeKeyword?: string;
  propertyPoliciesData?: UpdatePropertyPoliciesData;
  ratePlan?: UpdateRatePlan;
  paymentOptions?: UpdatePaymentOptions;
  bankDetails?: UpdateBankDetails;
  discountForTheFirstFiveGuests?: boolean;
  readyForBooking?: boolean | undefined;
  startBookingDate?: string | undefined;
  acceptedTermAndConditions?: boolean;
  location?: LocationForUpdate;
  addTag?: string | undefined;
  removeTag?: string | undefined;
  businessInfo?: {
    name?: string;
    address?: string;
    licenseNumber?: string;
    vatNumber?: string;
    businessRegistrationNumber?: string;
  };
  amenitiesDescription?: string;
  active?: boolean;
  completed?: boolean;
}

export function mapToUpdateProperty(data: UpdatePropertyData): UpdateProperty {
  return {
    name: data.name !== undefined ? data.name : undefined,
    description: data.description !== undefined ? data.description : undefined,
    propertyType: data.propertyType
      ? PropertyTypes.toString(data.propertyType)
      : undefined,
    aminityIds: data.amenity
      ? {
          name: Amenities.convertToApiValue(data.amenity.name),
          option: {
            name: Amenities.convertToApiValue(data.amenity.option.name),
            selected: data.amenity.option.selected,
            distance: data.amenity.option.distance,
          },
        }
      : undefined,
    addKeyword: data.addKeyword ? data.addKeyword : undefined,
    removeKeyword: data.removeKeyword ? data.removeKeyword : undefined,
    propertyPoliciesData: data.propertyPoliciesData
      ? data.propertyPoliciesData
      : undefined,
    ratePlan: data.ratePlan ? data.ratePlan : undefined,
    paymentOptions: data.paymentOptions
      ? {
          ...data.paymentOptions,
          payAtProperty: data.paymentOptions.payAtProperty
            ? {
                ...data.paymentOptions.payAtProperty,
                paymentMethods: data.paymentOptions.payAtProperty.paymentMethods
                  ? mapToPaymentMethod(
                      data.paymentOptions.payAtProperty.paymentMethods
                    )
                  : undefined,
              }
            : undefined,
        }
      : undefined,
    bankDetails: data.bankDetails ? data.bankDetails : undefined,
    discountForTheFirstFiveGuests: data.discountForTheFirstFiveGuests,
    readyForBooking: data.readyForBooking,
    startBookingDate: data.startBookingDate,
    acceptedTermAndConditions: data.acceptedTermAndConditions,
    addTag: data.addTag,
    removeTag: data.removeTag,
    location: data.location ? data.location : undefined,
    businessInfo: data.businessInfo ? data.businessInfo : undefined,
    amenitiesDescription: data.amenitiesDescription,
    active: data.active,
    completed: data.completed ? data.completed : undefined,
  };
}

export interface TagUpdate {
  propertyId: string;
  roomId?: string;
  tagAdded?: string;
  tagDeleted?: string;
}

export interface BusinessInfo {
  name: string;
  address: string;
  licenseNumber: string;
  vatNumber: string;
  businessRegistrationNumber: string;
}
