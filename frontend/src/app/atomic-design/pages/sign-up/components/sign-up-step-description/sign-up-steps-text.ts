export interface SignUpStepsText {
  header: string;
  subheader1: string | undefined;
  subheader2: string | undefined;
  subheader3: string | undefined;
  listTitle: string | undefined;
  listOptions: string[];
  subheader4: string | undefined;
}

export const signUpTexts: SignUpStepsText[] = [
  {
    header: $localize`Welcome to Travelonio!`,
    subheader1:
      $localize`This space is designed to manage the properties that will be part of our platform`,
    subheader2: undefined,
    subheader3: undefined,
    listTitle: $localize`Here, you can:`,
    listOptions: [
      $localize`Add new properties;`,
      $localize`Update existing properties`,
      $localize`Remove existing properties.`
    ],
    subheader4: undefined
  },
  {
    header: $localize`Which of the following category is best suited for your property?`,
    subheader1:
      $localize`In order to choose your property category correctly, make sure you:`,
    subheader2: undefined,
    subheader3: undefined,
    listTitle: undefined,
    listOptions: [
      $localize`Initally, read the informative descriptions for each category;`,
      $localize`Then select your property category correctly.`
    ],
    subheader4: undefined
  },
  {
    header: $localize`Name and details of your property`,
    subheader1: $localize`What to keep in mind when filling out these fields?`,
    subheader2: undefined,
    subheader3: undefined,
    listTitle: undefined,
    listOptions: [
      $localize`Make sure you are entering the correct name of your property;`,
      $localize`Be sure to upload photos in which your property is viewed from all angles (minimum 7 photos);`,
      $localize`Make sure the photos are professional and as realistic as possible.`
    ],
    subheader4: undefined
  },
  {
    header: $localize`List of rooms and their quantities`,
    subheader1:
      $localize`What kind of rooms do you offer and what to keep in mind when listing them?`,
    subheader2:
      $localize`In order to make a complete description of the type of rooms you have and the number of people that can be accommodated in them, make sure that for each type of room you create a new listing and fill in all the required fields as follows:`,
    subheader3: undefined,
    listTitle: undefined,
    listOptions: [
      $localize`Choose the type of room you have available;`,
      $localize`Indicate the number of rooms you have available for each type;`,
      $localize`Indicate the quantities and types of beds located within the selected room (based on the type of beds and their quantities, the number of people that can be accommodated in the room will be determined automatically, but you can change it manually if the number is incorrect);`,
      $localize`Determine the price per night per room;`,
      $localize`Upload realistic photos which show the room from all angles;`,
      $localize`Choose the amenities that are included in the room;`,
      $localize`To add a new type of room, click on "Add room", while to delete it click on "Delete".`
    ],
    subheader4: undefined
  },
  {
    header: $localize`Where is your property located?`,
    subheader1:
      $localize`In order for the location of your property to be as accurate as possible, you should consider filling in the fields by:`,
    subheader2: undefined,
    subheader3: undefined,
    listTitle: undefined,
    listOptions: [
      $localize`Writing the country where your property is located;`,
      $localize`Enter the full address of your property (city, street number and postal code).`
    ],
    subheader4: undefined
  },
  {
    header: $localize`Which of the following keywords best describes your property?`,
    subheader1:
      $localize`In order for potential guests to find you as easily as possible based on their preferences, it is important to determine the main features of your property. So try to:`,
    subheader2: undefined,
    subheader3: undefined,
    listTitle: undefined,
    listOptions: [
      $localize`Choose up to 3 descriptive features to describe your property;`,
      $localize`If you randomly select the wrong icon, you can click on it to remove it as a feature, then click on the one you want to select;`
    ],
    subheader4: $localize`These features will serve as filters to recommend your property based on the requests that customers make when searching the platform.`
  },
  {
    header: $localize`Tell us more about what your property has to offer?`,
    subheader1:
      $localize`In this space it is important to be as transparent and correct as possible with what surrounds you and with what services you offer. This way, guests will be informed of what will be offered and what services they can receive during their stay on your property.`,
    subheader2: undefined,
    subheader3: undefined,
    listTitle: $localize`Make sure guests have complete information about:`,
    listOptions: [
      $localize`Access to the property`,
      $localize`Spaces for fun and relaxation`,
      $localize`Parking spaces`,
      $localize`Important facilities and monuments near your property`
    ],
    subheader4: undefined
  },
  {
    header: $localize`What other services does your property offer?`,
    subheader1:
      $localize`In this space it is important to be as transparent and correct as possible with the services you provide. This way, guests will be informed of what will be offered and what services they can receive during their stay on your property. Make sure guests have complete information about:`,
    subheader2: undefined,
    subheader3: undefined,
    listTitle: undefined,
    listOptions: [
      $localize`Providing food within your property;`,
      $localize`Languages in which guests can communicate with your staff.`
    ],
    subheader4: undefined
  },
  {
    header: $localize`What are the rules of your property?`,
    subheader1:
      $localize`In this space it is important to be as transparent and correct as possible with the rules of your property. This way, guests will be informed of what they are allowed to do and what services they can receive during their stay on your property. Make sure guests have complete information about:`,
    subheader2: undefined,
    subheader3: undefined,
    listTitle: undefined,
    listOptions: [
      $localize`Permitting smoking`,
      $localize`Permitting animals`,
      $localize`Allowing events or celebrations`,
      $localize`Check In and Check Out schedules`
    ],
    subheader4: undefined
  },
  {
    header: $localize`Description of your property`,
    subheader1:
      $localize`The description you write here will appear on your property profile, so make sure the description is as accurate and engaging as possible for potential guests. It is also important that the description is up-to-date and reflects the current state of your property.`,
    subheader2: undefined,
    subheader3: undefined,
    listTitle: undefined,
    listOptions: [
      $localize`If you have difficulty with this part, see the article 'How to describe your property'. Also, if you have a description ready on any other platform or on your website, you can add it here.`
    ],
    subheader4: undefined
  },
  {
    header: $localize`Do you want to offer promotional prices?`,
    subheader1:
      $localize`In this step you have the opportunity to see the rooms you have listed so far and offer promotional prices for each of them for certain periods. Also, for each room you can offer promotional prices only for the first guests.`,
    subheader2: undefined,
    subheader3: undefined,
    listTitle: undefined,
    listOptions: [
      $localize`In the field ‘Discount?’ you can choose if you want to offer room discounts;`,
      $localize`In the field 'How much?' you must enter the value as a percentage of how much discount you offer for that room;`,
      $localize`In the field 'Period'  you can specify the time period when that discount may be available;`,
      $localize`Finally, if you wish, you can offer an additional 20% discount for each room for the first 5 guests only.`
    ],
    subheader4: undefined
  },
  {
    header: $localize`Tariff plan & cancellation rules\n`,
    subheader1:
      $localize`In this step you have the opportunity to set the tariff plan and cancellation rules.`,
    subheader2:
      $localize`Also, here you can offer promotional prices for different groups or longer stays.`,
    subheader3: undefined,
    listTitle: undefined,
    listOptions: [
      $localize`First, you need to determine if the payment made during the booking can be returned. If yes, you need to set how many days before  the cancellation the full refund can be made.`,
      $localize`If you decide that refunds can not be made in case of cancellation of the reservation, you can set a promotional price indicating the value of how much cheaper the room price will be compared to the base price.`,
      $localize`Second, you can set promotional prices for different groups or for longer stays. In each area, whether they indicate the number of guests or weekly stays, you need to set the value of how much cheaper those rooms will be compared to the base prices.`
    ],
    subheader4:
      $localize`You should keep in mind that in this step all the discounts you have offered here and in the previous steps will be added together, and all together will be deducted from the final price. As a result, the price displayed here is the price from which all promotional values ​​offered so far have been removed.`
  },
  {
    header: $localize`How to make sure the room details and their prices are correct?`,
    subheader1:
      $localize`In this step you have the opportunity to see the final price list of each room you have listed so far, along with all the discounts you have offered for those rooms in the previous steps. Also, here you see the value which will be shared as a commission for our platform and the profit you will receive.`,
    subheader2: $localize`In this overview you will see the data as follows:`,
    subheader3: undefined,
    listTitle: undefined,
    listOptions: [
      $localize`In the field 'Price per night' you have the final room price, which is calculated automatically and includes all the discounts you have set in the previous steps;`,
      $localize`In the field 'Discount' you have the total value of the discounts that you marked in the previous steps. This value is denoted as a percentage and is the accumulated sum of all discounts given so far;`,
      $localize`In 'Our Commission' you have the value which will be shared as a commission of being part of our platform and the services we offer, as provided in the agreements written in the Terms & Conditions. The commission value for our platform is 7%;\n`,
      $localize`In 'Your Profit’ you have the final value that you will accept from the reservation of each room you have listed. This value includes the discounts you have assigned in the previous steps and the commission which will be allocated for the Travelinio platform. Also, the final price shown here does not include bank fees (expenses incurred during the transfer of payments to the bank) which may be different depending on the bank where the transfer takes place, as stated in the Terms & Conditions.`
    ],
    subheader4:
      $localize`​If you do not agree with the prices shown here, you can go back to the previous steps and change the prices and discounts you have already set in order to get the final price you want.`
  },
  {
    header:
      $localize`Make sure that the methods and possibilities of making payments are as clear as possible!\n`,
    subheader1: undefined,
    subheader2: undefined,
    subheader3: undefined,
    listTitle:
      $localize`In order for potential guests to be informed with all the details about the payment methods and what payment terms you offer, you need to:`,
    listOptions: [
      $localize`Indicate what payment options you offer (when booking or at the property) and indicate when you want guests to pay;`,
      $localize`Set the terms of payment you offer and accept;`,
      $localize`Indicate what payment methods you offer and accept.`
    ],
    subheader4: undefined
  },
  {
    header: $localize`Where can we transfer your booking money?\n`,
    subheader1:
      $localize`In order for any bank transfer to be transferred on a regular basis, you must enter the correct bank details that match your property.\n`,
    subheader2: undefined,
    subheader3: undefined,
    listTitle: undefined,
    listOptions: [
      $localize`Enter the name of the business or the name of the business owner (depending on whose name the account is in);`,
      $localize`Write your account number correctly, but keep in mind that only the account number is needed, and not that of the bank card;`,
      $localize`Enter the correct name of the bank where your bank account is opened;`,
      $localize`Enter your bank swift code;`,
      $localize`For safety, write and review each field before proceeding to the next step.`
    ],
    subheader4: undefined
  },
  {
    header: $localize`Make sure your property details are accurate!\n`,
    subheader1:
      $localize`It is extremely important that your property details are accurate so that potential guests feel as safe as possible.`,
    subheader2: undefined,
    subheader3: undefined,
    listTitle: $localize`Therefore, be sure to:`,
    listOptions: [
      $localize`Write and review the official name of your business;`,
      $localize`Write and review the exact address of your property;`,
      $localize`Write and review your license number, VAT number and your business number.`
    ],
    subheader4: undefined
  },
  {
    header: $localize`When can you start accepting reservations?\n`,
    subheader1:
      $localize`In this step you have the opportunity to decide if you are willing to accept reservations from potential guests immediately or after a certain period.`,
    subheader2: undefined,
    subheader3: undefined,
    listTitle: undefined,
    listOptions: [
      $localize`In case you choose the option that 'You are ready', then you can accept reservations the moment your property appears on our platform, which can take up to 24 hours;`,
      $localize`If you choose the option that “You are not ready’, you may set the date when you think you may be ready for reservations and guests;`,
      $localize`In case you are not sure about the exact date when you can accept reservations, you can come back and set the time when you are ready.`
    ],
    subheader4: undefined
  }
];
