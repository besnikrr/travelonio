#!/bin/bash


# get actual swagger-coden-cli.jar
if [ ! -f swagger-codegen-cli-3.0.9.jar ]; then
	wget https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.9/swagger-codegen-cli-3.0.9.jar -O swagger-codegen-cli-3.0.9.jar
fi



function modelGenerator () {
	if [[ $ARG1 = "" || $ARG1 = $1 ]]; then
		yaml_file=../../$1/documentation/$1/openapi.yaml
		destination=../../$1/src/main/scala/$1/api
		package=$1.api

		rm -f -r $destination/*
		java \
		-Dmodels=$2 \
		-cp templatev3_2.12-1.1.jar:swagger-codegen-cli-3.0.9.jar \
		io.swagger.codegen.v3.cli.SwaggerCodegen generate \
		-l testbenchScala \
		-i $yaml_file \
		-o $destination \
		--api-package $package
	fi
}

modelGenerator backend PropertiesForSuperAdmin,Guests,RoomForBooking,PropertyFrozenData,BookingInfo,BookingInfos,Places,LocationForUpdate,BedsDataForRoom,LoginSuperAdmin,LoggedInSuperAdmin,InsertUser,UpdateOtherUser,Location,RoomDiscountData,BankDetails,PaymentMethodsForUpdate,LoginUser,ForgotPassword,RegisterUser,UserRegistered,UpdateUser,UpdateYourself,UserData,LoggedOutUser,LoggedInUser,InsertCompany,CompanyInsertedResponse,UpdateCompany,InsertOtherUser,Session,CompanyData,ResetPassword,PropertyIdAndAccess,PropertyData,UpdateProperty,PropertyInsertedResponse,AminityPropertyValues,PaymentMethods,PayAtProperty,PayWhenBooking,PayAtPropertyForUpdate,PaymentOptionsForUpdate,PaymentOptions,RatePlan,RatePlanForUpdate,WeeklyPlan,PricePerGroup,NonRefundableData,RefundableData,PropertyPoliciesData,PropertyPoliciesDataForUpdate,CheckInAndOut,AminityOptions,AminityPropertyForUpdate,InsertRoom,RoomInsertedResponse,RoomData,UpdateRoom,InsertBed,BedIdAndQuantity,PropertyFilters,PropertyFilteredData,RoomDataForPublic,RoomBedInfo,UsersAndPropertyData,PropertySummaryData,BusinessInfo,Beds,PropertyWithRoomsAndBeds,BedTypeInsertedResponse,BedData,UpdateBed,Municipalities,MunicipalityInfo