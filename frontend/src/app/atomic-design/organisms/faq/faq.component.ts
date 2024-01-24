import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

interface Faq {
  question: string;
  answer: string[];
}
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  public faqForGuestsText: Faq[] = faqForGuestsEnglish;
  public faqForHostsText: Faq[] = faqForGuestsEnglish;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.faqForGuestsText = location.href.includes('/al')
        ? faqPerMysafirShqip
        : faqForGuestsEnglish;
      this.faqForHostsText = location.href.includes('/al')
        ? faqPerPronarShqip
        : faqForHostsEnglish;
    }
  }

  ngOnInit(): void {}
}

export const faqForGuestsEnglish: Faq[] = [
  {
    question: 'Can I book a room if I do not have a credit card?',
    answer: [
      "Yes, you can make a reservation using another person's card (only with the cardholder's permission).",
    ],
  },
  {
    question: 'If I pay by Credit Card what happens to the card details?',
    answer: [
      'Credit card payments are made through our partners who are licensed banking institutions and payment is made directly on their platform, and only these institutions accept and process your card data.',
    ],
  },
  {
    question: 'When do I pay for my stay?',
    answer: [
      'The payment time depends on the booking conditions you make. This information is provided on the terms of payment on the booking page. You can also find it in your confirmation email.',
    ],
  },
  {
    question: 'How can I be sure my booking has been confirmed?',
    answer: [
      'After making a reservation, you will see a confirmation page with your reservation number. It means that the property has received your reservation details and has confirmed your reservation.',
      'In addition, we will send you a confirmation in your email.',
    ],
  },
  {
    question:
      'I did not receive a confirmation email after I made the reservation. What should I do?',
    answer: [
      'Please check that you have entered your email address correctly.',
      'Next, check your inbox and junk mail for confirmation email if it is marked as Spam or Junk.',
      'You can also find your bookings through our platform by clicking the Booking button. All confirmed bookings are displayed under the Next Bookings category.',
    ],
  },
  {
    question: 'How can I be sure that Travelonio.com is a secure website?',
    answer: [
      'Throughout the booking process, we use world-renowned security technology to protect your personal and card information, namely:',
      'HTTP Secure (HTTPS), which guarantees secure communication over a computer network over the Internet. The HTTPS communication protocol is encrypted by Secure Sockets Layer (SSL) to ensure the privacy of the data exchanged between our clients and servers.',
    ],
  },
  {
    question: 'Where can I find a property cancellation policy?',
    answer: [
      'You can find a general cancellation policy at the bottom of the property page.',
      'Once you have made a reservation and received a confirmation email, you can find the property cancellation policy in the details section of your booking.',
    ],
  },
  {
    question: 'Can I book a room if I do not have a credit card?',
    answer: [
      "Yes, you can make a reservation using another person's card (only with the cardholder's permission). However we also offer other payment methods that are listed during the booking process.",
      'Other payments method we offer:',
      '- Cash payment at property',
      '- Bank transfer',
      '- PayPal',
      '- Paysera',
    ],
  },
  {
    question:
      'What types of credit / debit cards are valid for making a reservation?',
    answer: [
      'You can use one of the following cards to make a reservation: MasterCard, Visa',
    ],
  },
  {
    question: 'What payment method does Travelonio offer?',
    answer: [
      'We offer these payment methods:',
      '- Credit card',
      '- Cash payment at property during check-in',
      '- Bank transfer',
      '- PayPal',
      '- Paysera',
      'Payment methods offered by specific properties can be viewed during the booking process',
    ],
  },
  {
    question: 'How does bank transfer work?',
    answer: [
      'Your reservation will be saved for 24 hours. Within this time you must make the bank transfer to the account below. If you do not make the payment within 24 hours, the reservation will be canceled. In case of transfer delays, contact customer service for assistance to secure the reservation. ',
      'Account name: Behind the Comma Sh.p.kA',
      'Account number: 1506011002952376',
      'IBAN: XK051506011002952376',
      'SWIFT Code: RBKOXKPR',
      'Bank name: Raiffeisen Bank Kosovo, Pristina, Kosovo',
    ],
  },
  {
    question: 'When do I pay for my stay?',
    answer: [
      'The payment terms and timing depends on the terms and conditions of the property where you make your reservation. This information is provided in the Payment Options page during booking. You can also find it in your confirmation email.',
    ],
  },
  {
    question: 'Are all taxes included in the room price?',
    answer: [
      'Usually, taxes are included in the room price, but local taxes are not included and are only paid at the property. This information is provided on the booking page.',
    ],
  },
  {
    question: 'What is the best price guarantee?',
    answer: [
      'Our best price guarantee applies to rooms with the lowest possible price. If you find the samel room online, with the same booking conditions at a lower price within 24 hours of booking - we will refund the difference.',
      'To receive a refund, please send us the link on the website with a cheaper price within 24 hours from the moment of your booking.',
    ],
  },
  {
    question:
      'How do I know if the prices displayed on Travelonio are per person or per room?',
    answer: ['Travelonio always tells you the room price.'],
  },
  {
    question: 'What does the room price include?',
    answer: [
      'The room price includes the facilities listed in each room type. It may also include breakfast and fees depending on the tariff you choose.',
    ],
  },
  {
    question: 'Is breakfast included in the price?',
    answer: [
      'It depends on the tariff you choose.',
      'If the room price includes breakfast, it is displayed in the upper side of the Overview section. If breakfast is not included, you will see its price in the same section.',
    ],
  },
  {
    question: 'How do I find the right accommodation for me?',
    answer: [
      'You can search for an accommodation by destination, dates, number of people and by selecting one of the icons that best describe the purpose of your trip directly on our main page.',
      'On the property list page you can use additional filters to further define the displayed property list.',
    ],
  },
  {
    question: 'Can I find accommodation for a family stay?',
    answer: [
      'Yes! Easily.',
      'On our homepage, once you\'ve selected your destination, dates, and the number of guests, below under "What best describes your trip" select > Family Vacation.',
      'The system will show rooms and properties suitable for families.',
    ],
  },
  {
    question: 'Where can I find room prices?',
    answer: [
      'You can see the room rates on the property listing page after providing the required information on the home page.',
    ],
  },
  {
    question:
      'Where can I see the contact details of the property, such as email or a phone number?',
    answer: [
      'The property contact details are provided in the confirmation email, which you receive after completing the booking.',
    ],
  },
  {
    question:
      'How do I restrict my search to only see properties near a certain area?',
    answer: [
      'Enter a location in the search field on our homepage and you will see a list of all the properties nearby.',
    ],
  },
  {
    question:
      'How do I find a property that is suitable for people with special needs?',
    answer: [
      'You can find information about accommodation of people with special needs under the Amenities on the property details page. ',
    ],
  },
  {
    question: 'How do I know if a room is available?',
    answer: [
      'Once you are on the property page, the available rooms will be displayed in the section Rooms. There you can select one or more rooms by selecting the number of rooms you want to book by clicking on the >Add rooms< button for each room.',
    ],
  },
  {
    question:
      "I checked a property's availability and there were no rooms available online. If I call you, will you find a room for me?",
    answer: [
      'We have the same information you can find online but we might be able to help you find another suitable property.',
    ],
  },
  {
    question: 'What is the "My Reservations" section and why do I need it?',
    answer: [
      'My Reservations is an option that lets you view, adjust or cancel your bookings. You can find it at the top of our homepage. ',
    ],
  },
  {
    question: 'Can I cancel my reservation after it has been confirmed?',
    answer: [
      'Yes you can, depending on the tariff you have chosen',
      'Reservations with refundable rates can be canceled free of charge before the specified date displayed during booking and in the booking confirmation email.',
      'A non-refundable booking can only be canceled against a cancellation fee. If you have to cancel the reservation due to extraordinary circumstances, such as an act of God (floods, earthquakes, hurricanes, etc.) or technical failures (acts of war, terrorist activities, flight delays, etc.), we may try to cancel your reservation for free, but we cannot guarantee it.',
    ],
  },
  {
    question: 'How can I cancel my reservation?',
    answer: [
      'You can cancel your reservation by going to "My bookings" section at the top of our homepage, enter your booking number, select "Cancel booking".',
      'NOTICE: If you choose to cancel your booking, be aware of the cancellation policies you have agreed to when making a reservation. You can also contact our customer service for support.',
    ],
  },
  {
    question: 'How can I be sure my booking has been canceled?',
    answer: [
      'Your reservation is canceled after you receive a cancellation confirmation in your email. If you do not receive an email within 24 hours, please contact our customer service.',
    ],
  },
  {
    question:
      'Where can I find the check-in / check-out times of the property I have chosen?',
    answer: [
      'You can find the check-in / check-out time on the property page while making a reservation.',
    ],
  },
  {
    question:
      'Is it possible to request an early check-in and or late check-out?',
    answer: [
      'It is possible, if the propertyl has rooms available. You can contact the property directly.',
    ],
  },
  {
    question:
      'Are pets allowed in the property? Where can I find this information?',
    answer: ['You can find it in the Policies section of the property page.'],
  },
  {
    question:
      'I need a crib. Can I book one at the property and at what price?',
    answer: [
      'This information is provided in the Amenities section of the property page. If you can not find it, please make a request in the Special Request section or by contacting the property.',
    ],
  },
  {
    question:
      'I need a parking space for my car. How can I book it and at what price?',
    answer: [
      'Information regarding the parking availability can be found in the Amenities section of the property page. ',
    ],
  },
  {
    question: 'Does the property offer a shuttle service?',
    answer: [
      "This information is listed on the property page. Once you have made the reservation, you can arrange the shuttle service by contacting the property directly - if offered by the property. The property's contact information is listed on your booking confirmation.",
    ],
  },
  {
    question: 'Where can I see the property address?',
    answer: [
      'The property address is shown at the top of the property page under the property name. Check the Map section to view the map and see the exact location of the property.',
    ],
  },
];
export const faqPerMysafirShqip: Faq[] = [
  {
    question: 'A mund të rezervoj një dhomë nëse nuk kam një kartë krediti?',
    answer: [
      'Po, mund të bëni një rezervim duke përdorur kartën e një personi tjetër (vetëm me lejen e mbajtësit të kartës).',
    ],
  },
  {
    question: 'Nëse paguaj me Kredit Kartë çka ndodh me të dhënat e kartës?',
    answer: [
      'Pagesat me kredit kartë bëhen përmes partnereve tanë që janë institucione bankare të licensuara dhe pagesa kryhet direkt në platformën e tyre, dhe vetëm këto institucionet pranojnë dhe procesojnë të dhënat e kartës suaj.',
    ],
  },
  {
    question: 'Kur të paguaj për qëndrimin tim?',
    answer: [
      'Koha e pagesës varet nga kushtet e rezervimit që bëni. Ky informacion jepet në kushtet e pagesës në faqen e rezervimit. Mund ta gjeni edhe në emailin tuaj të konfirmimit.',
    ],
  },
  {
    question: 'Si mund të jem i sigurt se rezervimi im është konfirmuar?',
    answer: [
      'Pasi të bëni një rezervim, do të shihni një faqe konfirmimi me numrin tuaj të rezervimit. Do të thotë që prona ka marrë detajet e rezervimit tuaj dhe ka konfirmuar rezervimin tuaj.',
      "Përveç kësaj, ne do t'ju dërgojmë një konfirmim në emailin tuaj.",
    ],
  },
  {
    question:
      'Nuk kam marrë një email konfirmimi pasi kam bërë rezervimin. Cfare duhet te bej?',
    answer: [
      'Ju lutemi kontrolloni nëse e keni futur saktë adresën tuaj të emailit.',
      'Më pas, kontrolloni kutinë tuaj hyrëse dhe dosjet e postës së padëshiruar (spam) për emailin e konfirmimit në rast se është shënuar si Spam ose Junk.',
      'Ju gjithashtu mund t’i gjeni rezervimet tuaja përmes platformës sonë duke klikuar butonin Rezervimet. Nën kategorinë Rezervimet e radhës shfaqen të gjitha rezervimet e konfirmara.',
    ],
  },
  {
    question:
      'Si mund të jem i sigurt se Travelonio.com është një faqe interneti e sigurt?',
    answer: [
      'Gjatë gjithë procesit të rezervimit, ne përdorim teknologjinë e njohur botërore të sigurisë për të mbrojtur të dhënat tuaja personale, përkatësisht:',
      'HTTP Secure (HTTPS), i cili garanton komunikim të sigurt përmes një rrjeti kompjuterik në internet. Protokolli i komunikimit HTTPS është i koduar nga Secure Sockets Layer (SSL) për të siguruar mbrojtjen e privatësisë së të dhënave të shkëmbyera midis klientëve dhe serverëve tanë.',
    ],
  },
  {
    question: 'Ku mund ta gjej politikën e anulimit të pronës?',
    answer: [
      'Ju mund të gjeni një politikë të përgjithshme anulimi në fund të faqes së pronës.',
      'Pasi të keni bërë një rezervim dhe të keni marrë një email konfirmimi, mund të gjeni politikën e anulimit të pronës në seksionin e detajeve të rezervimit tuaj.',
    ],
  },
  {
    question: 'A mund të rezervoj një dhomë nëse nuk kam një kartë krediti?',
    answer: [
      'Po, mund të bëni një rezervim duke përdorur kartën e një personi tjetër (vetëm me lejen e mbajtësit të kartës). Megjithatë platforma Travelonio ofron edhe mënyra tjera të pagesës që listohen gjatë procesit të rezervimit.',
      'Mënyra të tjera pagese që ne ofrojmë:',
      '- Pagesa kesh në pronë',
      '- Transfere bankare',
      '- PayPal',
      '- Paysera',
    ],
  },
  {
    question:
      'Cilat lloje të kartave të kreditit/debitit janë të vlefshme për të bërë një rezervim?',
    answer: [
      'Ju mund të përdorni një nga kartat e mëposhtme për të bërë një rezervim: MasterCard, Visa.',
    ],
  },
  {
    question: 'Cfarë mënyre pagesash ofron Travelonio?',
    answer: [
      'Ne ofrojmë këto mënyra të pagesës:',
      '- Kredit kartë',
      '- Pagesa kesh në pronë gjatë check-in',
      '- Transfere bankare',
      '- PayPal',
      '- Paysera',
      'Mënyrat e pagesave të ofruara nga pronat mund të shihen gjatë procesit të rezervimit.',
    ],
  },
  {
    question: 'Si funksionon pagesa përmes bankës?',
    answer: [
      'Rezervimi juaj do të ruhet për 24 orë. Brenda kësaj kohe ju duhet të kryeni transferin bankar në llogarinë më poshtë. Nëse ju nuk kryeni pagesën brenda 24 orëve, rezervimi do të anulohet. Në rast të vonesave të transferit, kontaktoni shërbimin e konsumatorit për mënyra tjera për ta ruajtur rezervimin tuaj. ',
      'Emri i llogarisë: Behind the Comma Sh.p.kA',
      'Numri i llogarisë: 1506011002952376',
      'IBAN: XK051506011002952376',
      'SWIFT Code: RBKOXKPR',
      'Emri i Bankës: Raiffeisen Bank Kosovo, Pristina, Kosovo',
    ],
  },
  {
    question: 'Kur të paguaj për qëndrimin tim?',
    answer: [
      'Koha dhe kushtet e pagesës varen nga rregullat e pronës ku që bëni revervimin. Ky informacion jepet në Opsionet e Pagesës gjatë rezervimit. Mund ta gjeni edhe në emailin tuaj të konfirmimit.',
    ],
  },
  {
    question: 'A përfshihen të gjitha taksat në çmimin e dhomës?',
    answer: [
      'Zakonisht, taksat përfshihen në çmimin e dhomës, por taksat lokale nuk përfshihen dhe paguhen vetëm në pronë. Ky informacion jepet në faqen e rezervimit.',
    ],
  },
  {
    question: 'Cila është garancia e çmimit më të mirë?',
    answer: [
      'Garancia jonë e çmimit më të mirë vlen për dhomat me çmimin më të ulët të mundshëm. Nëse gjeni të njëjtën dhomëi në internet, me të njëjtat kushte rezervimi me një çmim më të ulët brenda 24 orëve nga rezervimi - ne do të rimbursojmë diferencën.',
      'Për të marrë rimbursimin, ju lutemi na dërgoni lidhjen në faqen e internetit me një tarifë më të lirë brenda 24 orëve nga momenti i rezervimit tuaj.',
    ],
  },
  {
    question:
      'Si mund ta di që tarifat e shfaqura në Travelonio janë për person ose për dhomë?',
    answer: ['Travelonio ju tregon gjithmonë çmimin për dhomë.'],
  },
  {
    question: 'Çfarë përfshin çmimi i dhomës?',
    answer: [
      'Çmimi i dhomës përfshin objektet e renditura në çdo lloj dhome. Mund të përfshijë gjithashtu mëngjesin dhe taksat në varësi të tarifës që zgjidhni.',
    ],
  },
  {
    question: 'A përfshihet mëngjesi në çmimin e dhomës?',
    answer: [
      'Kjo varet nga tarifa që ju zgjidhni.',
      'Nëse çmimi i dhomës përfshin mëngjesin, ai shfaqet në seksionin Përmbledhje në faqën e pronës. Nëse mëngjesi nuk është i përfshirë, do ta shihni çmimin e tij në të njëjtin seksion.',
    ],
  },
  {
    question: 'Si mund të gjej pronën e duhur për mua?',
    answer: [
      'Ju mund të kërkoni për një akomodim sipas destinacionit, datave, numrit të përsonave si dhe mund të kërkoni përmes ikonave që përshkruajnë më së miri qëllimin e udhëtimit tuaj direkt në faqen tonë kryesore.',
      'Në faqen e listës së pronave mund të përdorni filtra shtesë për të përkufizuar më tej listën e shfaqur të pronave.',
    ],
  },
  {
    question: 'A mund të gjej akomodim për një qëndrim familjar?',
    answer: [
      'Po sigurisht!',
      'Në faqën tonë kryesore pasi të keni zgjedhur destinacionin, datat dhe numrin e mysafirëve me të cilët po udhëtoni, në pjesën e poshtme nën seksionin “Çfarë e përshkruan më mirë udhëtimin tuaj” zgjidhni > Pushime Familjare<.',
      'Sistemi do të shfaqë dhoma dhe prona të përshtatshme për familje.',
    ],
  },
  {
    question: 'Ku mund të shoh çmimet e dhomave?',
    answer: [
      "Çmimet e dhomave mund t'i shihni në faqën me listën e pronave pasi të keni plotësuar informacionet e kerkuara në faqën kryesore.",
    ],
  },
  {
    question:
      "Ku mund t'i shoh detajet e kontaktit të pronës, si p.sh. email ose një numër telefoni?",
    answer: [
      'Të dhënat e kontaktit të pronës jepen në emailin e konfirmimit, të cilin e merrni pasi të keni përfunduar rezervimin.',
    ],
  },
  {
    question:
      'Si mund ta kufizoj kërkimin për të parë vetëm prona pranë një pikë referimi të caktuar?',
    answer: [
      'Futni një pikë referimi në fushën e kërkimit në faqen tonë kryesore dhe do të shihni listën e të gjithë pronave që ndodhen aty pranë.',
    ],
  },
  {
    question:
      'Si mund të gjej një pronë që ofron kushte për persona me nevoja të veçanta?',
    answer: [
      'Fillimisht, futni destinacionin dhe datat në faqen tonë kryesore. Pasi të keni selektuar një pronë, në pjesën e poshtme të faqës gjeni seksionin Komoditet. Aty do të shihni nëse prona ofron sherbime për persona me nevoja të veçanta.',
    ],
  },
  {
    question: 'Si mund ta di nëse një dhomë është në dispozicion?',
    answer: [
      'Pasi të jeni në faqen e pronës, dhomat e disponueshme do të shfaqen në seksionin me të njëjtin emër. Aty mund të zgjidhni një ose më shumë dhoma duke zgjedhur numrin e dhomave që dëshironi të rezervoni në butonin >Shto dhoma< për secilën dhomë.',
    ],
  },
  {
    question:
      'Kontrollova disponueshmërinë e pronës dhe nuk kishte dhoma të disponueshme në internet. Nëse të telefonoj, a do të gjëni një dhomë për mua?',
    answer: [
      "Ne kemi të njëjtin informacion që mund ta shihni në internet, por mund t'ju ndihmojmë të gjeni një pronë tjetër.",
    ],
  },
  {
    question: 'Çfarë është seksioni "Rezervimet e mia" dhe pse më nevojitet?',
    answer: [
      'Rezervimet e mia është një opsion që ju lejon të shikoni, ndryshoni ose anuloni rezervimin tuaj. Mund ta gjeni në krye të faqes sonë kryesore.',
    ],
  },
  {
    question: 'A mund ta anuloj rezervimin pasi të jetë konfirmuar?',
    answer: [
      'Po, mundeni, në varësi të tarifës që keni zgjedhur gjatë rezervimit.',
      'Tarifat me anulim falas mund të anulohen pa pagesë përpara datës së caktuar e shfaqur gjatë rezervimit si dhe në emailin e konfirmimit të rezervimit.',
      'Një rezervim i pakthyeshëm mund të anulohet vetëm kundrejt një tarife anulimi. Nëse ju duhet të anuloni rezervimin për shkak të rrethanave të jashtëzakonshme, të tilla si një akt i Zotit (përmbytje, tërmete, uragane, etj.) ose dështime teknike (akte lufte, aktivitete terroriste, vonesa fluturimi, etj.), ne mund të përpiqemi ta anulojmë rezervimin tuaj falas, por ne nuk mund ta garantojmë atë.',
    ],
  },
  {
    question: 'Si mund ta anuloj rezervimin tim?',
    answer: [
      'Mund ta bëni online, thjesht shkoni te seksioni "Rezervimet e mia" në krye të faqes sonë kryesore, vendosni numrin tuaj të rezervimit, zgjidhni "Anulo rezervimin". ',
      'NJOFTIM: Nëse zgjidhni të anuloni, jini të vetëdijshëm për politikat e anulimit që keni rënë dakord kur bëni një rezervim. Ju gjithashtu mund të na kontaktoni nëse është e nevojshme.',
    ],
  },
  {
    question: 'Si mund të jem i sigurt se rezervimi im është anuluar?',
    answer: [
      'Rezervimi juaj anulohet, pasi të keni marrë konfirmin e anulimit në emailin tuaj. Nëse nuk merrni një email brenda 24 orëve, ju lutemi kontaktoni përfaqësuesin tonë të shërbimit të klientit.',
    ],
  },
  {
    question:
      'Ku mund ta gjej kohën e check-in/check-out të pronës që kam zgjedhur?',
    answer: [
      'Ju mund të gjeni kohën e check-in/check-out në faqen e pronës ose në seksionin Politikat në fund të faqes.',
    ],
  },
  {
    question: 'A është e mundur check-in më herët apo check-out më vonë?',
    answer: [
      'Është e mundur, nëse prona ka dhoma në dispozicion. Ju lutemi kontaktoni direkt pronën për të bërë një kërkesë dhe për të shmangur konfuzionin. ',
    ],
  },
  {
    question:
      'A lejohen kafshët shtëpiake në pronë? Ku mund ta gjej këtë informacion?',
    answer: ['Mund ta gjeni në seksionin Politikat në faqen e pronës.'],
  },
  {
    question:
      'Unë kam nevojë për një krevat fëmijësh. A mund të rezervoj një në pronë dhe me çfarë çmimi?',
    answer: [
      'Ky informacion jepet në seksionin Komoditetet në faqen e pronës. Nëse nuk mund ta gjeni, ju lutemi bëni një kërkesë në seksionin Kërkesë e Veçantë, ose duke na kontaktuar drejtpërdrejt pronën.',
    ],
  },
  {
    question:
      'Më duhet një parkim për makinën time. Si mund ta rezervoj dhe me çfarë çmimi?',
    answer: [
      'Rreth opsioneve të parkimit në pronë dhe pranë saj mund të gjeni informacione në seksionin e Komoditeteve të faqes së pronës.',
    ],
  },
  {
    question: 'A ofron prona shërbim transporti?',
    answer: [
      'Ky informacion është renditur në faqen e pronës. Pasi të keni bërë rezervimin, mund të organizoni shërbimin e transportit duke kontaktuar drejtpërdrejt pronën - nëse ofrohet nga prona. Informacioni i kontaktit të pronës është i shënuar në konfirmimin e rezervimit tuaj.',
    ],
  },
  {
    question: 'Ku mund ta shoh adresën e saktë të pronës?',
    answer: [
      'Adresa e saktë e pronës tregohet në krye të faqes së pronës nën emrin e pronës. Kontrolloni seksionin Harta për të parë hartën dhe për të parë vëndin e saktë të pronës.',
    ],
  },
];
export const faqForHostsEnglish: Faq[] = [
  {
    question: 'How can I list my property?',
    answer: [
      "Here's how it works:",
      'After signing up on our platform you can create one or multiple listings. The registration tool will guide you through a quick registration process in which you answer a set of easy to understand questions that will ensure your guests have a good understanding of what your property offers, its surroundings and any other relevant information that guests might need when deciding which property to book. You can also upload photos of your property and its rooms.',
      'At the end of the registration process, which takes less than 30 minutes, you can choose to accept reservations immediately or at a specified date in the future. You have full flexibility and are always in control when you make your property available for our users.',
    ],
  },
  {
    question: 'Will I be able to update my property details at a later date?',
    answer: [
      'Sure, once registered with us, you can update the details about your property at any time. The registration module will allow you to always adjust the information about your property on the go. For example, you can change the availability of the property or its rooms, update the price, update the cancellation policy, and payment options at any time.',
    ],
  },
  {
    question: 'What kinds of photos should I upload?',
    answer: [
      'When you sign up, we ask you to upload photos of your property. This is because we know our guests love browsing through photos when looking for a place to stay. We recommend that you upload photos that show both the inside and the outside of your property. They don’t need to be professional photos – photos with a smartphone taken in the right way will often be enough. However, if you do have a chance to take professional photos, they will certainly boost the chances of your property to be booked more often. If you have photos already posted on other platforms, you can use those as well.',
    ],
  },
  {
    question: 'When will my property be visible on Travelonio?',
    answer: [
      'Once you have finished the registration process, which takes about 30 minutes and you choose to accept reservations immediately, your property will be visible on our platform within 2 - 4 hours. If you choose to accept reservations at a later date, your property will be visible and available for accepting reservations at 12:00 midnight of that given date. From time to time, we may ask property owners to verify your property before you can start accepting bookings.',
    ],
  },
  {
    question: "How do I find out how much commission I'll pay for bookings?",
    answer: [
      'The commission paid for reservations received via Travelonio will be shown on the registration process. The commission is a small percentage of the total price guests will pay for their stay. Depending on the payment method you have chosen, we might deduct the commission from the money we transfer you or you might need to pay us in case guests pay directly to your property. At the end of each month you will receive an invoice summarizing all the commissions charged in the prior month.',
    ],
  },
  {
    question: 'Do I have to confirm all of my bookings?',
    answer: [
      'You don’t need to confirm any of your bookings. When a customer books a stay at your property, it is instantly confirmed online. This gives you the convenience of not having to check every request from every potential guest and gives our guests instant confirmation that their booking has been successful. This is why it is crucial that you actively update your property’s availability on our platform.',
    ],
  },
  {
    question: 'What happens if a guest cancels the reservation?',
    answer: [
      'Depending on the cancellation policy you have chosen for that particular tariff, it might be automatically approved and the guest pays nothing. If the free cancellation period has passed, we will ask guests to pay the fee, which you have determined for that chosen tariff. We will then pass on the fee to you. You can choose the cancellation policy and tariffs during the registration process and update it at any time.',
    ],
  },
  {
    question: "What happens if a guest doesn't show up (a no-show)?",
    answer: [
      `No-show? No problem. You won't pay commission for guests who don't show up – unless you've set up a "no-show charge" for your guests. In which case, we will ask guests to pay the no-show charge and we will apply our commission on that amount.`,
    ],
  },
  {
    question: 'What happens if my property is damaged by guest(s)?',
    answer: [
      'Accidents can happen. In case that happens, please discuss the situation directly with the guest. Guests can not be asked to pay a security deposit on our platform.',
    ],
  },
];
export const faqPerPronarShqip: Faq[] = [
  {
    question: 'Si mund ta listoj pronën time?',
    answer: [
      'Ja se si funksionon:',
      "Pasi të regjistroheni në platformën tonë, mund të regjistroni një ose disa prona. Moduli i regjistrimit është i përbërë një numë pyetjesh lehtësisht të kuptueshme që do të ndihmojnë mysafirët tuaj të kenë një ide sa më të mirë të asaj që ofron prona juaj, ambienti përreth dhe çdo informacion tjetër të rëndësishëm që mund t'u nevojitet mysafirëve kur të vendosin se cili pronë për të rezervuar. Ju gjithashtu mund të ngarkoni foto të pronës suaj dhe dhomave të saj.",
      'Në fund të procesit të regjistrimit, i cili zgjat më pak se 30 minuta, ju mund të zgjidhni të pranoni rezervime menjëherë ose në një datë të caktuar në të ardhmen. Ju keni fleksibilitet të plotë dhe jeni gjithmonë në kontroll kur e bëni pronën tuaj të disponueshme për përdoruesit tanë.',
    ],
  },
  {
    question:
      'A do të jem në gjendje të përditësoj detajet e pronës sime në një datë të mëvonshme?',
    answer: [
      "Sigurisht, pasi të regjistroheni tek ne, ju mund të përditësoni detajet në lidhje me pronën tuaj në kohë reale. Moduli i regjistrimit do t'ju lejojë të përditësoni në menyrë të vazhdueshme informacionet për pronën tuaj në lëvizje. Për shembull, mund të ndryshoni disponueshmërinë e pronës ose dhomave të saj, të përditësoni çmimin, të përditësoni politikën e anulimit dhe opsionet e pagesës mes tjerash në çdo kohë.",
    ],
  },
  {
    question: 'Çfarë lloj fotosh duhet të ngarkoj?',
    answer: [
      "Kur regjistroheni, ju kërkojmë të ngarkoni fotografi të pronës suaj. Kjo është për shkak se ne e dimë se mysafirët tanë duan të shfletojnë fotot kur kërkojnë një vend për të qëndruar. Ne ju rekomandojmë të ngarkoni foto që tregojnë hapsirën si brenda si ashtu edhe jashtë pronës suaj. Ato nuk kanë nevojë të jenë fotografi profesionale – shpesh do të mjaftojnë fotot me një smartphone të realizuar në mënyrën e duhur. Megjithatë, nëse keni mundësi për të bërë fotografi profesionale, ato me siguri do të rrisin gjasat që prona juaj të rezervohet më shpesh. Nëse keni foto të postuara tashmë në platforma të tjera, mund t'i përdorni edhe ato.",
    ],
  },
  {
    question: 'Kur do të jetë e dukshme prona ime në Travelonio?',
    answer: [
      "Pasi të keni përfunduar procesin e regjistrimit, i cili zgjat rreth 30 minuta dhe të zgjidhni të pranoni rezervimet menjëherë, prona juaj do të jetë e dukshme në platformën tonë brenda 2 - 4 orëve. Nëse vendosni të pranoni rezervime në një datë të mëvonshme, prona juaj do të jetë e dukshme dhe e disponueshme për të pranuar rezervime në orën 12:00 të mesnatës së asaj date. Herë pas here, ne mund t'u kërkojmë pronarëve të pronave të verifikojnë pronën e regjistruar përpara se të filloni të pranoni rezervime.",
    ],
  },
  {
    question:
      'Si mund të zbuloj se sa komision do të paguaj për rezervimet që marr nga travelonio?',
    answer: [
      "Për rezervimet e pranuara nga platforma Travelonio.com pronat paguajnë një komision të vogel i cili është një përqindje e vlerës totale që mysafirët paguajnë për qëndrimin e tyre. Në varësi të mënyrës së pagesës që keni zgjedhur, ne mund ta zbresim komisionin nga paratë që ju transferojmë ose mund t'ju duhet të na paguani në rast se mysafirët paguajnë drejtpërdrejt në pronën tuaj. Në fund të çdo muaji do të merrni një faturë për të gjitha komisionet e paguar në muajin paraprak.",
    ],
  },
  {
    question: 'A duhet të konfirmoj të gjitha rezervimet që marr?',
    answer: [
      'Nuk keni nevojë të konfirmoni asnjë nga rezervimet tuaja. Kur një mysafir rezervon një qëndrim në pronën tuaj, ai konfirmohet menjëherë. Kjo ju jep lehtësinë që të mos keni nevojë të kontrolloni çdo kërkesë për rezervim dhe u jep mysafirëve tanë konfirmimin e menjëhershëm se rezervimi i tyre ka qenë i suksesshëm. Kjo është arsyeja pse është thelbësore që ju të përditësoni në mënyrë aktive disponueshmërinë e pronës suaj në platformën tonë.',
    ],
  },
  {
    question: 'Çfarë ndodh nëse një mysafir anulon rezervimin?',
    answer: [
      "Në varësi të politikës së anulimit që keni zgjedhur për atë tarifë të caktuar, ajo mund të miratohet automatikisht dhe i ftuari nuk paguan asgjë. Nëse periudha e anulimit falas ka kaluar, ne do t'u kërkojmë mysafirëve të paguajnë komisionin për anulim që keni përcaktuar për atë tarifë të zgjedhur. Më pas do t'jua transferojmë komisionin. Ju mund të përcaktoni politikat e anulimit dhe tarifat gjatë procesit të regjistrimit dhe ta përditësoni atë në çdo kohë.",
    ],
  },
  {
    question: 'Çfarë ndodh nëse një mysafir nuk shfaqet (një mos-shfaqje)?',
    answer: [
      `Mos shfaqje? Nuk ka problem. Ju nuk do të paguani komision për të ftuarit që nuk paraqiten - përveç nëse keni vendosur një "tarifë për mos paraqitje" për të ftuarit tuaj. Në këtë rast, ne do t'u kërkojmë të ftuarve të paguajnë tarifën e mos-paraqitjes dhe ne do të aplikojmë komisionin tonë për atë shumë.`,
    ],
  },
  {
    question: 'Çfarë ndodh nëse prona ime është e dëmtuar nga mysafirët?',
    answer: [
      "Aksidente mund të ndodhin. Në rast se kjo ndodh, ju lutemi diskutoni situatën drejtpërdrejt me mysafirin. Mysafirëve nuk mund t'u kërkohet të paguajnë një depozitë sigurie në platformën tonë.",
    ],
  },
];
