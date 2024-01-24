import { LocationForUpdate } from './locations';
import {
  UpdateBankDetails,
  UpdatePaymentOptions,
  UpdatePropertyPoliciesData,
  UpdateRatePlan,
} from './sign-up.data';

export interface UpdateProperty {
  name?: string;
  description?: string;
  propertyType?: string;
  breakfast?: boolean;
  breakfastPrice?: number;
  staffLanguages?: string[];
  postalCode?: string;
  aminityIds?: {
    name: string;
    option: {
      name: string;
      selected: boolean;
      distance?: number;
    };
  };
  addKeyword?: string;
  removeKeyword?: string;
  propertyPoliciesData?: UpdatePropertyPoliciesData;
  ratePlan?: UpdateRatePlan;
  paymentOptions?: UpdatePaymentOptions;
  bankDetails?: UpdateBankDetails;
  discountForTheFirstFiveGuests?: boolean;
  licenseNo?: string;
  vatNo?: string;
  businessNo?: string;
  readyForBooking?: boolean;
  startBookingDate?: string;
  acceptedTermAndConditions?: boolean;
  addTag?: string;
  removeTag?: string;
  location?: LocationForUpdate;
  businessName?: string;
  businessAddress?: string;
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

export interface PaymentMethodsForUpdate {
  name: string;
  selected?: boolean;
  value?: string;
}
