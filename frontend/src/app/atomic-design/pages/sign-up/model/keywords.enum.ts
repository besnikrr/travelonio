import { PropertyKeywordData } from './sign-up.data';

export enum Keywords {
  NearBeach = 1,
  Downtown,
  FamilyFriendly,
  MountainsSurrounding,
  Cozy,
  Spacious,
  Quite,
  Modern,
  PetFriendly,
}

const StringIsNumber = (value) => isNaN(Number(value)) === false;

export namespace Keywords {
  export function getAllKeywords(): PropertyKeywordData[] {
    return [
      {
        id: convertToString(Keywords.NearBeach),
        uniqueId: 'NearBeach',
        icon: 'sun'
      },
      {
        id: convertToString(Keywords.Downtown),
        uniqueId: 'Downtown',
        icon: 'city-central'
      },
      {
        id: convertToString(Keywords.FamilyFriendly),
        uniqueId: 'FamilyFriendly',
        icon: 'family-friendly'
      },
      {
        id: convertToString(Keywords.MountainsSurrounding),
        uniqueId: 'MountainsSurrounding',
        icon: 'mountain'
      },
      {
        id: convertToString(Keywords.Cozy),
        uniqueId: 'Cozy',
        icon: 'cozy'
      },
      {
        id: convertToString(Keywords.Spacious),
        uniqueId: 'Spacious',
        icon: 'spacious'
      },
      {
        id: convertToString(Keywords.Quite),
        uniqueId: 'Quite',
        icon: 'quiet'
      },
      {
        id: convertToString(Keywords.Modern),
        uniqueId: 'Modern',
        icon: 'modern'
      },
      {
        id: convertToString(Keywords.PetFriendly),
        uniqueId: 'PetFriendly',
        icon: 'pet-friendly'
      }
    ];
  }

  export function getKeywordsAsString(): string[] {
    return Object.keys(Keywords)
      .filter(StringIsNumber)
      .map((key) => Keywords[key]);
  }

  export function convertToString(keyword: Keywords): string {
    switch (keyword) {
      case Keywords.NearBeach:
        return $localize`Near the beach`;
      case Keywords.Downtown:
        return $localize`Downtown`;
      case Keywords.FamilyFriendly:
        return $localize`Family Friendly`;
      case Keywords.MountainsSurrounding:
        return $localize`Mountains surrounding`;
      case Keywords.Cozy:
        return $localize`Cozy`;
      case Keywords.Spacious:
        return $localize`Spacious`;
      case Keywords.Quite:
        return $localize`Quite`;
      case Keywords.Modern:
        return $localize`Modern`;
      case Keywords.PetFriendly:
        return $localize`Pet Friendly`;

      default:
        return $localize`Near the beach`;
    }
  }
}
