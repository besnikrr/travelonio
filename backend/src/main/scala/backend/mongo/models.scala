package backend.mongo

import java.time.Instant
import java.util.Date
import backend.api
import backend.api._
import backend.utils.{Countries, Languages, Villages}
import org.mongodb.scala.bson.ObjectId

sealed trait RezeDB

case class User(
    companyId: String,
    _id: ObjectId,
    email: String,
    name: String,
    lastname: String,
    password: String,
    phone: String,
    role: String,
    language: Int,
    propertyIdsAccess: List[PropertyAccess],
    loggedInOneTime: Boolean = false,
    emailConfirmationToken: Option[String] = None,
    accountActivationToken: Option[String] = None,
    resetPasswordToken: Option[String] = None
) extends RezeDB {
  def toApiModel: UserData =
    UserData(
      _id.toString,
      companyId,
      name,
      lastname,
      email,
      phone,
      role,
      emailConfirmationToken.isEmpty,
      accountActivationToken.isEmpty,
      propertyIdsAccess.map(_.toApiModel),
      Languages(language).toString
    )
}

case class Company(
    _id: ObjectId,
    name: String
) extends RezeDB {
  def toApiModel: CompanyData =
    CompanyData(_id.toString, name)
}
case class Room(
    propertyId: String,
    _id: ObjectId,
    roomType: String,
    totalRooms: Int,
    bookedRooms: Int,
    description: String,
    price: Double,
    beds: List[BedIdAndQuantity],
    imageIds: List[String],
    quantity: Int,
    peopleQuantity: Int,
    discountPlan: RoomDiscountPlan,
    tags: List[String] = List()
) extends RezeDB {
  def toApiModel: RoomData =
    RoomData(
      propertyId,
      _id.toString,
      roomType,
      totalRooms,
      bookedRooms,
      description,
      price,
      beds.map(_.toApiModel),
      imageIds,
      quantity,
      peopleQuantity,
      discountPlan.toApiModel,
      tags
    )
}

case class Booking(
    _id: ObjectId,
    propertyId: String,
    roomId: String,
    userId: String,
    startDate: Date,
    endDate: Date,
    guestsInfo: String,
    guests: Guests,
    accessPin: Int,
    propertyFrozenData: PropertyFrozenData,
    createdAt: String,
    updatedAt: String
) extends RezeDB {
  def toApiModel: BookingInfo =
    BookingInfo(_id.toString,propertyId ,
      roomId ,
      startDate.toString ,
      endDate.toString,
      guestsInfo,
      guests.toApiModel,
      accessPin,
      propertyFrozenData.toApiModel,
      createdAt,
      updatedAt)
}
case class Guests(adults: Int, children: Int, infants: Int) extends RezeDB {
  def toApiModel: api.Guests = api.Guests(adults, children, infants)
}
case class PropertyFrozenData(
    property: Property,
    room: Room,
    user: User,
    termsAndConditions: String
) extends  RezeDB {
  def toApiModel: api.PropertyFrozenData =
    api.PropertyFrozenData(property.toApiModel, room.toApiModel, user.toApiModel, termsAndConditions)
}

case class BedIdAndQuantity(bedId: String, bedQuantity: Int) extends RezeDB {
  def toApiModel: api.Beds = api.Beds(bedId, bedQuantity)
}

case class BedDataForRoom(bedId: String, bedQuantity: Int, bedType: String) extends RezeDB {
  def toApiModel: api.BedsDataForRoom = api.BedsDataForRoom(bedId, bedQuantity, bedType)
}

case class Bed(
    _id: ObjectId,
    bedType: String,
    adults: Int,
    children: Int,
    infants: Int,
    dimensions: String,
    icon: String
) extends RezeDB {
  def toApiModel: BedData =
    BedData(_id.toString, bedType, adults, children, infants, dimensions, icon)
}

case class Property(
    companyId: String = "",
    _id: ObjectId,
    name: String = "",
    description: String = "",
    propertyType: String = "",
    postalCode: String = "",
    aminityIds: List[AminityPropertyValues],
    imageIds: List[String] = List(),
    keywords: List[String] = List(),
    propertyPoliciesData: PropertyPoliciesData = PropertyPoliciesData(),
    ratePlan: RatePlan = RatePlan(),
    paymentOptions: PaymentOptions,
    discountForTheFirstFiveGuests: Boolean = false,
    bankDetails: BankDetails = BankDetails(),
    readyForBooking: Option[Boolean] = None,
    startBookingDate: String = "",
    acceptedTermAndConditions: Boolean = false,
    amenitiesDescription: String = "",
    tags: List[String] = List(),
    createdAt: String = Instant.now().toString,
    updatedAt: String = Instant.now().toString,
    location: Location = Location(),
    reviewed: Boolean = false,
    businessInfo: BusinessInfo = BusinessInfo(),
    active: Option[Boolean],
    completed: Option[Boolean]
) extends RezeDB {
  def toApiModel: PropertyData = PropertyData(
    companyId,
    _id.toString,
    name,
    description,
    propertyType,
    postalCode,
    aminityIds.map(_.toApiMOdel),
    imageIds,
    keywords,
    propertyPoliciesData.toApiModel,
    ratePlan.toApiMOdel,
    paymentOptions.toApiModel,
    discountForTheFirstFiveGuests,
    bankDetails.toApiModel,
    readyForBooking,
    startBookingDate,
    acceptedTermAndConditions,
    amenitiesDescription,
    tags,
    createdAt,
    updatedAt,
    location.toApiModel,
    reviewed,
    businessInfo.toApiModel,
    active,
    completed
  )
}

case class AminityPropertyValues(name: String, option: List[AminityOptions]) extends RezeDB {
  def toApiMOdel: api.AminityPropertyValues = api.AminityPropertyValues(
    name,
    option.map(opt => api.AminityOptions(opt.name, opt.selected, opt.distance))
  )
}

case class AminityOptions(name: String, selected: Boolean, distance: Option[Double]) extends RezeDB

case class PropertyPoliciesData(
    breakfastIncluded: Option[Boolean] = None,
    buyBreakfastPossibility: Option[Boolean] = None,
    breakfastPricePerPerson: Option[Double] = None,
    potentialGuestNumber: Option[Int] = None,
    propertySquareSize: Option[Double] = None,
    isRoomInsideApartment: Option[Boolean] = None,
    staffLanguages: Option[List[String]] = None,
    smokingAllowed: Option[Boolean] = None,
    eventsAllowed: Option[Boolean] = None,
    petsAllowed: Option[Boolean] = None,
    checkIn: CheckInAndOut = CheckInAndOut(),
    checkOut: CheckInAndOut = CheckInAndOut(),
    lateCheckout: Option[Boolean] = None
) extends RezeDB {
  def toApiModel: api.PropertyPoliciesData = api.PropertyPoliciesData(
    breakfastIncluded,
    buyBreakfastPossibility,
    breakfastPricePerPerson,
    potentialGuestNumber,
    propertySquareSize,
    isRoomInsideApartment,
    staffLanguages,
    smokingAllowed,
    eventsAllowed,
    petsAllowed,
    checkIn.toApiModel,
    checkOut.toApiModel,
    lateCheckout
  )
}

case class CheckInAndOut(from: Option[String] = None, to: Option[String] = None) extends RezeDB {
  def toApiModel: api.CheckInAndOut = api.CheckInAndOut(from, to)
}

case class RatePlan(
    refundable: RefundableData = RefundableData(),
    nonRefundable: NonRefundableData = NonRefundableData(),
    pricePerGroup: PricePerGroup = PricePerGroup(),
    weeklyPlan: WeeklyPlan = WeeklyPlan()
) extends RezeDB {
  def toApiMOdel: api.RatePlan =
    api.RatePlan(
      refundable.toApiModel,
      nonRefundable.toApiModel,
      pricePerGroup.toApiModel,
      weeklyPlan.toApiModel
    )
}

case class RefundableData(
    fullyRefundable: Option[Boolean] = None,
    cancellationPolicy: Option[Int] = None,
    pricePerNight: Option[Double] = None
) extends RezeDB {
  def toApiModel: api.RefundableData =
    api.RefundableData(fullyRefundable, cancellationPolicy, pricePerNight)
}

case class NonRefundableData(
    setNonRefundable: Option[Boolean] = None,
    discount: Option[Int] = None,
    pricePerNight: Option[Double] = None
) extends RezeDB {
  def toApiModel: api.NonRefundableData =
    api.NonRefundableData(setNonRefundable, discount, pricePerNight)
}

case class PricePerGroup(
    discountForThree: Option[Int] = None,
    discountForTwo: Option[Int] = None,
    discountForOne: Option[Int] = None,
    pricePerNight: Option[Double] = None,
    discountPerGroup: Option[Boolean] = None
) extends RezeDB {
  def toApiModel: api.PricePerGroup =
    api.PricePerGroup(
      discountForThree,
      discountForTwo,
      discountForOne,
      pricePerNight,
      discountPerGroup
    )
}

case class WeeklyPlan(
    setWeeklyPlan: Option[Boolean] = None,
    discount: Option[Int] = None,
    pricePerNight: Option[Double] = None
) extends RezeDB {
  def toApiModel: api.WeeklyPlan =
    api.WeeklyPlan(setWeeklyPlan, discount, pricePerNight)
}

case class PaymentOptions(
    payWhenBooking: PayWhenBooking,
    payAtProperty: PayAtProperty
) extends RezeDB {
  def toApiModel: api.PaymentOptions =
    api.PaymentOptions(
      payWhenBooking.toApiModel,
      payAtProperty.toApiModel
    )
}

case class PayWhenBooking(
    selected: Option[Boolean] = None,
    upFrontPayPercentage: Option[Int] = None
) extends RezeDB {
  def toApiModel: api.PayWhenBooking =
    api.PayWhenBooking(selected, upFrontPayPercentage)
}
case class PayAtProperty(
    selected: Option[Boolean] = None,
    paymentMethod: List[PaymentMethods] = List.empty
) extends RezeDB {
  def toApiModel: api.PayAtProperty =
    api.PayAtProperty(selected, paymentMethod.map(_.toApiModel))
}

case class PaymentMethods(
    name: String,
    selected: Boolean = false,
    value: Option[String] = None
) extends RezeDB {
  def toApiModel: api.PaymentMethods =
    api.PaymentMethods(name, selected, value)
}

case class RoomDiscountPlan(
    hasDiscount: Option[Boolean] = None,
    discountPercentage: Option[Double] = None,
    validFrom: Option[String] = None,
    validUntil: Option[String] = None
) extends RezeDB {
  def toApiModel: api.RoomDiscountData =
    api.RoomDiscountData(hasDiscount, discountPercentage, validFrom, validUntil)
}

case class BankDetails(
    accountOwner: Option[String] = None,
    accountNumber: Option[String] = None,
    bankName: Option[String] = None,
    swiftCode: Option[String] = None
) extends RezeDB {
  def toApiModel: api.BankDetails =
    api.BankDetails(accountOwner, accountNumber, bankName, swiftCode)
}

case class PropertyAccess(
    propertyId: String,
    permission: String
) extends RezeDB {
  def toApiModel: PropertyIdAndAccess =
    PropertyIdAndAccess(
      propertyId,
      permission
    )
}

case class Attachment(
    propertyId: String,
    roomId: Option[String],
    _id: ObjectId,
    content: Array[Byte],
    contentType: String
) extends RezeDB

case class Places(countryId: Int, cityId: Int, villageId: Option[Int]) extends RezeDB

case class Location(
    country: Option[String] = None,
    city: Option[String] = None,
    village: Option[String] = None,
    places: Option[Places] = None,
    address: Option[String] = None,
    zipCode: Option[String] = None,
    longitude: Option[Double] = None,
    latitude: Option[Double] = None
) extends RezeDB {
  def toApiModel: api.Location =
    api.Location(
      places.map(place => Countries(place.countryId).toString),
      places.map(place => Villages(place.cityId).toString),
      places.flatMap(place => place.villageId.map(id => Villages(id).toString)),
      address,
      zipCode,
      longitude,
      latitude
    )
}

case class BusinessInfo(
    name: Option[String] = None,
    address: Option[String] = None,
    licenseNumber: Option[String] = None,
    vatNumber: Option[String] = None,
    businessRegistrationNumber: Option[String] = None
) extends RezeDB {
  def toApiModel: api.BusinessInfo =
    api.BusinessInfo(name, address, licenseNumber, vatNumber, businessRegistrationNumber)
}
case class PropertyWithRoomsAndBeds(
    property: Property,
    rooms: List[RoomDataForPublic],
    beds: List[BedData]
) {
  def toApiModel: api.PropertyWithRoomsAndBeds = api.PropertyWithRoomsAndBeds(
    property.companyId,
    property._id.toString,
    property.name,
    property.description,
    property.propertyType,
    property.postalCode,
    property.aminityIds.map(_.toApiMOdel),
    property.imageIds,
    property.keywords,
    property.propertyPoliciesData.toApiModel,
    property.ratePlan.toApiMOdel,
    property.paymentOptions.toApiModel,
    property.discountForTheFirstFiveGuests,
    property.readyForBooking,
    property.startBookingDate,
    property.acceptedTermAndConditions,
    property.amenitiesDescription,
    property.tags,
    property.location.toApiModel,
    rooms.map(room =>
      api.RoomDataForPublic(
        room.propertyId,
        room.id,
        room.roomType,
        room.totalRooms,
        room.bookedRooms,
        room.description,
        room.price,
        room.beds,
        room.imageIds,
        room.quantity,
        room.peopleQuantity,
        room.discountPlan,
        room.tags
      )
    ),
    beds.map(bed =>
      BedData(
        bed.bedId,
        bed.bedType,
        bed.adults,
        bed.children,
        bed.infants,
        bed.dimensions,
        bed.icon
      )
    )
  )
}
case class PropertySummaryData(
    propertyId: String,
    propertyPrimaryImageId: String,
    propertyType: String,
    description: String,
    location: Location,
    totalRooms: Int,
    cheapestRoomPrice: Double
) {
  def toApiModel: api.PropertySummaryData = api.PropertySummaryData(
    propertyId,
    propertyPrimaryImageId,
    propertyType,
    description,
    location.toApiModel,
    totalRooms,
    cheapestRoomPrice
  )

}

case class PropertiesForSuperAdmin(userId: String,
                                   propertyId: String,
                                   propertyName: String,
                                   propertyType: String,
                                   createdAt: String,
                                   updatedAt: String,
                                   location: Location = Location(),
                                   ratePlan: RatePlan = RatePlan(),
                                   paymentOptions: PaymentOptions,
                                   rooms: List[RoomData]){
  def toApiModel: api.PropertiesForSuperAdmin = api.PropertiesForSuperAdmin(
    userId,
    propertyId,
    propertyName,
    propertyType,
    createdAt,
    updatedAt,
    location.toApiModel,
    ratePlan.toApiMOdel,
    paymentOptions.toApiModel,
    rooms.map(room =>
      api.RoomData(
        room.propertyId,
        room.id,
        room.roomType,
        room.totalRooms,
        room.bookedRooms,
        room.description,
        room.price,
        room.beds,
        room.imageIds,
        room.quantity,
        room.peopleQuantity,
        room.discountPlan,
        room.tags
      )
  ))
}
case class UsersAndPropertyData(
    username: String,
    email: String,
    companyId: String,
    listOfProperties: List[PropertiesForSuperAdmin]
) {
  def toApiModel: api.UsersAndPropertyData = api.UsersAndPropertyData(
    username,
    email,
    companyId,
    listOfProperties.map(_.toApiModel)
    )
}
case class PropertyRoomData(
    propertyId: String,
    propertyType: String,
    propertyName: String,
    price: Double,
    primaryImageId: String,
    location: Location
) {
  def toApiModel: api.PropertyFilteredData = api.PropertyFilteredData(
    propertyId,
    propertyType,
    propertyName,
    price,
    primaryImageId,
    location.toApiModel
  )

}
