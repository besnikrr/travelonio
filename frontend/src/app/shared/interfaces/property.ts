import { LocationForUpdate } from '../../atomic-design/pages/sign-up/model/locations';

export interface PropertySummaryInfo {
  propertyId: string;
  propertyType: string;
  propertyName: string;
  price: number;
  primaryImageId: string;
  location: {
    country: string;
    city: string;
    village: string;
    address: string;
    zipCode: string;
    longitude: number;
    latitude: number;
  };
  nights: number;
}

export interface Bed {
  bedId: string;
  bedQuantity: number;
  bedType: string;
}

export interface PropertyRequestData {
  propertyType?: string;
  location?: LocationForUpdate;
  checkIn?: {
    from?: string;
    to?: string;
  };
  adults?: number;
  children?: number;
  infants?: number;
}
