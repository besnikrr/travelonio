export enum PropertyTypes {
  Hotel = 1,
  Apartment = 2,
  HomeVilla = 3,
  Other = 4,
}

const StringIsNumber = value => isNaN(Number(value)) === false;

// tslint:disable-next-line:no-namespace
export namespace PropertyTypes {
  export function getAllPropertyData(): {
    type: PropertyTypes;
    active: boolean;
  }[] {
    return [
      { type: PropertyTypes.Hotel, active: true },
      { type: PropertyTypes.Apartment, active: true },
      { type: PropertyTypes.HomeVilla, active: false },
      { type: PropertyTypes.Other, active: false }
    ];
  }

  export function getPropertyTypeAsString(): string[] {
    return Object.keys(PropertyTypes)
      .filter(StringIsNumber)
      .map(key => PropertyTypes[key]);
  }

  export function getAllPropertyTypes(): PropertyTypes[] {
    return [
      PropertyTypes.Hotel,
      PropertyTypes.Apartment,
      PropertyTypes.HomeVilla,
      PropertyTypes.Other
    ];
  }

  export function convertFromApiValue(value: string): PropertyTypes {
    switch (value) {
      case 'Hotel':
        return PropertyTypes.Hotel;
      case 'Apartment':
        return PropertyTypes.Apartment;
      default:
        return PropertyTypes.Hotel;
    }
  }

  export function getPropertyTypeNames(propertyType: PropertyTypes): string {
    switch (propertyType) {
      case PropertyTypes.Hotel:
        return $localize`Hotels, resort, B&B and more`;
      case PropertyTypes.Apartment:
        return $localize`Apartment`;
      case PropertyTypes.HomeVilla:
        return $localize`Home & Villa`;
      case PropertyTypes.Other:
        return $localize`Other (Camping, tents, etc.)`;

      default:
        return $localize`Other (Camping, tents, etc.)`;
    }
  }

  export function getPropertyTypeInfoData(propertyType: PropertyTypes): string {
    switch (propertyType) {
      case PropertyTypes.Hotel:
        return $localize`Properties with 24/7 available front desk and staff. It may include bars, restaurants, and fitness centers.`;
      case PropertyTypes.Apartment:
        return $localize`Properties that may include living rooms, kitchen, bedrooms, bathrooms, and necessary facilities.`;
      case PropertyTypes.HomeVilla:
        return $localize`Properties that may include living rooms, kitchen, bedrooms, bathrooms, and necessary facilities.`;
      case PropertyTypes.Other:
        return $localize`Properties that may include shared areas.`;
      default:
        return $localize`A property filled with kitchen, living room, bedroom and necessary amenities.`;
    }
  }

  export function toString(type: PropertyTypes): string {
    return PropertyTypes[type];
  }
}
