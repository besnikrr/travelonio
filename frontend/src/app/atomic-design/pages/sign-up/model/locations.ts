export interface Location {
  country?: string;
  city?: string;
  village?: string;
  address?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface LocationForUpdate {
  places?: {
    countryId: number;
    cityId: number;
    villageId: number;
  };
  address?: string;
  zipCode?: string;
  longitude?: number;
  latitude?: number;
}

export interface MunicipalityInfo {
  villageId: number;
  villageName: string;
  cityId: number;
  cityName: string;
  countryId: number;
  countryName: string;
}

export interface MunicipalityInfoData {
  villageId: number;
  villageName: string;
  cityId: number;
  cityName: string;
  countryId: number;
  countryName: string;
  locationDisplayName: string;
}

export function mapToMunicipalityInfo(
  data: MunicipalityInfo
): MunicipalityInfoData {
  return {
    villageId: data.villageId,
    villageName: data.villageName,
    cityId: data.cityId,
    cityName: data.cityName,
    countryId: data.countryId,
    countryName: data.countryName,
    locationDisplayName:
      data.villageId !== undefined ? data.villageName : data.cityName
  };
}

export interface PlaceIds {
  countryId: number;
  cityId: number | undefined;
  villageId: number | undefined;
}
