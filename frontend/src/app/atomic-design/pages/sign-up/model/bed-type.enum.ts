export enum BedType {
  SingleBed,
  DoubleBed,
  LargeDoubleBed,
  ExtraLargeDoubleBed,
  BunkBed,
  SofaBed,
  BabyBed,
}

export namespace BedType {
  export type ApiValue =
    | 'Single bed'
    | 'Double bed'
    | 'Large double bed (King Size)'
    | 'Extra-large double bed (Super King Size)'
    | 'Bunk bed'
    | 'Sofa bed'
    | 'Baby bed';

  export function convertFromApiValue(value: ApiValue): BedType {
    switch (value.trim()) {
      case 'Single bed':
        return BedType.SingleBed;
      case 'Double bed':
        return BedType.DoubleBed;
      case 'Large double bed (King Size)':
        return BedType.LargeDoubleBed;
      case 'Extra-large double bed (Super King Size)':
        return BedType.ExtraLargeDoubleBed;
      case 'Bunk bed':
        return BedType.BunkBed;
      case 'Sofa bed':
        return BedType.SofaBed;
      case 'Baby bed':
        return BedType.BabyBed;

      default:
        return BedType.SingleBed;
    }
  }

  export function convertToApiValue(value: BedType): ApiValue {
    switch (value) {
      case BedType.SingleBed:
        return 'Single bed';
      case BedType.DoubleBed:
        return 'Double bed';
      case BedType.LargeDoubleBed:
        return 'Large double bed (King Size)';
      case BedType.ExtraLargeDoubleBed:
        return 'Extra-large double bed (Super King Size)';
      case BedType.BunkBed:
        return 'Bunk bed';
      case BedType.SofaBed:
        return 'Sofa bed';
      case BedType.BabyBed:
        return 'Baby bed';

      default:
        return 'Single bed';
    }
  }

  export function convertToString(type: BedType): string {
    switch (type) {
      case BedType.SingleBed:
        return $localize`Single bed`;
      case BedType.DoubleBed:
        return $localize`Double bed`;
      case BedType.LargeDoubleBed:
        return $localize`Large double bed (King Size)`;
      case BedType.ExtraLargeDoubleBed:
        return $localize`Extra-large double bed (Super King Size)`;
      case BedType.BunkBed:
        return $localize`Bunk bed`;
      case BedType.SofaBed:
        return $localize`Sofa bed`;
      case BedType.BabyBed:
        return $localize`Baby bed`;

      default:
        return $localize`Single bed`;
    }
  }
}
