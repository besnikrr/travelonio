import { Property } from '../ngrx/reducers/properties.reducers';
import { Room } from '../ngrx/reducers/rooms.reducers';
import { PropertyTypes } from '../atomic-design/pages/sign-up/model/property-types';

export function areInputsFine(
  property: Property,
  rooms: Room[],
  currentStep: number
): boolean {
  switch (currentStep) {
    case 1:
      return !(
        property.propertyType === undefined ||
        property.propertyType?.toString() === ''
      );
    case 2:
      if (property.imageIds.length === 0) {
        return false;
      }
      return !(property.name === undefined || property.name === '');
    case 3:
      if (rooms.length === 0) {
        return false;
      }
      if (
        rooms.find(
          (room) => room.description === undefined || room.description === ''
        )
      ) {
        return false;
      }
      if (rooms.find((room) => room.quantity === 0)) {
        return false;
      }
      if (rooms.find((room) => room.peopleQuantity === 0)) {
        return false;
      }
      if (rooms.find((room) => room.imageIds.length === 0)) {
        return false;
      }
      return !rooms.find((room) => room.price === 0);
    case 4:
      if (property.location.country === null) {
        return false;
      }
      if (property.location.latitude === null) {
        return false;
      }
      if (property.location.address === null) {
        return false;
      }
      if (property.location.zipCode === null) {
        return false;
      }
      return true;
    case 5:
      if (property.keywords.length > 0) {
        return true;
      }
      return false;
    case 7:
      if (property.propertyPoliciesData === null) {
        return false;
      }
      if (property.propertyPoliciesData.breakfastIncluded === null) {
        return false;
      }
      if (
        property.propertyPoliciesData.breakfastIncluded === false &&
        property.propertyPoliciesData.buyBreakfastPossibility === null
      ) {
        return false;
      }
      if (
        property.propertyPoliciesData.breakfastIncluded === false &&
        property.propertyPoliciesData.buyBreakfastPossibility === true &&
        (property.propertyPoliciesData.breakfastPricePerPerson === 0 ||
          property.propertyPoliciesData.breakfastPricePerPerson === null)
      ) {
        return false;
      }

      if (
        PropertyTypes.convertFromApiValue(property.propertyType.toString()) ===
        PropertyTypes.Apartment
      ) {
        if (
          property.propertyPoliciesData.potentialGuestNumber === null ||
          property.propertyPoliciesData.potentialGuestNumber === 0
        ) {
          return false;
        }
        if (property.propertyPoliciesData.isRoomInsideApartment === null) {
          return false;
        }
        if (
          property.propertyPoliciesData.propertySquareSize === null ||
          property.propertyPoliciesData.propertySquareSize === 0
        ) {
          return false;
        }
      }

      return true;

    case 8:
      const checkInOutNotValid =
        property.propertyPoliciesData.checkIn.from === null ||
        property.propertyPoliciesData.checkIn.to === null ||
        property.propertyPoliciesData.checkOut.from === null ||
        property.propertyPoliciesData.checkOut.to === null;
      return !checkInOutNotValid;

    case 9:
      return property.description.trim() !== '';

    case 10:
      return !rooms.find(
        (r) =>
          r.discountPlan.hasDiscount === null ||
          (r.discountPlan.hasDiscount === true &&
            (r.discountPlan.discountPercentage === null ||
              r.discountPlan.discountPercentage === 0 ||
              r.discountPlan.validFrom === null ||
              r.discountPlan.validUntil === null))
      );
    case 11:
      if (property.ratePlan.pricePerGroup.discountPerGroup === null) {
        return false;
      }
      if (
        property.ratePlan.pricePerGroup.discountPerGroup === true &&
        property.ratePlan.pricePerGroup.discountForOne === 0 &&
        property.ratePlan.pricePerGroup.discountForTwo === 0 &&
        property.ratePlan.pricePerGroup.discountForThree === 0
      ) {
        return false;
      }
      if (property.ratePlan.weeklyPlan.setWeeklyPlan === null) {
        return false;
      }
      if (
        property.ratePlan.weeklyPlan.setWeeklyPlan === true &&
        (property.ratePlan.weeklyPlan.discount === null ||
          property.ratePlan.weeklyPlan.discount === 0)
      ) {
        return false;
      }
      return true;

    case 12:
      return true;

    case 13:
      if (
        property.paymentOptions.payAtProperty.selected === null ||
        property.paymentOptions.payWhenBooking.selected === null
      ) {
        return false;
      }
      if (
        property.paymentOptions.payWhenBooking.selected === true &&
        property.paymentOptions.payWhenBooking.upFrontPayPercentage === null
      ) {
        return false;
      }
      return true;

    case 14:
      if (
        property.paymentOptions.payWhenBooking.selected === true &&
        (property.bankDetails.accountOwner === null ||
          property.bankDetails.accountOwner === '' ||
          property.bankDetails.accountNumber === null ||
          property.bankDetails.accountNumber === '' ||
          property.bankDetails.bankName === null ||
          property.bankDetails.bankName === '' ||
          property.bankDetails.swiftCode === null ||
          property.bankDetails.swiftCode === '')
      ) {
        return false;
      }
      return true;

    case 15:
      if (
        property.businessInfo.name === null ||
        property.businessInfo.name === '' ||
        property.businessInfo.address === null ||
        property.businessInfo.address === '' ||
        property.businessInfo.vatNumber === null ||
        property.businessInfo.vatNumber === '' ||
        !property.businessInfo.vatNumber.match('^[0-9]*$') ||
        property.businessInfo.businessRegistrationNumber === null ||
        property.businessInfo.businessRegistrationNumber === '' ||
        !property.businessInfo.businessRegistrationNumber.match('^[0-9]*$') ||
        property.businessInfo.licenseNumber === null ||
        property.businessInfo.licenseNumber === '' ||
        !property.businessInfo.licenseNumber.match('^[0-9]*$')
      ) {
        return true;
      }
      return true;
    case 16:
      if (property.readyForBooking === null) {
        return false;
      }
      if (property.acceptedTermAndConditions === false) {
        return false;
      }
      return true;
    default:
      return true;
  }
}
