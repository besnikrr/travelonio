import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  public showIcons = false;
  public aboutUsText = aboutUsEnglish;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private router: Router
  ) {
    this.showIcons = isPlatformBrowser(platformId);
    if (isPlatformBrowser(this.platformId)) {
      this.aboutUsText = location.href.includes('/al')
        ? aboutUsShqip
        : aboutUsEnglish;
    }
  }

  ngOnInit(): void {}

  navigateToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

  navigateToHome(): void {
    this.router.navigate(['home']);
  }
}

export const aboutUsEnglish = {
  firstParagraph1:
    'Travelonio is the first online platform based in Kosovo for booking accommodations be it through your phone or the device of your choice or through our call center. With just a few clicks you can book your next accommodation, whenever and wherever you want.',
  firstParagraph2:
    'On the Travelonio platform, users can book short stays in many destinations in Kosovo, Albania and beyond.',
  firstParagraph3:
    'Through our innovative technology and our dedicated team, our platform brings vacationers and accommodation providers together, saving you time and costs, as well as offering maximum flexibility.',
  firstParagraph4:
    'Travelonio is designed as online-first with a simple to use interface, empowering users to find their next accommodation with a few clicks. To provide the best possible experience, our customer service team is ready to help and is easily reachable via phone, email, Whatsapp and Viber.',
  firstParagraph5:
    'Our main goal is to provide our users with an excellent experience because we deeply believe that booking an accommodation should be easy, fast and at the cheapest price.',
  secondParagraph: 'FIND YOUR BEST STAY',
  thirdParagraph:
    'What are the benefits of booking online accommodation through\n ' +
    'the Travelonio platform?',
  fourthParagraph: 'I want to be part of Travelonio',
  fifthParagraph:
    'Do you have a property such as a hotel, resort, villa, apartment? You can register it in a few steps and become part of our platform - completely FREE OF CHARGE and start accepting bookings immediately.',
  sixthParagraph: 'Benefits of registering your property on the Travelonio:',
  checklist: [
    'Use of the platform and making reservations for guests is always FREE',
    'Save your time and budget',
    'Choose, compare and review the places that suit you in Kosovo, Albania and beyond',
    'Hundreds of accommodations at the lowest price',
    'We speak your language! Choose between English and Albanian',
    'Customer service center ready to help and easily accessible',
    'Maximum flexibility for changing and canceling reservations',
  ],
  checklistOwners: [
    {
      title: 'Digital platform that is easy to use and accessible at any time.',
      subtitles: [
        'Easy listing of properties in less than 30 minutes directly from your phone or computer',
        'Is your property listed on other portals? You can take the photos and the description directly and place them on our platform.',
      ],
    },
    {
      title: 'FREE Registration and low commission',
      subtitles: [
        'Registration on the platform is FREE as well as the first 3 bookings',
        'Then you only pay 5% commission on accepted bookings, calculated on the total booking value',
      ],
    },
    {
      title: 'Flexibility and low cost for accepting payments',
      subtitles: [
        'We offer you the option to choose how and when you want to accept payment from guests. You can decide whether they pay during the reservation or directly to you at check-in.',
        'If you choose the option to pay us during the reservation, we offer different options to transfer the money to you, such as transfer from local banks, Paypal, Westernunion and Paysera. Saving you unnecessary bank expenses!',
        'NO more hundreds of Euro bank fees to accept your money',
      ],
    },
    {
      title: 'Easy management of property(s) and prices',
      subtitles: [
        'Easy access to your property(s) and ease of updating prices and other property data',
      ],
    },
    {
      title: 'We speak your language! Choose between Albanian and English',
      subtitles: [],
    },
    {
      title:
        'Customer service center ready to help and easily accessible via phone, E-mail, Viber or WhatsApp ',
      subtitles: [],
    },
    {
      title:
        'Maximum flexibility for changing and canceling reservations by you and your guests',
      subtitles: [],
    },
    {
      title:
        'Maximize the utilization rate of your property throughout the year',
      subtitles: ['Attracting new guests from the country and the region'],
    },
    {
      title:
        "Benefit from travelonio.com's marketing activities in social networks, search engines and more",
      subtitles: [
        'Indirectly benefit from many multi-channel marketing activities',
        'Benefit directly by having a chance to have your property selected to be part of campaigns for free',
      ],
    },
  ],
  onlineAccommodation:
    'Your next vacation is just a few clicks away, it might be the best. Give yourself a chance!',
  qoute1:
    'Travelonio enables users to book accommodations in hotels and apartments in Kosovo, Albania and beyond.',
  mission:
    'With ingenuity and entrepreneurship, we develop solutions that revolutionize the way people in Balkans and beyond book their accommodation; having all the information they need, using the channel they prefer and pay the fairest price ',
  vision: 'Make accommodation booking easy and accessible to all',
  aFairDealHeader: 'A fair deal',
  aFairDealContent:
    'We are fair to our colleagues, customers and partners by providing solutions that ensure everyone gets a fair deal',
  stayHumbleHeader: 'Stay Humble',
  stayHumbleContent:
    'We work hard and respect each other even harder. We are first and foremost a people’s company. Everything we do goes to improve \n' +
    'the experience of the people involved',
  soTheRightThingHeader: 'Do the right thing',
  soTheRightThingContent:
    'We do the right thing all the time. Even when no-one is watching. We conduct our business in an efficient way and respect the \n' +
    'nature around us. ',
  howCanIRegister: [
    'Click the button and start the registration process.',
    'Add the required information. The whole process is designed to make it as easy as possible for you to complete the registration in a few easy steps and in the shortest time possible. Everything can be done through our travelonio.com site by phone, tablet or computer. There is even an easier way to do this! If the property is registered on other booking platforms, you can also copy information and photos to our platform. At every step, customer service stands by to help you if you have questions. Contact us at +383 42 84 84 92, via hello@travelonio.com or Chat and talk to our colleagues.',
    'Determine when you want to accept reservations and very soon you will receive new guests, all digitally and designed to be as easy as possible for you and our guests.',
    'CONGRATULATIONS! In just 30 minutes you can be part of our platform, for FREE.',
  ],
  acceptPayment:
    'Travelonio, in addition to the modern technology and innovation it has applied to create the most modern platform in the Balkans for booking accommodation, also offers numerous payment acceptance options from the Hosts. Be it bank transfers through local banks, through fast bank transfer companies, online transfer platforms like PayPal or Paysera, we offer you complete flexibility to decide how you want to accept payments with minimal transfer costs. You are always in control! If you want guests to pay directly to you, no problem, choose this during the registration process and your property will be bookable without the need for an advance payment. We offer you the flexibility to concentrate on what you do best, to provide excellent service to our guests!',
  guests: 'For guests',
  owners: 'For hosts / Property owners',
};
export const aboutUsShqip = {
  firstParagraph1:
    'Travelonio është platforma e parë me bazë në Kosovë për rezervimin online të hoteleve dhe akomodimeve të tjera nga një vend i vetëm permes telefonit, kompjuterit, tabletit ose përmes qendrës sonë të thirrjeve. Me vetëm disa klikime mund të rezervoni akomodimin tuaj të radhës, kurdo dhe kudo të dëshironi.',
  firstParagraph2:
    'Në platformën digjitale Travelonio, përdoruesit mund të bëjnë rezervime për qëndrime të shkurtra në shumë destinacione në Kosovë, Shqipëri dhe më gjerë.',
  firstParagraph3:
    'Nëpërmjet teknologjisë sonë inovative dhe ekipit tonë të përkushtuar, platforma jonë bashkon pushuesit dhe ofruesit e akomodimit, duke ju kursyer kohë dhe kosto, si dhe duke ofruar fleksibilitet maksimal.',
  firstParagraph4:
    "Travelonio është krijuar për t'u përdorur në një mënyrë të pavarur nga përdoruesi përmes aksesit online në platformë në çdo kohë. Për të ofruar përvojën më të mirë të mundshme, ekipi ynë i shërbimit ndaj klientit është i gatshëm të ndihmojë dhe është lehtësisht i arritshëm përmes telefonit, E-mailit, Whatsapp dhe Viber.",
  firstParagraph5:
    "Qëllimi ynë kryesor është t'u ofrojmë përdoruesve tanë një përvojë të shkëlqyer sepse ne besojmë thellësisht se rezervimi i një akomodimi duhet të jetë i lehtë, i shpejtë dhe me çmimin më të lirë.",
  secondParagraph: 'FIND YOUR BEST STAY',
  thirdParagraph:
    'Cilat janë përfitimet e rezervimit të akomodimit online përmes\n ' +
    'platformës Travelonio?',
  fourthParagraph: 'Dua të jem pjesë e platformës Travelonio',
  fifthParagraph:
    'Keni pronë turistike si hotel, resort, villë, apartament? Ju mund ta regjistroni atë në pak hapa dhe të bëheni pjesë e platformës sonë - krejt FALAS dhe filloni të pranoni rezervime menjëherë.',
  sixthParagraph:
    'Përfitimet nga regjistrimi i pronës në platformën Travelonio:',
  checklist: [
    'Qasje online pëmes telefonit në çdo kohë dhe vend',
    'Përdorimi i platformës dhe rezervimi për pushuesit është gjithmonë FALAS',
    'Kurseni kohën dhe buxhetin tuaj',
    'Zgjidhni, krahasoni dhe rishikoni vendet që ju përshtaten në Kosovë, Shqipëri e më gjerë',
    'Qindra akomodime me çmimet më te ulta',
    'Ne flasim gjuhën tuaj! Platforma dhe shërbime në shqip dhe anglisht ',
    'Qëndra e shërbimit të klientit e gatshme për ndihmë dhe lehtë e qasëshme',
    'Fleksibilitet maksimal për ndryshim dhe anulim të rezervimeve',
  ],
  checklistOwners: [
    {
      title:
        'Platform digjitale e leht për t’u përdorur dhe arritshëme në çdo kohe.',
      subtitles: [
        'Listim i lehtë i pronave në me pak se 30 minuta direkt nga telefoni apo kompjuteri juaj. Krejt në menyrë të pavarur.',
        'Keni pronën e listuar në portale tjera? Mund to merrni fotot dhe pershkrimin direkt dhe t’i vendosni në platformën tonë.',
      ],
    },
    {
      title: 'Regjistrimi FALAS dhe komision i ulët',
      subtitles: [
        'Regjistrimi në platform është FALAS si dhe 3 rezervimet e para',
        'Pastaj paguani vetëm 5% komision për rezervimet e pranuara nga totali i vlerës së rezervimit ',
      ],
    },
    {
      title: 'Fleksibilitet dhe kosto minimale për pranimin e pagesave',
      subtitles: [
        'Ne ju ofrojmë mundesi për të zgjedhur se si dhe kur dëshironi të pranoni pagesen nga rezervuesit. Ju mund të vendoseni nëse ata paguajnë gjatë rezervimit apo direkt tek ju gjatë check-in. ',
        'Nëse zgjidhni opcionin që të paguajnë tek ne gjatë rezervimit, ne ofrojmë mundesi te ndryshme për transfer tek ju, si transfer nga bankat lokale, Paypal, Westernunion si dhe Paysera. Duke ju kursyer ju shpenzimet të pa nevojshme bankare!',
        'JO më qindra Euro tarifa bankare për të pranuar paratë e juaja',
      ],
    },
    {
      title: 'Menaxhim të lehtë te pronës(ave) dhe çmimeve',
      subtitles: [
        'Qasje e lehtë në pronen tuaj dhe lehtësi në përditsimin e çmimit dhe të dhenave të tjera të pronës',
      ],
    },
    {
      title:
        'Ne flasim gjuhën tuaj! Platforma dhe shërbime në shqip dhe anglisht',
      subtitles: [],
    },
    {
      title:
        'Qëndra e shërbimit të klientit e gatshme për ndihmë dhe lehtë e qasëshme përmes telefonit, E-mailit, Viber apo WhatsApp',
      subtitles: [],
    },
    {
      title:
        'Fleksibilitet maksimal për ndryshim dhe anulim të rezervimeve nga ana e juaj dhe mysafirët',
      subtitles: [],
    },
    {
      title:
        'Maksimizoni shkallën e shfrytëzimit të pronës tuaj edhe gjatë gjithë vitit',
      subtitles: ['Duke tërhequr mysafirë te rinj nga vendi dhe rajoni'],
    },
    {
      title:
        'Përfitoni nga aktivitetet e marketingut të travelonio.com në rrjete sociale, motorët e kërkimit e më gjerë',
      subtitles: [
        'Përfitoni indirekt nga aktivitete e shumta të marketingut në shumë kanale',
        'Përfitoni direkt nga mundesia që prona e juaj të zgjidhet të jetë pjesë e kampanjave falas',
      ],
    },
  ],
  onlineAccommodation:
    'Me vetëm disa klikime mund të rezervoni pushimin tuaj të radhës, mund të jenë më të miri që keni përjetuar ndonjëherë. Jepini vetës një mundesi!',
  qoute1:
    'Platforma jonë ofron akomodime në hotele, apartamente në Kosovë, Shqipëri dhe më gjerë.',
  mission:
    'Me zgjuarsi dhe shpirtë sipërmarrës, ne zhvillojmë produkte që revolucionarizojnë mënyrën se si njerëzit në Ballkan dhe më gjerë rezervojnë akomodimin e tyre; duke pasur të gjithë informacionin që u nevojitet, duke përdorur kanalin që ata preferojnë dhe duke paguar çmimin më të mirë.',
  vision:
    'Të bëjmë rezervimin e akomodimit të lehtë dhe të arritshëm për të gjithë',
  aFairDealHeader: 'Je fer',
  aFairDealContent:
    'Ne jemi fer me kolegët, klientët dhe partnerët tanë duke ofruar zgjidhje që sigurojnë që të gjithë të perfitojne në mënyre të barabartë',
  stayHumbleHeader: 'Je i thjesht / modest',
  stayHumbleContent:
    'Ne punojmë shumë dhe e respektojmë njëri-tjetrin edhe më shumë. Ne jemi para së gjithash një kompani kolegiale (peoples company). Gjithçka që bëjmë shkon për të përmirësuar \n' +
    ' përvojën e njerëzve të përfshirë',
  soTheRightThingHeader: 'Je i mirë',
  soTheRightThingContent:
    'Ne bëjmë gjënë e duhur gjatë gjithë kohës. Edhe kur askush nuk na shikon. Ne e zhvillojmë biznesin tonë në mënyrë efikase dhe respektojmë \n' +
    ' natyrën që na rrethon.',
  howCanIRegister: [
    'Kliko buttonin dhe fillo procesin e regjistrimit.',
    'Shto informatat e kërkuara. I gjithë procesi është dizajnuar që ju ta keni sa më të lehtë ta përfundoni regjistrimin në disa hapa të lehtë dhe në kohë sa më të shkurtër. E gjitha mund të bëhet përmes faqes sonë travelonio.com nga telefoni, tableti apo kompjuteri. Ka edhe më lehtë! Nëse prona është e regjistruar në platforma tjera të rezervimeve, ju mund t’i kopjoni informatat dhe fotot edhe në platformen tonë. Në çdo hap, shërbimi i konsumatorit qëndron afër të ju ndihmoj nëse keni pyetje. Kontakto në +383 42 84 84 92 ose përmes hello@travelonio.com bisedoni me kolegët tanë.',
    'Përcaktoni se kur dëshironi të pranoni rezervime dhe shumë shpejtë do të pranoni mysafir të rinj, e gjitha në mënyrë digjitale dhe e dizajnuar që të jetë sa më e lehtë për ju dhe mysafirët tanë.',
    'URIME! Në vetëm 30 minuta ju mund të jeni pjesë e platformës tonë, FALAS.',
  ],
  acceptPayment:
    'Travelonio përpos teknologjisë moderne dhe inovacionit që ka aplikuar për të krijuar platformën më moderne në Ballkan për rezervimin e akomodimeve, ofron edhe mundësi të shumta të pranimit të pagesës nga Nikoqirët. Qofshin transfere bankare përmes bankave lokale, përmes kompanive të transferit bankar të shpejt, platformave online të transferimit si PayPal apo Paysera, ne ju ofrojmë fleksibilitet të plotë të vendosni se si dëshironi të pranoni pagesat me shpenzime minimale për transfer. Ju jeni gjithmonë në kontrollë! Nëse dëshironi që mysafirët të paguajnë direkt tek ju, pa problem, zgjedhni këtë gjatë procesit të regjistrimit dhe prona  juaj do të jetë e rezervueshme pa pasur nevojë të bëhet pagesë paraprake. Ne ju ofrojmë fleksibilitetin që ju të koncentroheni në atë që bëni më së miri, të ofroni shërbim të shkëlqyeshëm për mysafirët tanë!',
  guests: 'Për Pushuesit',
  owners: 'Për Pronarët ',
};
