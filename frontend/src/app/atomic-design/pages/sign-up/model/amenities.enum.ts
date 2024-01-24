import { AmenitiesData } from './sign-up.data';

export enum Amenities {
  Accessibility,
  Elevator,
  Ramps,
  ChildrenFamilyEntertainment,
  OutdoorPlayground,
  IndoorPlayground,
  SportFacilities,
  ChildCare,
  DiningAndDrinking,
  Restaurant,
  Bar,
  RoomService,
  EntertainmentAndLeisure,
  SwimmingPool,
  OutdoorSittingArea,
  Hiking,
  Parking,
  FreeParking,
  ParkingAgainstFee,
  PrivateParking,
  PublicParking,
  Surroundings,
  BeachFront,
  BeachCloseBy,
  Mountains,
  CityCenterClose,
  OtherMonuments,
}

export namespace Amenities {
  export type ApiValue =
    | 'Accessbility'
    | 'Elevator'
    | 'Ramps (accessible with wheelchair or stroller)'
    | 'Children & Family Entertainment'
    | 'Outdoor playground'
    | 'Indoor playground'
    | 'Sport facilities'
    | 'Child Care'
    | 'Dining and Drinking'
    | 'Restaurant'
    | 'Bar'
    | 'Room service'
    | 'Entertainment and Leisure'
    | 'Swimming pool'
    | 'Outdoor sitting area, park in property'
    | 'Hiking, jogging routes'
    | 'Parking'
    | 'Free parking at property'
    | 'Parking against a fee - Add hourly/ Daily rate'
    | 'Private parking near by'
    | 'Public parking near by'
    | 'Surroundings'
    | 'Beach front'
    | 'Beach close by'
    | 'Mountains'
    | 'City center close by'
    | 'Other monuments (please specify)';

  export function convertFromApiValue(value: ApiValue): Amenities {
    switch (value) {
      case 'Accessbility':
        return Amenities.Accessibility;
      case 'Elevator':
        return Amenities.Elevator;
      case 'Ramps (accessible with wheelchair or stroller)':
        return Amenities.Ramps;
      case 'Children & Family Entertainment':
        return Amenities.ChildrenFamilyEntertainment;
      case 'Outdoor playground':
        return Amenities.OutdoorPlayground;
      case 'Indoor playground':
        return Amenities.IndoorPlayground;
      case 'Sport facilities':
        return Amenities.SportFacilities;
      case 'Child Care':
        return Amenities.ChildCare;
      case 'Dining and Drinking':
        return Amenities.DiningAndDrinking;
      case 'Restaurant':
        return Amenities.Restaurant;
      case 'Bar':
        return Amenities.Bar;
      case 'Room service':
        return Amenities.RoomService;
      case 'Entertainment and Leisure':
        return Amenities.EntertainmentAndLeisure;
      case 'Swimming pool':
        return Amenities.SwimmingPool;
      case 'Outdoor sitting area, park in property':
        return Amenities.OutdoorSittingArea;
      case 'Hiking, jogging routes':
        return Amenities.Hiking;
      case 'Parking':
        return Amenities.Parking;
      case 'Free parking at property':
        return Amenities.FreeParking;
      case 'Parking against a fee - Add hourly/ Daily rate':
        return Amenities.ParkingAgainstFee;
      case 'Private parking near by':
        return Amenities.PrivateParking;
      case 'Public parking near by':
        return Amenities.PublicParking;
      case 'Surroundings':
        return Amenities.Surroundings;
      case 'Beach front':
        return Amenities.BeachFront;
      case 'Beach close by':
        return Amenities.BeachCloseBy;
      case 'Mountains':
        return Amenities.Mountains;
      case 'City center close by':
        return Amenities.CityCenterClose;
      case 'Other monuments (please specify)':
        return Amenities.OtherMonuments;

      default:
        return Amenities.OtherMonuments;
    }
  }

  export function convertToApiValue(value: Amenities): ApiValue {
    switch (value) {
      case Amenities.Accessibility:
        return 'Accessbility';
      case Amenities.Elevator:
        return 'Elevator';
      case Amenities.Ramps:
        return 'Ramps (accessible with wheelchair or stroller)';
      case Amenities.ChildrenFamilyEntertainment:
        return 'Children & Family Entertainment';
      case Amenities.OutdoorPlayground:
        return 'Outdoor playground';
      case Amenities.IndoorPlayground:
        return 'Indoor playground';
      case Amenities.SportFacilities:
        return 'Sport facilities';
      case Amenities.ChildCare:
        return 'Child Care';
      case Amenities.DiningAndDrinking:
        return 'Dining and Drinking';
      case Amenities.Restaurant:
        return 'Restaurant';
      case Amenities.Bar:
        return 'Bar';
      case Amenities.RoomService:
        return 'Room service';
      case Amenities.EntertainmentAndLeisure:
        return 'Entertainment and Leisure';
      case Amenities.SwimmingPool:
        return 'Swimming pool';
      case Amenities.OutdoorSittingArea:
        return 'Outdoor sitting area, park in property';
      case Amenities.Hiking:
        return 'Hiking, jogging routes';
      case Amenities.Parking:
        return 'Parking';
      case Amenities.FreeParking:
        return 'Free parking at property';
      case Amenities.ParkingAgainstFee:
        return 'Parking against a fee - Add hourly/ Daily rate';
      case Amenities.PrivateParking:
        return 'Private parking near by';
      case Amenities.PublicParking:
        return 'Public parking near by';
      case Amenities.Surroundings:
        return 'Surroundings';
      case Amenities.BeachFront:
        return 'Beach front';
      case Amenities.BeachCloseBy:
        return 'Beach close by';
      case Amenities.Mountains:
        return 'Mountains';
      case Amenities.CityCenterClose:
        return 'City center close by';
      case Amenities.OtherMonuments:
        return 'Other monuments (please specify)';

      default:
        return 'Elevator';
    }
  }

  export function convertToString(ameniti: Amenities): string {
    switch (ameniti) {
      case Amenities.Accessibility:
        return $localize`Accessibility`;
      case Amenities.Elevator:
        return $localize`Elevator`;
      case Amenities.Ramps:
        return $localize`Ramps (accessible with wheelchair or stroller)`;
      case Amenities.ChildrenFamilyEntertainment:
        return $localize`Children & Family Entertainment`;
      case Amenities.OutdoorPlayground:
        return $localize`Outdoor playground`;
      case Amenities.IndoorPlayground:
        return $localize`Indoor playground`;
      case Amenities.SportFacilities:
        return $localize`Sport facilities`;
      case Amenities.ChildCare:
        return $localize`Child Care`;
      case Amenities.DiningAndDrinking:
        return $localize`Dining and Drinking`;
      case Amenities.Restaurant:
        return $localize`Restaurant`;
      case Amenities.Bar:
        return $localize`Bar`;
      case Amenities.RoomService:
        return $localize`Room service`;
      case Amenities.EntertainmentAndLeisure:
        return $localize`Entertainment and Leisure`;
      case Amenities.SwimmingPool:
        return $localize`Swimming pool`;
      case Amenities.OutdoorSittingArea:
        return $localize`Outdoor sitting area, park in property`;
      case Amenities.Hiking:
        return $localize`Hiking, jogging routes`;
      case Amenities.Parking:
        return $localize`Parking`;
      case Amenities.FreeParking:
        return $localize`Free parking at property`;
      case Amenities.ParkingAgainstFee:
        return $localize`Parking against a fee - Add hourly/ Daily rate`;
      case Amenities.PrivateParking:
        return $localize`Private parking near by`;
      case Amenities.PublicParking:
        return $localize`Public parking near by`;
      case Amenities.Surroundings:
        return $localize`Surroundings`;
      case Amenities.BeachFront:
        return $localize`Beach front`;
      case Amenities.BeachCloseBy:
        return $localize`Beach close by`;
      case Amenities.Mountains:
        return $localize`Mountains`;
      case Amenities.CityCenterClose:
        return $localize`City center close by`;
      case Amenities.OtherMonuments:
        return $localize`Other monuments (please specify)`;

      default:
        return $localize`Elevator`;
    }
  }
}
