export enum Countries {
  Kosove = 'Kosove',
  Shqiperi = 'Shqiperi',
}

export namespace Countries {
  export function getAllCountries(): Countries[] {
    return [
      Countries.Kosove,
      Countries.Shqiperi,
    ];
  }
}
