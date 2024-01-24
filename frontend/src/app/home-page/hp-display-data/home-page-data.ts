export enum SearchPropertyFilters {
  AllProperties = 'AllProperties',
  Hotel = 'Hotel',
  // Resort = 'Resort',
  Apartment = 'Apartment',
  // Villa = 'Villa',
  // Camping = 'Camping',
}

// tslint:disable-next-line:no-namespace
export namespace SearchPropertyFilters {
  export function getAllSearchPropertyFilters(): SearchPropertyFilters[] {
    return [
      SearchPropertyFilters.AllProperties,
      SearchPropertyFilters.Hotel,
      // SearchPropertyFilters.Resort,
      SearchPropertyFilters.Apartment,
      // SearchPropertyFilters.Villa,
      // SearchPropertyFilters.Camping,
    ];
  }

  export function getSearchPropertyFiltersNames(
    filter: SearchPropertyFilters
  ): string {
    switch (filter) {
      case SearchPropertyFilters.AllProperties:
        return $localize`:All Properties@@allProperties:All Properties`;
      case SearchPropertyFilters.Hotel:
        return $localize`:Hotel@@hotel:Hotel`;
      // case SearchPropertyFilters.Resort:
      //   return  $localize`:Resort@@resort:Resort`;
      case SearchPropertyFilters.Apartment:
        return $localize`:Apartment@@apartment:Apartment`;
      // case SearchPropertyFilters.Villa:
      //   return  $localize`:Villa@@villa:Villa`;
      // case SearchPropertyFilters.Camping:
      //   return  $localize`:Camping@@camping:Camping`;

      default:
        return $localize`:All Properties@@allProperties:All Properties`;
    }
  }
}

export interface CountryData {
  name: string;
  image?: string;
  description?: string;
  originalPrice?: number;
  salePrice?: number;
  reviewsNo?: number;
  rate?: number;
}

export const countryData: CountryData[] = [
  {
    name: 'Susak, Croatia',
    image: '../../../assets/homePage/carousel1.png',
    description: '',
    reviewsNo: 240,
    originalPrice: 980,
    salePrice: 580,
    rate: 5.0,
  },
  {
    name: 'Mykonos, Greece',
    image: '../../../assets/homePage/carousel2.png',
    description: '',
    reviewsNo: 150,
    originalPrice: 1080,
    salePrice: 680,
    rate: 5.0,
  },
  {
    name: 'Bali, Indonesia',
    image: '../../../assets/homePage/carousel3.png',
    description: '',
    reviewsNo: 650,
    originalPrice: 500,
    salePrice: 360,
    rate: 5.0,
  },
  {
    name: 'Ulcinj, Montenegro',
    image: '../../../assets/homePage/carousel1.png',
    description: '',
    reviewsNo: 800,
    originalPrice: 550,
    salePrice: 340,
    rate: 5.0,
  },
  {
    name: 'Shkodër, Albania',
    image: '../../../assets/homePage/carousel2.png',
    description: '',
    reviewsNo: 650,
    originalPrice: 250,
    salePrice: 150,
    rate: 5.0,
  },
  {
    name: 'Hawai, Kailua-Kona',
    image: '../../../assets/homePage/carousel3.png',
    description: '',
    reviewsNo: 400,
    originalPrice: 2050,
    salePrice: 1400,
    rate: 5.0,
  },
];

export const PropertyOptions = [
  {
    name: $localize`:All Properties@@allProperties:All Properties`,
  },
  {
    name: $localize`:Hotel@@hotel:Hotel`,
  },
  {
    name: $localize`:Apartment@@apartment:Apartment`,
  },
  // {
  //   name:  $localize`:Resort@@resort:Resort`,
  // },
  // {
  //   name:  $localize`:Villa@@villa:Villa`,
  // },
  // {
  //   name:  $localize`:Camping@@camping:Camping`,
  // },
];

export const TripOptions = [
  {
    id: 1,
    icon: 'family-vacation',
    associatedColor: '#4CAF50',
    name: $localize`:familyVacations@@Family Vacation text:Family Vacation`,
		value: 'Family Vacation',
  },
  {
    id: 2,
    icon: 'friends-trip',
    associatedColor: '#671BB5',
    name: $localize`:Going away with Friends@@Going away with Friends:Going away with Friends`,
		value: 'Going away with Friends',
  },
  {
    id: 3,
    icon: 'spontaneous-trip',
    associatedColor: '#FFF507',
    name: $localize`:Spontaneous trip@@Spontaneous trip:Spontaneous trip`,
		value: 'Spontaneous trip',
  },
  {
    id: 4,
    icon: 'cozy-trip',
    associatedColor: '#FF07C8',
    name: $localize`:Looking for a cosy place@@Looking for a cosy place:Looking for a cosy place`,
		value: 'Looking for a cosy place',
  },
  {
    id: 5,
    icon: 'business-trip',
    associatedColor: '#1976D2',
    name: $localize`:Business trip@@Business trip:Business trip`,
		value: 'Business trip',
  },
];

export interface TestimonialData {
  image: string;
  testimonial?: string;
}

export const testimonials: TestimonialData[] = [
  {
    image: '../.././../../../assets/homePage/testimonial.png',
    testimonial: $localize`:testimonials@@testimonials1:I’ve spent a wonderful time here. Will come back for sure next year together with my family and friends.`,
  },
  {
    image: '../.././../../../assets/homePage/testimonial1.png',
    testimonial: $localize`:testimonials@@testimonials2:'I absolutely love the beach and water here. Everything was wonderful.`,
  },
  {
    image: '../.././../../../assets/homePage/testimonial2.png',
  },
  {
    image: '../.././../../../assets/homePage/testimonial3.png',
  },
];

export const carouselImages = [
  {
    image: '../../../assets/homePage/carousel1.png',
    price: 80,
    place: 'Tirana, Albania',
  },
  {
    image: '../../../assets/homePage/carousel2.png',
    price: 99,
    place: 'Durrës, Albania',
  },
  {
    image: '../../../assets/homePage/carousel3.png',
    price: 100,
    place: 'Kruja, Albania',
  },
  {
    image: '../../../assets/homePage/carousel1.png',
    price: 65,
    place: 'Vlora, Albania',
  },
  {
    image: '../../../assets/homePage/carousel2.png',
    price: 100,
    place: 'Saranda, Albania',
  },
];

export const SorroundingsOptions = [
  {
    name: $localize`:Beach Front@@beachFront text:Beach front`,
		value: 'Beach front',
  },
  {
    name: $localize`:Beach close by@@beachCloseBy:Beach close by`,
		value: 'Beach close by',
  },
  {
    name: $localize`:Mountains@@mountains:Mountains`,
		value: 'Mountains',
  },
  {
    name: $localize`:City center close by@@cityCenterCloseBy:City center close by`,
		value: 'City center close by',
  },
];
