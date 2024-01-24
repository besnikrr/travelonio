import { CustomDialogComponent } from '../atomic-design/pages/sign-up/components/custom-dialog/custom-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export function hostsTermsAndConditionsDialogEnglish(
  event: Event,
  dialog: MatDialog
): void {
  event.preventDefault();
  event.stopPropagation();
  const dialogRef = dialog.open(CustomDialogComponent, {
    width: '639.72px',
    panelClass: 'custom-dialog',
    data: {
      title: 'General Delivery Terms',
      template: `
        <p><b>Travelonio.com</b></p>
        <h3>Introduction</h3>
        <p>These General Delivery Terms govern the use of the website www.travelonio.com and any related services by Accomodations provided by Behind the Comma Shpk incorporated under the laws of Kosovo with a business registration number 811872242 and are entered into between the Accommodation and Travelonio.com.</p>
        <p>By accessing Travelonio.com, you agree to abide by these General Delivery Terms and to comply with all applicable laws and regulations. If you do not agree with these General Delivery Terms, you are prohibited from using this website or using any other services provided by Behind the Comma Shpk.</p>
        <p>We, Behind the Comma Shpk, reserve the right to review and amend any of these General Delivery Terms at our sole discretion. Upon doing so, we will update this page. Any changes to these General Delivery Terms will take effect immediately from the date of publication.</p>
        <br>
        <h3>1. Definitions</h3>
        <p>1.1 The following definitions apply throughout the Agreement unless the contrary intention appears:</p>
        <p><b>"Accommodation"</b> means the legal entity (legal person or natural person) that is a signatory to this Agreement, and, where different, the accommodation provider (meaning property) in relation to which the legal entity is contracting, and to which these Terms are applicable.</p>
        <p><b>"Accommodation Information"</b> means information provided by and relating to the Accommodation for inclusion on the Website, including pictures, photos and descriptions, its amenities and services, the rooms available for reservation, details of the rates (including all applicable Taxes, unless applicable mandatory law provides otherwise, and surcharges), availability, cancellation and no-show policies and other policies and restrictions. </b>
        <p><b>"Booking Service"</b> means the purchase, order, (facilitated) payment or reservation service as offered or enabled by Travelonio.com in respect of numerous products and services as from time to time made available by the Accommodation on the Website.</p>
        <p><b>"Reservation"</b> means the order, purchase, payment, booking or reservation of an accommodation.</p>
        <p><b>"Customer Data"</b> means the dates of arrival and departure, number of nights booked, room type (including smoking preference if available), Room Price, Guest name, and any other specific request made by the Guest.</p>
        <p><b>"Facilitated Payment"</b> means the payment methods that Travelonio.com may from time to time make available on the Travelonio.com Website for (pre-/down-) payment of the Room Price by a Guest to the Accommodation and for settlement of the Commission by the Accommodation to Travelonio.com (as applicable) pursuant to which bank transfer, credit card payments or other forms of online payments (as available) can be made and processed for and on behalf of the Accommodation.</p>
        <p><b>"Guest"</b> means a visitor to the Website or a customer or guest of the Accommodation.</p>
        <p><b>"Website"</b> means the (mobile) website on which the Booking Service is made available owned, controlled, managed, maintained and/or hosted by Travelonio.com.</p>
        <p><b>"Force Majeure Event"</b> means any of the following events affecting multiple Guests and multiple accommodations: acts of God, volcanic eruption, (natural) disaster, fire, (acts of) war, hostilities or any local or national emergency, invasion, compliance with any order or request of any national, provincial, port or other public authority, government regulation or intervention, military action, civil war or terrorism, (biological, chemical or nuclear) explosion, rebellion, riots, insurrection strikes, civil disorder (or the material or substantial threat or justified apprehension of any such events), curtailment of transportation facilities, close down of airports or any other exceptional and catastrophic event, circumstance or emergency, preventing or making it impossible or illegal for Guests to travel to or stay at the Accommodation. </p>
        <p><b>"We Price Match"</b> means the guarantee issued by Travelonio.com stating that Travelonio.com offers the best rate for a room and that no lower rate can be found online for the equivalent room with the same check-in and check-out dates and the same booking conditions.</p>
        <br>
        <h3>2. Scope and nature of our Service</h3>
        <p>2.1 Via travelonio.com, Behind the Comma Shpk, provides an online platform through which the Accommodation can offer their products and service for order, purchase, reservation, hire, and through which visitors of the Website can discover, search, compare, and make an order, reservation, purchase or payment (i.e. the Booking Service). By using the Booking Service (e.g. by making a Reservation through the Booking Service), the Guest enters into a direct (legally binding) contractual relationship with the Accommodation with which the Guest(s) makes a reservation.</p>
        <p>2.2 We act only as an intermediary between the Guest and the Accommodation, transmitting the relevant details for the Reservation to the relevant Accommodation(s) and sending the Guest a confirmation email for and on behalf of the Accommodation. Travelonio.com does not (re)sell, rent out, offer any (travel) product or service.</p>
        <p>2.3 When rendering our Booking Service, the information that we expose is based on the information provided to us by the Accommodation. Although we will use reasonable skill and care while providing Guests with our Booking Service, we cannot guarantee that all information is accurate, complete or correct, nor can we be held liable for any errors (including manifest and typographical errors), any interruptions (whether due to any (temporary and/or partial) breakdown, repair, upgrade or maintenance of our Website or otherwise), inaccurate, misleading or untrue information or non-delivery of information. Each Accommodation is held responsible for the accuracy, completeness and correctness of the information (including the rates/fees/prices, policies & conditions and availability) displayed on our Website. Travelonio.com does not constitute and should not be regarded as a recommendation or endorsement of the quality, service level, hotel class or (star) rating of any Accommodation (or its facilities, venue, products or services) made available.</p>
        <p>2.4 Our Booking Service is made available for personal and non-commercial use only. Therefore, you are not allowed to re-sell, deep-link, use, copy, monitor (e.g. spider, scrape), display, download or reproduce any content or information, software, reservations, products or services available on this Website for any commercial or competitive purpose.</p>
        <br>
        <h3>3. Accommodation Obligations</h3>
        <p>3.1 <u>Accommodation Information</u></p>
        <p>3.1.1 Accommodation Information shall comply with formats and standards provided by Travelonio.com. The Accommodation Information shall not contain references or links to the Accommodation or to third parties, including telephone or fax numbers, email address, social media, website, app or Website. Travelionio.com reserves the right to edit or exclude any information that is incorrect or incomplete or in violation of the Agreement.</p>
        <p>3.1.2 The Accommodation represents and covenants that the Accommodation Information shall at all times be true, accurate and not misleading. The Accommodation is responsible for a correct and up-to-date statement of the Accommodation Information, including additional availability of rooms for certain periods or any extraordinary events and situations (e.g. renovation or construction at or near the facility). The Accommodation shall update the Accommodation Information on a daily basis (or such more frequent basis as may be required) directly online through the website of Travelonio.com.</p>
        <br>
        <p>3.2 <u>Parity</u></p>
        <p>3.2.1 The Accommodation agrees to always give Travelonio.com <b>"Rate and Conditions Parity"</b>, meaning the same or better rates for the same Accommodation, room type, dates, bed type, number of guests, same or better amenities and add-ons (e.g. free breakfast, wifi, early/late checkout), and the same or better restrictions and policies such as reservation changes and cancellation policy as are made available by the Accommodation.</p>
        <p>3.2.2 The Accommodation agrees to give, for each calendar date and subject to availability, some availability for all rooms and room types and is encouraged to provide Travelonio.com with fair access to all rooms and room types and rates available during the term of the Agreement. </p>
        <p>3.3 <u>Commission</u></p>
        <p>3.3.1 For each reservation made through the Website by a Guest for a Room, the Accommodation shall pay Travelonio.com a commission as specified in the commission overview or specified during the property registration process, calculated as multiple of the total gross price of the reservation, including room price for the duration of the stay, applicable taxes and other extras and surcharges. </p>
        <p>3.3.2 Travelonio.com will charge a Commission in the event of:</p>
        <ul><li>overbooking: at all times, irrespective of waiver of charged Room Price; and/or</li><li>a charged cancellation and/or charged no-show.</li></ul>
        <p>The Commission will be calculated in accordance with the confirmed booking as provided to the Accommodation and confirmed by Travelonio.com to the Guest.</p>
        <p>3.3.3 The Accommodation shall give Travelonio.com notice of waiver of any (room) charge or fee in the event of a no-show or charged cancellation, within 48 hours after midnight on the day of the scheduled date of check-out Travelonio.com will then inform the Guest accordingly and the Accommodation shall promptly process the refund to the Guest (as applicable).</p>
        <p>3.3.4 The Accommodation is responsible for informing Travelonio.com about (and any changes to) applicable Taxes (unless applicable mandatory law provides otherwise) which will be charged to the Guest by the Accommodation upon reservation for pre-paid or upon check-out for post-paid reservations. Unless otherwise agreed by Travelonio.com or permitted by applicable law, the rate shown to Guests on the Website shall be inclusive of Taxes.</p>
        <br>
        <p>3.4 <u>Payments of Invoice to Travelonio.com</u></p>
        <p>3.4.1 Commission shall be invoiced and paid the calendar month after the (scheduled) departure date of the Guest.</p>
        <p>3.4.2 Commission shall be paid in accordance with the following terms:</p>
        <ul><li>invoices are processed on a monthly basis and shall be made available to the Accommodation through the Internet. Travelonio.com may also send the invoices by e-mail to the Accommodation;</li><li>the Accommodation shall pay the invoice within 14 days of the invoice date;</li><li>payment shall be made by the Accommodation directly to Travelonio.com via Bank Transfer or any other payment method agreed by Travelonio.com The Accommodation shall bear all bank charges for the transfer of the funds.</li><li>the Commission invoiced by Travelonio.com shall be paid by the Accommodation in the EURO currency. The accommodation is responsible that Travelonio.com receives the specified invoiced amount in full.</li></ul>
        <p>3.4.3 If there is a dispute between Travelonio.com and the Accommodation (e.g. on the amount of the Commission), the Accommodation shall pay any undisputed part of the Commission in accordance with the terms of the Agreement, notwithstanding the status or nature of the dispute.</p>
        <p>3.4.5 If the Accommodation is late in its payment to Travelonio.com, Travelonio.com may claim statutory interest, suspend its service under the Agreement (e.g. by suspending the Accommodation from the Website). </p>
        <br>
        <p>3.5 <u>Reservation, Guest Reservation, Complaints & We Price Match</u></p>
        <p>3.5.1 The Accommodation will receive a confirmation for every reservation made by a Guest through the Website. The confirmation will include the Customer Data, which includes but is not limited to all Guest Personal Data. Travelonio.com is not responsible for the accuracy and completeness of the information and dates provided by the Guests. Travelonio.com is not responsible for the payment obligations of the Guests relating to their reservations. The Accommodation shall on a regular basis (at least daily) check and verify the status of reservations on the Travelonio.com Website. </p>
        <p>3.5.2 By making a reservation through the Website a direct legal contract is created between the Accommodation and the Guest. Travelonio.com is not a party to this contract. </p>
        <p>3.5.3 The Accommodation must accept a Guest as its contractual counterparty and must handle the online reservation in compliance with the Accommodation Information contained on the Website at the time the reservation was made and the supplementary information and wishes (if any) were made known by the Guest.</p>
        <p>3.5.4 Other than the fees, extras and charges set out in the reservation confirmation sent by Travelonio.com to the Guest, the Accommodation shall not charge the Guest any transaction or administration fee or charge for the use of any payment method (e.g. credit card charge).</p>
        <p>3.5.5 Complaints or claims in respect of the products or service provided by the Accommodation or specific requests made by Guests shall be managed by the Accommodation without requiring the involvement of Travelonio.com. Travelonio.com is not responsible for and has no liability in respect of such complaints or claims. Travelonio.com may at its sole discretion:</p>
        <ul><li>offer customer (support) services to a Guest;</li><li>act as intermediary between the Accommodation and a Guest; and</li><li>provide at the Accommodation’s expense alternative accommodation of an equal or better standard in the event of an overbooking or other material irregularity or complaint in relation to the Accommodation.</li></ul>
        <p>3.5.6 Where Travelonio.com.com is entitled to Rate and Conditions Parity or Rate Parity and a Guest has a valid claim under We Price Match, Travelonio.com shall promptly notify the Accommodation of the relevant details of the claim. The Accommodation shall immediately adjust the rates available on the Website so that the lower rate is available for further bookings. The Accommodation shall also immediately adjust the rate in the reservation made by the Guest who brought the claim. When the Guest checks-out, the Accommodation shall offer the room at the lower rate and shall either (i) settle the difference between the booked rate and the lower rate by charging the Guest for the lower rate, or (ii) refund (in cash) the Guest the difference between the two rates.</p>
        <br>
        <p>3.6 <u>Overbooking & Cancellation</u></p>
        <p>3.6.1 The Accommodation shall provide the Guest with the rooms booked. If the Accommodation is unable to meet its obligations under the Agreement for any reason, it shall promptly inform Travelonio.com via any available channel, email, telephone or the Website. Unless Travelonio.com has arranged for (and the Accommodation has verified) alternative accommodation, the Accommodation will use its best endeavours to provide an alternative room(s) of equal or superior quality at its own expense. If no such room is available on arrival, the Accommodation will:</p>
        <ul><li>find suitable alternative accommodation of an equal or superior standard to the Accommodation holding the Guest‘s guaranteed booking;</li><li>provide free private transportation to the alternative accommodation for the Guest and other members of the Guest's party who are listed in the Guest's guaranteed booking; and</li><li>reimburse and compensate Travelonio.com and/or the Guest for all reasonable costs and expenses (e.g. costs of the alternative accommodation, transportation, telephone costs) incurred by the Guest and/or Travelonio.com as a result of the overbooking. Any sum due to Travelonio under this clause shall be paid by the Accommodation within 14 days after receipt of the invoice.</li></ul>
        <p>3.6.2 The Accommodation may not cancel any online reservation. Where any fraudulent activities are alleged or suspected (e.g. in respect of reservations, credit card fraud, money laundering or payment of the Room Price), Travelonio.com may cancel the relevant reservation. Travelonio.com shall inform the Accommodation of any action that it takes pursuant to this Clause 3.6.2.</p>
        <p>3.6.3 Cancellations made by Guests before the point at which a cancellation fee applies will not attract Commission. Cancellations made by Guests after this point will attract Commission in accordance with the terms of the Agreement.</p>
        <br>
        <p>3.7 <u>Messaging Service</u></p>
        <p>3.7.1 Travelonio.com may from time to time as part of its service to the Guest and the Accommodation facilitate the communication between the Guest, the Accommodation and Travelonio.com (the <b>"Messaging Service"</b>). Travelonio.com may process (including any storage, receipt, access, insight and screening) communications sent via the Messaging Service (the <b>"Communications"</b>) for the provision of the Service to the Guest and to the Accommodation.</p>
        <p>3.7.2 The Accommodation understands and agrees that Travelonio.com will process (including storage, receipt, access, insight and screening) Communications and warrants that it has informed (and, as may be required by applicable laws, obtained all necessary authorisations from) its employees, agents, representatives, staff members and other individuals prior to their use of the Messaging Service for or on behalf of the Accommodation.</p>
        <p>3.7.3 The Accommodation shall not use the Messaging Service to send unsolicited electronic communications to any individual and fully indemnifies Travelonio.com for any claims from third parties and any fines resulting from the unlawful or unauthorized use of the Messaging Service by the Accommodation.</p>
        <br>
        <p>3.8 <u>Force Majeure</u></p>
        <p>3.8.1 Where a Force Majeure Event occurs, the Accommodation will not charge and will repay, if applicable, the Guests affected by the Force Majeure Event any fee, costs, expenses or other amount (including the (non-refundable) rate or the no-show, (change of) reservation or cancellation fee) for:</p>
        <ul><li>any cancellation or change to the reservation made by the Guests; or</li><li>the part of the reservation that was not used due to the Force Majeure Event.</li></ul>
        <p>3.8.2 If there is reasonable and justified doubt, the Accommodation may ask a Guest to provide reasonable evidence of the causality between the Force Majeure Event and their cancellation, no-show or change of reservation. The Accommodation will provide Travelonio.com with a copy of such evidence on request. In order for Travelonio.com to register any cancellation, no-show or amendment of the reservation due to a Force Majeure Event, the Accommodation shall inform Travelonio.com of the number of days actually stayed within two business days after the scheduled check out date of the no-show or cancellation, or check out. Travelonio.com will not charge any Commission in relation to the part of the reservation that is not used due to the Force Majeure Event.</p>
        <br>
        <h3>4. Ranking, Guest Reviews, Marketing, Facilitate Payments and Bank Transfers</h3>
        <p>4.1 <u>Ranking</u></p>
        <p>The prices displayed on our Website as offered by the Accommodation Providers are highly competitive. Relevant fees and taxes (including tourist/city tax) may be charged by the Accommodation Provider in case of a no-show or cancellation.</p>
        <p>4.1.1 Travelonio.com aims to display search results relevant to each specific Guest, by providing a personalised default ranking of Accommodations on the Website.</p>
        <br>
        <p>4.2 <u>Guest Reviews</u></p>
        <p>4.2.1 Guests who have stayed at the Accommodation might be asked by Travelonio.com to comment on and provide a score for certain aspects of their stay. Travelonio.com may post these reviews on the Website. Travelonio.com is a distributor and not a publisher of these reviews. Travelonio.com shall have no obligation to verify the accuracy or completeness of the reviews, and shall have no liability or responsibility for the content and consequences of the publication or distribution of the reviews.</p>
        <p>4.2.2 Travelonio.com may at its sole discretion refuse, edit or remove reviews where they include or refer to anything that Travelonio.com reasonably determines to be inappropriate and/or offensive.</p>
        <p>4.2.3 The Accommodation shall not directly or indirectly manipulate or attempt to manipulate Guest reviews (for example by paying for positive reviews or by posting fake reviews of a competitor property). Travelonio.com reserves the right to remove the Accommodation from its Website if it believes this clause has been breached. </p>
        <br>
        <p>4.3. <u>Facilitated Payment</u></p>
        <p>4.3.1 Travelonio.com may offer Facilitated Payment services. Travelonio.com may from time to time engage a third party to facilitate and process payments under the Facilitated Payment (the <b>"Payment Processor"</b>). Travelonio.com contracts with Payment Processors for the purposes of collecting payments from Guests and transferring funds to and settling funds with Accommodations.</p>
        <p>4.3.2 Any payment made by a Guest to Travelonio.com or a Payment Processor as agent for the Accommodation shall satisfy and discharge a corresponding amount of the Guest's debt to the Accommodation. Travelonio.com may, to the extent permitted by law, charge or require compensation from the Accommodation for costs and expenses, plus Taxes (if applicable), for and related to the Facilitated Payment service and the underlying payment transaction (including the fees, costs and other amounts as charged by its payment processors, banks or credit card companies for such transaction). The Accommodation shall pay the Facilitated Payment Fees in accordance with the terms of the invoice.</p>
        <p>4.3.3 If Travelonio.com (via the Payment Processor) fails to transfer any funds due to the Accommodation under the Facilitated Payment, the Accommodation will have recourse only against Travelonio.com and not against the Guest directly.</p>
        <br>
        <p>4.4. <u>Payment via Bank Transfer</u></p>
        <p>4.4.1 The Accommodation shall provide correct Bank Account details to Travelonio.com. Travelonio.com shall transfer the Net Amount or Gross Amount to the Bank Account. The Accommodation shall bear all risk arising from incorrect information being provided to Travelonio.com such as incorrect Bank Account details. Payment of the Net Amount or Gross Amount by bank transfer will be made within 14 days of the end of the month in which the Guest has checked out, unless otherwise communicated by Travelonio.com. </p>
        <br>
        <h3>5. Representation and Warranties </h3>
        <p>5.1 The Accommodation represents and warrants to Travelonio.com that for the term of the Agreement:</p>
        <ul><li>the Accommodation has all necessary rights, power and authority to use, operate, own (as applicable), (sub)license and to permit Travelonio.com to make available on the Website the Accommodation, and all Intellectual Property in respect of the Accommodation as set out or referred to in the Accommodation Information;</li><li> the Accommodation holds and complies with all permits, licenses and other governmental authorisations, registrations and requirements (including mandatory information-sharing with authorities) necessary for conducting its business and making the Accommodation available on the Website for reservation;</li><li>the Accommodation is duly registered with all relevant tax authorities (including applicable statutory (local) revenue collection authorities) as a hotel or other accommodation provider.</li></ul>
        <br>
        <h3>6. Term, Termination and Suspension </h3>
        <p>6.1 Unless otherwise agreed, the Agreement shall commence on the date of acceptance by the Accommodation and shall continue for an indefinite period of time. The Accommodation may terminate the Agreement at any time and for any reason by written notice to Travelonio.com with a notice period of 15 days.</p>
        <p>6.2 Each Party may terminate the Agreement with immediate effect in the event of:</p>
        <ul><li>a legal or regulatory obligation;</li><li>an imperative reason under applicable law;</li><li>a repeated infringement of the Agreement by the other Party; or</li><li>a material breach by the other Party, including but not limited to instances of illicit or inappropriate content and or fraud.</li></ul>
        <p>6.3 Without prejudice to Clauses 6.1 and 6.2, Travelonio.com may by notice in writing (which includes a statement of reasons) restrict or suspend all or part of its obligations, covenants and undertakings pursuant to the Agreement with immediate effect, and/or may terminate the Agreement and/or close its Website for the Accommodation after a notice period of 5 calendar days, in any of the following (reasonably anticipated or suspected) events or circumstances:</p>
        <ul><li>a breach by the Accommodation of any term of the Agreement;</li><li>(a filing or submission of a request for) bankruptcy, insolvency or suspension of payment or a similar action or event in respect of the Accommodation;</li><li>failure to pay any of Travelonio.com’s invoices, debit notes or charges by the due date;</li><li>a bad faith attempt to avoid payment of Commission and/or decrease Commission;</li><li>the provision of inaccurate, outdated, incomplete, misleading or fraudulent information by the Accommodation, including posting Accommodation Information of this nature on the Internet;</li><li>failure to accept a reservation at the price and/or conditions shown on a reservation or non-adherence to the agreed price and/or conditions of a reservation;</li><li>the Accommodation overcharging a Guest;</li><li>a serious complaint from one or more Guests or a third party;</li><li>epeated poor ratings or reviews;</li><li>the Accommodation directly or indirectly manipulating or attempting to manipulate a reservation or the functioning of the Website (e.g. by manipulating Guest reviews);</li><li>any safety, security, privacy or health issues or problems relating to the Accommodation or its facilities (the Accommodation shall at its own cost and at the request of Travelonio.com deliver to Travelonio.com relevant permits, licenses, certificates and statements issued by an independent expert evidencing and supporting its compliance with applicable (privacy, safety and health) laws and legislation);</li></ul>
        <p>6.4 Any notice or communication by Travelonio.com of "closure" (or similar wording) of the Accommodation on the website shall mean termination of the Agreement. After termination or suspension of the Agreement, the Accommodation shall honour outstanding reservations for Guests and shall pay all Commission (plus costs, expenses and interest if applicable) due on those reservations in accordance with the terms of the Agreement. Upon termination or suspension of the Agreement and notwithstanding Travelonio.com’s right to (permanently) remove the Accommodation from the Website, Travelonio.com may keep and maintain the Accommodation page on the Website, but close availability (status "closed operations") pending full and final payment of any due and outstanding amounts (including any Commission).</p>
        <p>6.5 If there is a change of ownership or operator of the Accommodation (meaning property) including any assignment, transfer or novation of the Agreement, the Accommodation agrees that the new owner or operator may use the Accommodation Information, including the Guest Reviews, that was available to or used by the Accommodation prior to the change of ownership, and shall have access to the relevant (financial and operational) performance, management and (customer) data. The Accommodation shall in any event remain responsible and liable for all obligations, claims and liabilities relating to or accrued during the period prior to the change of ownership or operator.</p>
        <br>
        <h3>7. Dispute Resolution</h3>
        <p>7.1 <u>Applicable Law & Forum</u></p>
        <p>7.1.1 Unless set out otherwise in the Agreement, the Agreement shall be exclusively governed by and construed in accordance with the laws of the Republic of Kosovo. Any disputes arising out of or in connection with the Agreement shall exclusively be submitted to and dealt with by the competent court in Prishtina, Kosovo.</p>
        <p>7.2 <u>Applicable Language</u></p>
        <p>The whole text of the Agreement, as well as the documents derived from it, have been written in Albanian and English, both versions being deemed authentic, but for legal purposes and for the purpose of settling disputes which might arise, text in Albanian language shall prevail.</p>`,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {});
}

export function hostsTermsAndConditionsDialogShqip(
  event: Event,
  dialog: MatDialog
): void {
  event.preventDefault();
  event.stopPropagation();
  const dialogRef = dialog.open(CustomDialogComponent, {
    width: '639.72px',
    panelClass: 'custom-dialog',
    data: {
      title: 'Kushtet e Përgjithshme të Përdorimit',
      template: `
        <p><b>Travelonio.com</b></p>
        <p>Këto Kushte të Përgjithshme të Përdorimit rregullojnë përdorimin e faqes së internetit www.travelonio.com dhe çdo shërbim të ndërlidhur nga Akomodimet te ofruara nga Behind the Comma Shpk e inkorporuar sipas ligjeve të Republikës se Kosovës me numrin fiskal 811872242 dhe janë të lidhura ndërmjet Akomodimeve dhe Travelonio.com.</p>
        <p>Duke hyrë në Travelonio.com, ju pranoni të respektoni këto Kushte të Përgjithshme të Përdorimit dhe të pajtoheni me të gjitha ligjet dhe rregulloret në fuqi. Nëse nuk jeni dakord me këto Kushte të Përgjithshme të Përdorimit, ju ndalohet të përdorni këtë faqe interneti ose të përdorni ndonjë shërbim tjetër të ofruar nga Behind the Comma Shpk.</p>
        <p>Ne, Behind the Comma Shpk, rezervojmë të drejtën për të rishikuar dhe ndryshuar ndonjë apo të gjitha këto Kushte të Përgjithshme të Përdorimit sipas gjykimit tonë. Pasi ta bëjmë këtë, ne do ta përditësojmë këtë faqe. Çdo ndryshim në këto Kushte të Përgjithshme të Përdorimit do të hyjë në fuqi menjëherë nga data e publikimit.</p>
        <br>
        <h3>1. Përkufizime</h3>
        <p>1.1 Përkufizimet e mëposhtme zbatohen në të gjithë Marrëveshjen, përveç nëse shfaqet qëllimi i kundërt:</p>
        <p><b>"Akomodim"</b> nënkupton subjektin juridik (person juridik ose fizik) që është nënshkrues i kësaj Marrëveshjeje dhe, në raste tjera, Ofruesi i Akomodimit (që do të thotë pronë) në lidhje me të cilin subjekti juridik është kontraktues dhe për të cilin këto Kushte janë të zbatueshme.</p>
        <p><b>"Informacion për akomodimin"</b> nënkupton informacionin e dhënë nga dhe në lidhje me Akomodimin për t'u përfshirë në Faqen e Internetit, duke përfshirë fotografitë, përshkrimet, komoditetet dhe shërbimet e tij, dhomat e disponueshme për rezervim, detajet e tarifave (duke përfshirë të gjitha taksat e aplikueshme, përveç rasteve kur ligji i zbatueshme parashikon ndryshe, dhe tarifa shtesë), disponueshmërinë, anulimin (cancellation) dhe politikat e mos-shfaqjes (no-show policies) dhe politikat dhe kufizimet e tjera.</p>
        <p><b>"Shërbimi i Rezervimit"</b> nënkupton blerjen, porosinë, pagesën (të lehtësuar) ose shërbimin e rezervimit, siç ofrohet ose mundësohet nga Travelonio.com në lidhje me produkte dhe shërbime të shumta, të cilat herë pas here vihen në dispozicion nga Akomodimi në Faqen e Internetit.</p>
        <p><b>"Rezervim"</b> nënkupton porosinë, blerjen, pagesën, rezervimin ose rezervimin e një akomodimi.</p>
        <p><b>"Të Dhënat e Klientit"</b> do të thotë datat e mbërritjes dhe nisjes, numri i netëve të rezervuara, lloji i dhomës (duke përfshirë preferencën për pirjen e duhanit nëse ka), çmimin e dhomës, emrin e vizitorit, adresën dhe çdo kërkesë tjetër specifike të bërë nga Mysafiri.</p>
        <p><b>"Pagesa e Lehtësuar"</b> do të thotë mënyrat e pagesës që Travelonio.com mund t'i vërë herë pas here të disponueshme në Faqen e Internentit Travelonio.com për pagesën, duke përfeshirë paradhenje (pre-/down-payments) të çmimit të dhomës nga një Mysafir te Akomodimi dhe për pagesën e komisionit nga Akomodimi te Travelonio.com (nese është e aplikueshme) në bazë të së cilës transferta bankare, pagesa me kartë krediti ose forma të tjera pagesash në internet (nese janë të disponueshme) mund të bëhen dhe të përpunohen për dhe në emër të Akomodimit.</p>
        <p><b>"Mysafir"</b> do të thotë një vizitor i Faqes se Internetit ose një klient ose mysafir i Akomodimit.</p>
        <p><b>"Faqe Interneti"</b> do të thotë faqe internetit (website), desktop ose mobile, në të cilin Shërbimi i Rezervimit vihet në dispozicion, është në pronësi, kontroll, menaxhim, mirëmbajtje dhe/ose drejtim programi (hosted) nga Travelonio.com.</p>
        <p><b>"Ngjarje e Forcës Madhore" ("Force Majeure Event")</b> do të thotë ndonjë nga ngjarjet e mëposhtme që prek shumë Mysafir dhe Akomodime të shumta: akte të Zotit, shpërthim vullkanik, fatkeqësi (natyrore), zjarr, (akte) lufte, armiqësi ose ndonjë emergjencë lokale ose kombëtare, pushtim, respektim çdo urdhër ose kërkesë e çdo autoriteti kombëtar, provincial, portual ose tjetër publik, rregullore ose ndërhyrje qeveritare, veprim ushtarak, luftë civile ose terrorizëm, shpërthim (biologjik, kimik ose bërthamor), rebelim, trazira, greva, kryengritjeje, trazira civile (ose kërcënim material ose thelbësor ose mundësia e justifikuar e ndonjë ngjarjeje të tillë), shkurtimi i mjeteve të transportit, mbyllja e aeroporteve ose ndonjë ngjarje tjetër e jashtëzakonshme dhe katastrofike, rrethanë ose emergjente, duke parandaluar ose bërë të pamundur ose të paligjshëm për Mysafirët udhëtimin ose qëndrimin te Akomodimi.</p>
        <p><b>"Ne Harmonizojmë Çmimin" ("We Price Match")</b> nënkupton garancinë e lëshuar nga Travelonio.com duke deklaruar se Travelonio.com ofron çmimin më të mirë për një dhomë dhe se asnjë tarifë më e ulët nuk mund të gjendet në internet për dhomën ekuivalente me të njëjtat data të check-in dhe check-out dhe të njëjtat kushte rezervimi.</p>
        <br>
        <h3>2. Shtrirja dhe Natyra e Shërbimit tonë</h3>
        <p>2.1 Nëpërmjet travelonio.com, Behind the Comma Shpk, ofron një platformë në internet përmes së cilës Akomodimi mund të ofrojë produktet dhe shërbimet e tyre për porosi, blerje, rezervim, qiramarrje dhe përmes së cilës vizitorët e faqes në internet mund të hulumtojnë, kërkojnë, krahasojnë dhe bëjnë një porosi, rezervim, blerje ose pagesë (dmth. Shërbimi i Rezervimit). Duke përdorur Shërbimin e Rezervimit (p.sh. duke bërë një Rezervim nëpërmjet Shërbimit të Rezervimit), Vizitori hyn në një marrëdhënie kontraktuale të drejtpërdrejtë (ligjërisht të detyrueshme) me Akomodimin me të cilin Vizitori(ët) bën një rezervim.</p>
        <p>2.2 Ne veprojmë vetëm si ndërmjetës midis Mysafirit dhe Akomodimit, duke transmetuar detajet përkatëse për Rezervimin tek Akomodimi(et) përkatëse dhe duke i dërguar Mysafirit një email konfirmimi për dhe në emër të Akomodimit. Travelonio.com nuk (ri) shet, jep me qira, nuk ofron asnjë produkt ose shërbim (udhëtimi ose turistikë).</p>
        <p>2.3 Kur ofrojmë Shërbimin tonë të Rezervimit, informacioni që ne ekspozojmë bazohet në informacionin që na jepet nga Akomodimi. Megjithëse ne do të përdorim aftësi dhe kujdes të arsyeshëm gjatë ofrimit të Shërbimit të Rezervimit për Mysafirët, ne nuk mund të garantojmë që të gjitha informacionet janë të sakta dhe të plota dhe as nuk mund të mbajmë përgjegjësi për ndonjë gabim (përfshirë gabimet e dukshme dhe tipografike), çdo ndërprerje (qoftë nëse për shkak të ndonjë avarie (të përkohshme dhe/ose të pjesshme), riparimi, përmirësimi ose mirëmbajtjeje të faqes sonë të internetit ose ndryshe), informacione të pasakta, mashtruese ose të pavërteta ose mosprezentim i informacionit. Çdo Akomodim mbahet përgjegjës për saktësinë, plotësinë dhe korrektësinë e informacionit (përfshirë tarifat/komisionet/çmimet, politikat dhe kushtet dhe disponueshmërinë) të shfaqura në Faqen tonë të Internetit. Travelonio.com nuk përbën dhe nuk duhet të konsiderohet si një rekomandim ose miratim i cilësisë, nivelit të shërbimit, klasës së hotelit ose vlerësimit (yll) të çdo Akomodimi (ose objekteve, vendit, produkteve ose shërbimeve të tij) të vëna në dispozicion.</p>
        <p>2.4 Shërbimi ynë i Rezervimit është i disponueshëm vetëm për përdorim personal dhe jokomercial. Prandaj, nuk ju lejohet të rishitni, lidhni, përdorni, kopjoni, monitoroni (p.sh. merimangë “spider”, gërvishtni “scrape”), shfaqni, shkarkoni ose riprodhoni ndonjë përmbajtje ose informacion, softuer, rezervime, produkte ose shërbime të disponueshme në këtë Faqe Interneti për ndonjë qëllim komercial ose konkurrues.</p>
        <br>
        <h3>3. Detyrimet e Akomodimit</h3>
        <p>3.1 Informacioni i Akomodimit</p>
        <p>3.1.1 Informacioni i Akomodimit duhet të jetë në përputhje me formatet dhe standardet e ofruara nga Travelonio.com. Informacioni i Akomodimit nuk duhet të përmbajë referenca ose lidhje me Akomodimin ose palët e treta, duke përfshirë numrat e telefonit ose faksit, adresën e emailit, mediat sociale, faqen e internetit, aplikacionin ose platformën e Akomodimit ose palëve të treta. Travelionio.com rezervon të drejtën të modifikojë ose përjashtojë çdo informacion që është i pasaktë ose i paplotë ose në kundërshtim me marrëveshjen.</p>
        <p>3.1.2 Akomodimi përfaqëson dhe pajtohet se Informacioni i Akomodimit duhet të jetë në çdo kohë i vërtetë, i saktë dhe jo mashtrues. Akomodimi është përgjegjës për një deklaratë të saktë dhe të përditësuar të Informacionit të Akomodimit, duke përfshirë disponueshmërinë shtesë të dhomave për periudha të caktuara ose çdo ngjarje dhe situatë të jashtëzakonshme (p.sh. rinovim ose ndërtim në ose afër objektit). Akomodimi do të përditësojë Informacionin e Akomodimit në baza ditore (ose më të shpeshta siç mund të kërkohet) drejtpërdrejt në internet përmes faqes së internetit të Travelonio.com.</p>
        <br>
        <p>3.2 Barazi (Parity)</p>
        <p>3.2.1 Akomodimi pranon t'i japë Travelonio.com <b>"Barazi të Çmimeve dhe Kushteve"</b> ("Rate and Conditions Parity"), që do të thotë tarifa të njëjta ose më të mira për të njëjtin Akomodim, lloj dhome, data, lloj shtrati, numër të mysafirëve, pajisje dhe shtesa të njëjta ose më të mira (p.sh. mëngjes falas, Wi-Fi, arkë e hershme/vonë), dhe kufizime dhe politika të njëjta ose më të mira, si p.sh. rregullat dhe politikat për ndryshimin ose anulimin e rezervimit, siç vihen në dispozicion nga Akomodimi.</p>
        <p>3.2.2 Akomodimi pranon të japë, për çdo datë kalendarike dhe në varësi të disponueshmërisë, disponueshmëri për të gjitha dhomat dhe llojet e dhomave dhe inkurajohet t'i ofrojë Travelonio.com qasje të drejtë në të gjitha dhomat dhe llojet e dhomave dhe tarifave të disponueshme gjatë afatit të Marrëveshjes.</p>
        <br>
        <p>3.3 Komisioni</p>
        <p>3.3.1 Për çdo rezervim të bërë përmes Platformës nga një mysafir për një dhomë, Akomodimi do t'i paguajë Travelonio.com një komision siç specifikohet në pasqyrën e komisionit ose të specifikuar gjatë procesit të regjistrimit të pronës, i llogaritur si shumëfish i çmimit total bruto të rezervimi, duke përfshirë çmimin e dhomës për kohëzgjatjen e qëndrimit, taksat e aplikueshme dhe shtesa dhe tarifa të tjera.</p>
        <p>3.3.2 Travelonio.com do të ngarkojë një komision në rast të:</p>
        <p>(i) rezervimi i tepërt (overbooking): në çdo kohë, pavarësisht nga heqja dorë nga kërkesa për pagesë nga ana e Akomodimit; dhe/ose</p>
        <p>(ii) një anulim i paguar dhe/ose mos-shfaqje e paguar.</p>
        <p>Komisioni do të llogaritet në përputhje me rezervimin e konfirmuar siç i është dhënë Akomodimit dhe i konfirmuar nga Travelonio.com tek Mysafiri.</p>
        <p>3.3.3 Akomodimi do të njoftojë Travelonio.com për heqjen dorë nga çdo pagesë (dhome) ose tarife në rast të një anulimi ose të mos-shfaqjes (no-show), brenda 48 orëve pas mesnatës nga dita e datës së planifikuar të përfundimit të shërbimit (check-out date), Travelonio.com do të informojë më pas Mysafirin lidhur me rrethanat dhe Akomodimi do të përpunojë menjëherë rimbursimin tek Mysafiri (nëse është e aplikueshme).</p>
        <p>3.3.4 Akomodimi është përgjegjës për informimin e Travelonio.com në lidhje me (dhe çdo ndryshim në) taksat e zbatueshme (përveç rasteve kur ligji i zbatueshëm parashikon ndryshe) të cilat do t'i tarifohen Mysafirit nga Akomodimi pas rezervimit për tarifat me parapagim (pre-paid) ose pas përfundimit të shërbimit (check-out) për rezervime me pagesë të mëvonshme (post-paid). Nëse nuk është rënë dakord ndryshe nga Travelonio.com ose nuk lejohet nga ligji në fuqi, tarifa e treguar për Mysafiret në platformë duhet të përfshijë taksat.</p>
        <br>
        <p>3.4 Pagesat e Faturës te Travelonio.com</p>
        <p>3.4.1 Komisioni do të faturohet dhe paguhet muajin kalendarik pas datës (të planifikuar) të largimit të Mysafirit.</p>
        <p>3.4.2 Komisioni do të paguhet në përputhje me kushtet e mëposhtme:</p>
        <p>(i) faturat përpunohen në baza mujore dhe do të vihen në dispozicion të Akomodimit nëpërmjet internetit. Travelonio.com gjithashtu mund t'i dërgojë faturat me e-mail tek Akomodimi;</p>
        <p>(ii) Akomodimi do të paguajë faturën brenda 14 ditëve nga data e faturës;</p>
        <p>(iii) pagesa do të bëhet nga Akomodimi drejtpërdrejt në Travelonio.com nëpërmjet transfertës bankare ose çdo mënyre tjetër pagese të rënë dakord nga Travelonio.com. Akomodimi do të merrë përsiper të gjitha tarifat bankare për transferimin e fondeve.</p>
        <p>(v) Komisioni i faturuar nga Travelonio.com do të paguhet nga Akomodimi në monedhën EURO. Akomodimi është përgjegjës që Travelonio.com të pranoj të plotë shumën e specifikuar të faturimit.</p>
        <p>3.4.3 Nëse ka një mosmarrëveshje midis Travelonio.com dhe Akomodimit (p.sh. për shumën e komisionit), Akomodimi do të paguajë çdo pjesë të pakontestueshme të Komisionit në përputhje me kushtet e Marrëveshjes, pavarësisht statusit ose natyrës së mosmarrëveshjes.</p>
        <p>3.4.5 Nëse Akomodimi vonon pagesën e tij në Travelonio.com, Travelonio.com mund të kërkojë pagesë shtesë në formë interesi, të pezullojë shërbimin e tij sipas Marrëveshjes (p.sh. duke pezulluar Akomodimin nga Platforma).</p>
        <p>3.5 Rezervimi, Rezervimi i Mysafirëve, Ankesat dhe Ne Harmonizojmë Çmimin</p>
        <p>3.5.1 Akomodimi do të marrë një konfirmim për çdo rezervim të bërë nga një Mysafir nëpërmjet Platformës. Konfirmimi do të përfshijë të dhënat e klientit, të cilat përfshijnë, por nuk kufizohen në të gjitha të dhënat personale të Mysafirit. Travelonio.com nuk mban përgjegjësi për saktësinë dhe plotësinë e informacionit dhe datave të ofruara nga Mysafirët. Travelonio.com nuk është përgjegjës për detyrimet e pagesës së Mysafirëve në lidhje me rezervimet e tyre. Akomodimi do të kontrollojë dhe verifikojë rregullisht (të paktën çdo ditë) statusin e rezervimeve në Platformën Travelonio.com.</p>
        <p>3.5.2 Duke bërë një rezervim përmes Platformës, krijohet një kontratë e drejtpërdrejtë ligjore midis Akomodimit dhe Mysafirit. Travelonio.com nuk është palë në këtë kontratë.</p>
        <p>3.5.3 Akomodimi duhet të pranojë një Mysafir si palën e tij kontraktuale dhe duhet të trajtojë rezervimin në internet në përputhje me informacionin e akomodimit që gjendet në platformë në kohën kur është bërë rezervimi si dhe informacioni dhe dëshirat shtesë (nëse ka) që janë bërë të njohura nga Mysafiri.</p>
        <p>3.5.4 Përveç tarifave, shtesave dhe komisioneve të përcaktuara në konfirmimin e rezervimit të dërguar nga Travelonio.com tek Mysafiri, Akomodimi nuk do t'i ngarkojë mysafirit asnjë tarifë transaksioni ose administrimi ose tarifë për përdorimin e ndonjë mënyre pagese (p.sh. Tarifë për përdorimin e kredit kartës).</p>
        <p>3.5.5 Ankesat ose pretendimet në lidhje me produktet ose shërbimet e ofruara nga Akomodimi ose kërkesat specifike të bëra nga Mysafirët do të menaxhohen nga Akomodimi pa kërkuar përfshirjen e Travelonio.com. Travelonio.com nuk është përgjegjës dhe nuk ka asnjë përgjegjësi në lidhje me ankesat ose pretendimet e tilla. Travelonio.com mundet sipas dëshires së tijë:</p>
        <p>(i) të ofrojë shërbime (mbështetjeje) të klientit për një Mysafir;</p>
        <p>(ii) të veprojë si ndërmjetës midis akomodimit dhe një mysafiri; dhe</p>
        <p>(iii) të sigurojë me shpenzimet e Akomodimit, akomodim alternativ të një standardi të barabartë ose më të mirë në rast të një rezervimi të tepërt ose parregullsive ose ankesave të tjera materiale në lidhje me Akomodimin.</p>
        <p>3.5.6 Aty ku Travelonio.com.com ka të drejtë për Barazi të Çmimeve dhe Kushteve ose Barazi të Tarifës dhe një Mysafir ka një pretendim të vlefshëm sipas Ne Harmonizojmë Çmimin (We Price Match), Travelonio.com do të njoftojë menjëherë Akomodimin për detajet përkatëse të kërkesës. Akomodimi do të rregullojë menjëherë tarifat e disponueshme në platformë në mënyrë që tarifa më e ulët të jetë e disponueshme për rezervime të mëtejshme. Akomodimi gjithashtu do të rregullojë menjëherë tarifën në rezervimin e bërë nga Mysafiri që ka paraqitur kërkesën. Kur vizitori largohet (checks-out), akomodimi do t’i ofrojë dhomën me tarifën më të ulët dhe ose (i) do të korrigjojë diferencën midis tarifës së rezervuar dhe tarifës më të ulët duke e ngarkuar Mysafirin me tarifën më të ulët, ose (ii) duke i rimbursuar (në cash) Mysafirit diferencen midis dy tarifave.</p>
        <p>3.6 Mbi rezervime dhe anulime</p>
        <p>3.6.1 Akomodimi do t'i garantojë Mysafirit dhomat e rezervuara. Nëse Akomodimi nuk është në gjendje të përmbushë detyrimet e tij sipas Marrëveshjes për ndonjë arsye, ai do të informojë menjëherë Travelonio.com nëpërmjet çdo kanali, emaili, telefoni ose platforme të disponueshme. Nëse Travelonio.com nuk ka rregulluar (dhe Akomodimi ka verifikuar) akomodim alternativ, Akomodimi do të bëjë përpjekjet e tij më të mira për të ofruar një dhomë(a) alternative me cilësi të barabartë ose superiore me shpenzimet e veta. Nëse nuk disponohet një dhomë e tillë gjatë mbërritjes, Akomodimi do të:</p>
        <p>(i) të gjejë akomodim alternativ të përshtatshëm të një standardi të barabartë ose superior me Akomodimin që mban rezervimi i garantuar i Mysafirit;</p>
        <p>(ii) të sigurojë transport privat falas në akomodimin alternativ për Mysafirin dhe anëtarët që janë të listuar në rezervimin e garantuar të Mysafirit; dhe</p>
        <p>(iii) të rimbursojë dhe kompensojë Travelonio.com dhe/ose Mysafirin për të gjitha kostot dhe shpenzimet e arsyeshme (p.sh. kostot e akomodimit alternativ, transportit, shpenzimet e telefonit) të shkaktuara nga Mysafiri dhe/ose Travelonio.com si rezultat i rezervimit të tepërt. Çdo shumë që i detyrohet Travelonio.com sipas kësaj klauzole do të paguhet nga Akomodimi brenda 14 ditëve pas marrjes së faturës.</p>
        <p>3.6.2 Akomodimi nuk mund të anulojë asnjë rezervim online. Kur pretendohet ose dyshohet për ndonjë aktivitet mashtrues (p.sh. në lidhje me rezervimet, mashtrimin me karta krediti, pastrim parash ose pagesën e çmimit të dhomës), Travelonio.com mund të anulojë rezervimin përkatës. Travelonio.com do të informojë Akomodimin për çdo veprim që ajo ndërmerr në përputhje me këtë klauzole 3.6.2.</p>
        <p>3.6.3 Anulimet e bëra nga Mysafirët përpara pikës në të cilën aplikohet një tarifë anulimi nuk do të ju aplikohet Komision. Anulimet e bëra nga Mysafirët pas kësaj pike do të ju aplikohet Komision në përputhje me kushtet e Marrëveshjes.</p>
        <br>
        <p>3.7 Shërbimi i mesazheve</p>
        <p>3.7.1 Travelonio.com mundet herë pas here si pjesë e shërbimit të tij për Mysafirin dhe Akomodimin të lehtësojë komunikimin midis Mysafirit, Akomodimit dhe Travelonio.com (<b>"Shërbimi i Mesazheve"</b>). Travelonio.com mund të përpunojë (duke përfshirë çdo ruajtje, marrje, qasje, pasqyrën dhe kontroll) komunikimet e dërguara nëpërmjet Shërbimit të Mesazheve (<b>"Komunikimet"</b>) për ofrimin e Shërbimit për Mysafirin dhe Akomodimin.</p>
        <p>3.7.2 Akomodimi kupton dhe pranon që Travelonio.com do të përpunojë (përfshirë ruajtjen, marrjen,qasjen, pasqyrën dhe kontrollimin) komunikimet dhe garantonë që ka informuar (dhe, siç mund të kërkohet nga ligjet në fuqi, ka marrë të gjitha autorizimet e nevojshme nga) punonjësit, agjentët, përfaqësuesit, anëtarët e stafit dhe individë të tjerë të tij përpara përdorimit të Shërbimit të Mesazheve për ose në emër të Akomodimit.</p>
        <p>3.7.3 Akomodimi nuk do të përdorë Shërbimin e Mesazheve për të dërguar komunikime elektronike të pakërkuara te ndonjë individ dhe dëmshpërblen plotësisht Travelonio.com për çdo pretendim nga palët e treta dhe çdo gjobë që rezulton nga përdorimi i paligjshëm ose i paautorizuar i Shërbimit të Mesazheve nga Akomodimi.</p>
        <br>
        <p>3.8 Forca madhore (Force Majeure)</p>
        <p>3.8.1 Kur ndodh një ngjarje e Forcës Madhore, Akomodimi nuk do të tarifojë dhe do t'u paguajë, nëse është e aplikueshme, vizitorëve të prekur nga Ngjarja e Forcës Madhore çdo tarifë, kosto, shpenzime ose shumë tjetër (duke përfshirë tarifën (e pakthyeshme) ose tarifën për mos-shfaqje, (ndryshim) ose anulimi të rezervimit) për:</p>
        <p>(i) çdo anulim ose ndryshim në rezervimin e bërë nga Mysafirët; ose</p>
        <p>(ii) pjesa e rezervimit që nuk është përdorur për shkak të ngjarjes së Forcës Madhore.</p>
        <p>3.8.2 Nëse ka dyshime të arsyeshme dhe të justifikuara, Akomodimi mund t'i kërkojë një Mysafiri të sigurojë prova të arsyeshme të ndërlidhjes së ngjarjes së Forcës Madhore dhe anulimit, mos-paraqitjes ose ndryshimit të rezervimit të tyre. Akomodimi do t'i sigurojë Travelonio.com një kopje të provave të tilla sipas kërkesës. Në mënyrë që Travelonio.com të regjistrojë çdo anulim, mos-shfaqje ose ndryshim të rezervimit për shkak të një ngjarjeje të Forcës Madhore, Akomodimi do të informojë Travelonio.com për numrin e ditëve të qëndruara në akomodim nga Mysafiri brenda dy ditëve të punës pas datës së planifikuar të largimit të mos-shfaqjes ose anulimit, ose largimit. Travelonio.com nuk do të tarifojë asnjë komision në lidhje me pjesën e rezervimit që nuk përdoret për shkak të ngjarjes së Forcës Madhore.</p>
        <br>
        <h3>4. Renditja, Vlerësimet e Mysafirëve, Marketingu, Lehtësimi i Pagesave dhe Transferet Bankare</h3>
        <br>
        <p>4.1 Renditja</p>
        <p>4.1.1 Travelonio.com synon të shfaqë rezultatet e kërkimit relevante per secilin Mysafir specifik, duke ofruar një renditje të personalizuar të paracaktuar të Akomodimeve në platformë</p>
        <br>
        <p>4.2 Vlerësimet e Mysafirëve</p>
        <p>4.2.1 Vizitorëve që kanë qëndruar në Akomodim mund t'u kërkohet nga Travelonio.com të komentojnë dhe të japin një notë për disa aspekte të qëndrimit të tyre. Travelonio.com mund t'i postojë këto komente në Platformë. Travelonio.com është një shpërndarës dhe jo një botues i këtyre komenteve. Travelonio.com nuk do të ketë asnjë detyrim për të verifikuar saktësinë ose plotësinë e vlerësimeve dhe nuk do të ketë asnjë përgjegjësi për përmbajtjen dhe pasojat e publikimit ose shpërndarjes së vlerësimeve.</p>
        <p>4.2.2 Travelonio.com mundet sipas gjykimit të tij të refuzojë, modifikojë ose heqë komentet ku ato përfshijnë ose i referohen çdo gjëje që Travelonio.com e përcakton në mënyrë të arsyeshme si të papërshtatshme dhe/ose fyese.</p>
        <p>4.2.3 Akomodimi nuk duhet të manipulojë drejtpërdrejt ose tërthorazi ose të përpiqet të manipulojë komentet e vizitorëve (për shembull duke paguar për komente pozitive ose duke postuar komente të rreme të një prone konkurrenti). Travelonio.com rezervon të drejtën të heqë Akomodimin nga platforma e tij nëse beson se kjo klauzolë është shkelur.</p>
        <br>
        <p>4.3. Lehtësimi i Pagesave</p>
        <p>4.3.1 Travelonio.com mund të ofrojë shërbime të Pagesës së Lehtësuar. Travelonio.com herë pas here mund të angazhojë një palë të tretë për të lehtësuar dhe përpunuar pagesat sipas Pagesës së Lehtësuar (<b>"Përpunuesi i Pagesave"</b>). Travelonio.com kontrakton me Përpunuesit e Pagesave për qëllime të mbledhjes së pagesave nga Mysafirët dhe transferimit të fondeve dhe shlyerjes së fondeve me Akomodimet</p>
        <p>4.3.2 Çdo pagesë e bërë nga një Mysafir në Travelonio.com ose një Përpunues Pagesash si agjent për Akomodimin për shumën e paraparë duhet të konsiderohët si shlyerje borxhi të Vizitorit ndaj Akomodimit dhe të transferohet të Akomodimi. Travelonio.com, në masën e lejuar nga ligji, mund të ngarkojë ose të kërkojë kompensim nga Akomodimi për kostot dhe shpenzimet, plus taksat (nëse është e aplikueshme), për dhe që lidhen me shërbimin e Pagesave të Lehtësuara dhe transaksionin bazë të pagesës (përfshirë tarifat, kostot dhe shuma të tjera të ngarkuara nga përpunuesit e pagesave, bankat ose kompanitë e kartave të kreditit për një transaksion të tillë). Akomodimi do të paguajë tarifat e pagesës së lehtësuar në përputhje me kushtet e faturës.</p>
        <p>4.3.3 Nëse Travelonio.com (nëpërmjet Përpunuesit të Pagesave) dështon të transferojë ndonjë pagesë tek Akomodimi sipas Pagesës së Lehtësuar, Akomodimi do të ketë kerkesë vetëm kundër Travelonio.com dhe jo kundër Vizitorit drejtpërdrejt.</p>
        <br>
        <p>4.4. Pagesa me Transfertë Bankare</p>
        <p>4.4.1 Akomodimi do të japë detaje të sakta të llogarisë bankare për Travelonio.com. Travelonio.com do të transferojë shumën neto ose shumën bruto në llogarinë bankare. Akomodimi do të mbajë të gjithë rrezikun që rrjedh nga informacioni i pasaktë që i jepet Travelonio.com si p.sh. detaje të pasakta të llogarisë bankare. Pagesa e shumës neto ose shumës bruto me transfertë bankare do të bëhet brenda 14 ditëve nga fundi i muajit në të cilin Vizitori ka lëshuar pronen (check-out), përveç nëse komunikohet ndryshe nga Travelonio.com.</p>
        <br>
        <h3>5. Përfaqësimi dhe garancitë</h3>
        <p>5.1 Akomodimi përfaqëson dhe garanton Travelonio.com se për afatin e Marrëveshjes:</p>
        <p>(i) Akomodimi ka të gjitha të drejtat, fuqinë dhe autoritetin e nevojshëm për të përdorur, operuar, zotëruar (sipas rastit), (nën)licencë dhe për të lejuar Travelonio.com të vërë në dispozicion në Platformë Akomodimin dhe të gjithë Pronën Intelektuale në lidhje me Akomodimi siç përcaktohet ose referohet në Informacionin e Akomodimit;</p>
        <p>(ii) Akomodimi mban dhe përputhet me të gjitha lejet, licencat dhe autorizimet e tjera qeveritare, regjistrimet dhe kërkesat (përfshirë ndarjen e detyrueshme të informacionit me autoritetet) të nevojshme për të kryer biznesin e tij dhe për ta bërë Akomodimin të disponueshëm në Platformë për rezervim;</p>
        <p>(iii) Akomodimi është i regjistruar siç duhet në të gjitha autoritetet përkatëse tatimore (përfshirë autoritetet lokale) si një hotel ose ofrues tjetër akomodimi.</p>
        <br>
        <h3>6. Kohëzgjatja, Përfundimi dhe Pezullimi</h3>
        <p>​​6.1 Përveç nëse është rënë dakord ndryshe, Marrëveshja do të fillojë në datën e pranimit nga Akomodimi dhe do të vazhdojë për një periudhë të pacaktuar kohore. Akomodimi mund ta ndërpresë Marrëveshjen në çdo kohë dhe për çfarëdo arsye duke njoftuar me shkrim Travelonio.com me një periudhë njoftimi prej 15 ditësh.</p>
        <p>6.2 Çdo Palë mund të përfundojë Marrëveshjen me efekt të menjëhershëm në rast të:</p>
        <p>(i) një detyrim ligjor ose rregullator;</p>
        <p>(ii) një arsye imperative sipas ligjit në fuqi;</p>
        <p>(iii) një shkelje të përsëritur të Marrëveshjes nga pala tjetër; ose</p>
        <p>(iv) një shkelje materiale nga Pala tjetër, duke përfshirë por pa u kufizuar në raste të sjelljes së paligjshme ose të papërshtatshme dhe ose mashtrimit.</p>
        <br>
        <p>6.3 Pa paragjykuar pikat 6.1 dhe 6.2, Travelonio.com mund të kufizojë ose pezullojë të gjitha ose një pjesë të detyrimeve ose pikave te Marrëveshjes, me efekt të menjëhershëm, me anë të një njoftimi me shkrim (i cili përfshin një arsyetim të vendimit) të dala nga Marrëveshja dhe/ose të përfundojë Marrëveshjen dhe/ose të mbyllë Platformën e saj për Akomodimin pas një periudhe njoftimi prej 5 ditësh kalendarike, në ndonjë nga ngjarjet ose rrethanat e mëposhtme (të parashikuara ose të dyshuara në mënyrë të arsyeshme):</p>
        <p>(i) një shkelje nga Akomodimi i çdo kushti të Marrëveshjes;</p>
        <p>(ii) (një përgaditje ose paraqitje e një kërkese për) falimentim, falimentim ose pezullim të pagesës ose një veprim ose ngjarje të ngjashme në lidhje me Akomodimin;</p>
        <p>(iii) dështimi për të paguar ndonjë nga faturat, kërkesë për shlyerjen e borxhit ose tarifat e Travelonio.com deri në datën e përcaktuar;</p>
        <p>(iv) një përpjekje e qëllimshme për të shmangur pagesën e komisionit dhe/ose ulje të komisionit;</p>
        <p>(v) dhënien e informacionit të pasaktë, të vjetëruar, jo të plotë, mashtrues ose mashtrues nga Akomodimi, duke përfshirë postimin e Informacionit të Akomodimit të kësaj natyre në internet;</p>
        <p>(vi) mospranimi i një rezervimi me çmimin dhe/ose kushtet e treguara në rezervim ose mosrespektimi i çmimit të rënë dakord dhe/ose kushteve të rezervimit;</p>
        <p>(vii) kërkesa e një Akomodimi për pagesë shtesë nga një Mysafir;</p>
        <p>(viii) një ankesë serioze nga një ose më shumë Mysafir ose një palë e tretë;</p>
        <p>(ix) vlerësime ose komente të dobëta nga Mysafirët të përsëritura;</p>
        <p>(x) Akomodimi në mënyrë direkte ose indirekte manipulon ose tenton të manipulojë një rezervim ose funksionimin e Platformës (p.sh. duke manipuluar komentet e vizitorëve);</p>
        <p>(xi) çdo çështje ose problem sigurie, privatësie ose shëndetësore në lidhje me Akomodimin ose objektet e tij (Akomodimi do t'i dorëzojë Travelonio.com me koston e tij dhe me kërkesën e Travelonio.com lejet, licencat, certifikatat dhe deklaratat përkatëse lëshuar nga një ekspert i pavarur që evidenton dhe mbështet përputhshmërinë e tij me ligjet dhe legjislacionin në fuqi për privatësinë, sigurinë dhe shëndetin;</p>
        <p>6.4 Çdo njoftim ose komunikim nga Travelonio.com për "mbylljen" (ose formulim të ngjashëm) të Akomodimit në faqen e internetit do të nënkuptojë përfundimin e Marrëveshjes. Pas përfundimit ose pezullimit të Marrëveshjes, Akomodimi do të respektojë rezervimet e parealizuara nga Mysafirët dhe do të paguajë të gjithë Komisionin (plus kostot, shpenzimet dhe interesin nëse është e aplikueshme) që duhet për ato rezervime në përputhje me kushtet e Marrëveshjes. Pas përfundimit ose pezullimit të Marrëveshjes dhe pavarësisht nga e drejta e Travelonio.com për të hequr (përgjithmonë) Akomodimin nga Platforma, Travelonio.com mund të mbajë faqen e Akomodimit në Platformë, por të mbyllë disponueshmërinë në pritje të pagesës së plotë dhe përfundimtare të çdo shume të detyrimit të papaguar (duke përfshirë çdo komision).</p>
        <p>6.5 Nëse ka një ndryshim të pronësisë ose operatorit të Akomodimit (që do të thotë pronë) duke përfshirë çdo caktim, transferim ose rinovim të Marrëveshjes, Akomodimi bie dakord që pronari ose operatori i ri mund të përdorë Informacionin e Akomodimit, duke përfshirë komentet e mysafireve, që ishte në dispozicion ose të përdorura nga Akomodimi përpara ndryshimit të pronësisë, dhe do të ketë akses në të dhënat përkatëse të përformances (financiare dhe operacionale), të menaxhimit dhe të klientit. Akomodimi në çdo rast do të mbetet përgjegjës për të gjitha detyrimet dhe pretendimet në lidhje me ose të ndodhura gjatë periudhës përpara ndryshimit të pronësisë ose operatorit.</p>
        <br>
        <h3>7. Zgjidhja e Mosmarrëveshjeve</h3>
        <p>7.1 Forma dhe Ligji i Aplikueshëm</p>
        <p>7.1.1 Përveç nëse parashikohet ndryshe në Marrëveshje, Marrëveshja do të qeveriset ekskluzivisht nga dhe do të interpretohet në përputhje me ligjet e Republikës së Kosovës. Çdo mosmarrëveshje që lind nga ose në lidhje me Marrëveshjen do t'i dorëzohet dhe trajtohet ekskluzivisht nga gjykata kompetente në Prishtinë, Kosovë.</p>
        <p>7.2 Gjuha e Marrëveshjes</p>
        <p>I gjithë teksti i Marrëveshjes, si dhe dokumentet që rrjedhin prej saj, janë shkruar në shqip dhe anglisht, të dy versionet konsiderohen autentike, por për qëllime ligjore dhe për zgjidhjen e mosmarrëveshjeve që mund të lindin, teksti në gjuhën shqipe do të mbizotërojnë.</p>`,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {});
}

export function guestsTermsAndConditionsDialogEnglish(
  event: Event,
  dialog: MatDialog
): void {
  event.preventDefault();
  event.stopPropagation();
  const dialogRef = dialog.open(CustomDialogComponent, {
    width: '639.72px',
    panelClass: 'custom-dialog',
    data: {
      title: 'Terms and Conditions',
      template: `
        <p><b>Travelonio.com</b></p>
        <h3>Introduction</h3>
        <p>These Terms of Service govern your use of the website https://www.travelonio.com and any related services provided by Behind the Comma Shpk, incorporated under the laws of Kosovo with a business registration number 811872242.</p>
        <p>By accessing www.travelonio.com, you agree to abide by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these Terms of Service, you are prohibited from using or accessing this website or using any other services provided by Behind the Comma Shpk.</p>
        <p>We, Behind the Comma Shpk, reserve the right to review and amend any of these Terms of Service at our sole discretion. Upon doing so, we will update this page. Any changes to these Terms of Service will take effect immediately from the date of publication.</p>
        <p>These Terms of Service were last updated on 1 February 2022.</p>
        <br>
        <h3>Definitions</h3>
        <p><b>"Travelonio.com"</b>, <b>"us"</b>, <b>"we"</b> or <b>"our"</b> means Travelonio.com, an online accommodation booking system operated by Behind the Comma Shpk, incorporated under the laws of Kosovo. References to <b>“you”</b> and <b>“your”</b> are to you, our customer.</p>
        <p><b>"Website"</b> means the (mobile) website on which the Booking Service is made available owned, controlled, managed, maintained and/or hosted by Travelonio.com.</p>
        <p><b>"Accommodation"</b> means the various different travel products and services that can be ordered, acquired, purchased, bought, paid, rented, provided, reserved, combined or consummated by you from the Accommodation Provider.</p>
        <p><b>"Accommodation Provider"</b> means the professional provider of accommodation and any other travel or related product or service as from time to time available for Reservation on the Website (B2B/B2C).</p>
        <br>
        <h3>Scope and nature of our Service</h3>
        <p>Via travelonio.com, Behind the Comma Shpk, provides an online platform through which the Accommodation Provider can offer their products and service for order, purchase, reservation, hire, and through which visitors of the Website can discover, search, compare, and make an order, reservation, purchase or payment (i.e. the Booking Service). By using the Booking Service (e.g. by making a Reservation through the Booking Service), you enter into a direct (legally binding) contractual relationship with the Accommodation Provider with which you make a reservation.</p>
        <p>We act only as an intermediary between you and the Accommodation Provider, transmitting the relevant details for the Reservation to the relevant Accommodation Provider(s) and sending you a confirmation email for and on behalf of the Accommodation Provider. Travelonio.com does not (re)sell, rent out, offer any (travel) product or service.</p>
        <p>When rendering our Booking Service, the information that we expose is based on the information provided to us by the Accommodation Provider. Although we will use reasonable skill and care while providing you with our Booking Service, we cannot guarantee that all information is accurate, complete or correct, nor can we be held liable for any errors (including manifest and typographical errors), any interruptions (whether due to any (temporary and/or partial) breakdown, repair, upgrade or maintenance of our Website or otherwise), inaccurate, misleading or untrue information or non-delivery of information. Each Accommodation Provider is held responsible for the accuracy, completeness and correctness of the information (including the rates/fees/prices, policies & conditions and availability) displayed on our Website. Travelonio.com does not constitute and should not be regarded as a recommendation or endorsement of the quality, service level, hotel class or (star) rating of any Accommodation Provider (or its facilities, venue, products or services) made available.</p>
        <p>Our Booking Service is made available for personal and non-commercial use only. Therefore, you are not allowed to re-sell, deep-link, use, copy, monitor (e.g. spider, scrape), display, download or reproduce any content or information, software, reservations, products or services available on this Website for any commercial or competitive purpose.</p>
        <br>
        <h3>Prices, We Price Match</h3>
        <p>The prices displayed on our Website as offered by the Accommodation Providers are highly competitive. Relevant fees and taxes (including tourist/city tax) may be charged by the Accommodation Provider in case of a no-show or cancellation.</p>
        <p>All prices on the Travelonio.com website are per room for your entire stay, unless stated differently. These prices can be changed by the Accommodation Provider. We show the price we get from the Accommodation Provider for the room for the dates you select. Please check the room details to see what is included in the price and what is not.</p>
        <p>Sometimes cheaper rates for a specific stay are available on our Website by the Accommodation Providers, however, these rates may carry special restrictions and conditions, for example non-cancelable and non-refundable. Please check the relevant booking conditions and details thoroughly for any such conditions before making your reservation.</p>
        <p>We want you to pay the lowest possible price for your product and service of choice. If you find your accommodation of choice booked through our Website, with the same booking conditions, at a lower rate on the Internet after you have made a reservation through us, we will match the difference between our rate and the lower rate under the terms and conditions of the We Price Match.</p>
        <p>To get the refund, please send us the link to the website with a cheaper rate within 24 hours from the moment of making your reservation.</p>
        <p>The currency converter is for information purposes only and should not be relied upon as accurate and real time; actual rates may vary</p>
        <p>Obvious errors and mistakes (including misprints) are not binding.</p>
        <p>All special offers and promotions are marked as such. If they are not labelled as such, you cannot derive any rights in case of obvious errors or mistakes.</p>
        <br>
        <h3>Payments, Credit Cards or Bank Transfers</h3>
        <p>Certain Accommodation Providers, if applicable and available, offer the opportunity for Reservations to be paid (wholly or partly and as required under the payment policy of the Accommodation Provider) to the Accommodation Provider during the Reservation process by means of secure online payment (all to the extent offered and supported by your bank).</p>
        <p>From time to time, Travelonio.com facilitates (through third party payment processors) the payment of the relevant reservations (i.e. the payment facilitation service) for and on behalf of the Accommodation Provider. Payment is safely processed from your credit/debit card or bank account to the bank account of the accommodation provider through a third party payment processor. Any payment facilitated by us for and on behalf of, and transferred to the Accommodation Provider will in each case constitute a payment of (part of) the booking price by you of the relevant reservation in final settlement of such (partial) due and payable price and you cannot reclaim such paid monies.</p>
        <p>For certain (non-refundable) rates or special offers, please note that Accommodation Providers may require that payment is made during the Reservation process. Please check the (reservation) details of your product or service of choice thoroughly for any such conditions prior to making your Reservation.</p><br>
        <br>
        <h3>Pre-payment, Cancellation and No-show</h3>
        <p>By making a Reservation with a Accommodation Provider, you agree to the relevant cancellation and no-show policy of that Accommodation Provider, and to any terms and conditions of the Accommodation Provider that may be additionally applied to your Accommodation, including services exercised and/or products offered by the Accommodation Provider. The relevant (delivery/purchase/use/carrier) terms and conditions of an Accommodation Provider can be obtained with the relevant Accommodation Provider. The general cancellation and no-show policy of each Accommodation Provider is made available on our Website on the Accommodation Provider information pages, during the booking process and in the confirmation email. Please note that certain rates, fees or special offers are not eligible for cancellation, refund or change. Applicable city/tourist tax may still be charged by the Accommodation Provider in case of a no-show or charged cancellation. Please check your reservation details thoroughly for any such conditions before making your reservation. Please note that the Reservation which requires down payment or (wholly or partly) prepayment may be cancelled (without a prior notice of default or warning) insofar the relevant (remaining) amount(s) cannot be collected in full on the relevant due or payment date in accordance with the relevant payment policy of the Accommodation Provider and the reservation. Cancellation and prepayment policies may change depending on segment, product or service of each Accommodation.</p>
        <p>If you wish to review, change or cancel your Reservation, please go back to the confirmation email and follow the instructions therein. Please note that you may be charged for your cancellation according to the Accommodation Provider's cancellation, (pre)payment and no-show policy or not be entitled to any repayment of any (pre)paid amount. We recommend that you read the cancellation, (pre)payment and no-show policy of the accommodation provider carefully before making your reservation and remember to make further payments on time as may be required for the relevant reservation.</p>
        <p>In the event of late or delayed arrival on the day of your check-in or if you arrive the next day, make sure to timely discuss this with the Accommodation Provider so they know when to expect you to avoid cancellation of your Accommodation (Reservation) or charge of the no-show fee. If needed, our customer support team will help you with informing the Accommodation Provider. Travelonio.com does not take any responsibility for the consequences of your delayed arrival or any cancellation or charged no-show fee by the Accommodation Provider.</p>
        <br>
        <h3>Correspondence and Communication</h3>
        <p>While managing your booking and by completing a Reservation, you agree to receive: (i) a confirmation email once you have made your reservation; (ii) an email reminding you about your unfinished booking, if you haven’t completed your online booking; (iii) an email which we may send to you promptly after your stay inviting you to complete our guest review form.</p>
        <p>Travelonio.com may not be held liable or responsible for any communication by or with the Accommodation Provider on or through its Website. Travelonio.com cannot guarantee that any request or communication will be received/read by, complied with, executed or accepted by the Accommodation Provider.</p>
        <p>In order to duly complete and secure your Reservation, you need to use your correct email address. We are not responsible or liable for (and have no obligation to verify) any wrong or misspelled email address or inaccurate or wrong (mobile) phone number.</p>
        <p>Any claim or complaint against Travelonio.com or in respect of the Booking Service must be promptly submitted, but in any event within 30 days after the scheduled day of consummation of the reservation (e.g. check-out date). Any claim or complaint that is submitted after the 30 days period may be rejected and the claimant shall forfeit its right to any (damage or cost) compensation.</p>
        <p>Due to the continuous update and adjustments of rates and availability, we strongly suggest taking screenshots when making a reservation to support your position (if needed).</p>
        <br>
        <h3>Disclaimer</h3>
        <p>Travelonio.com is an online accommodation booking platform. We cooperate with 1000+ Accommodation Providers but Travelonio.com cannot be perceived as an official website of any hotel, apartment, hostel or any other accommodation types. We do not accept responsibility for facilities and amenities offered by any particular hotel, apartment, hostel, etc., which may be temporarily unavailable, cancelled or changed by the property owners. Renovation, redesign, and any other maintenances made by the property owners are not under control of Travelonio.com.</p>
        <p>When rendering our Booking Service, the information that we disclose is based on the information provided to us by the Accommodation Providers. Travelonio.com ensures the accuracy of the information appearing on the website and reserves the right to change the information displayed at any time and without any notice. Although we use reasonable skill and care in performing our Booking Service, we will not verify if, and cannot guarantee that, all information is accurate, complete or correct, nor can we be held responsible for any errors (including manifest and typographical errors), any interruptions (whether due to any (temporary and/or partial) breakdown, repair, upgrade or maintenance of our Website or otherwise), inaccurate, misleading or untrue information or non-delivery of information. Each Accommodation Provider remains responsible at all times for the accuracy, completeness, and correctness of the (descriptive) information (including the rates/fees/prices, policies & conditions and availability) displayed on our Website. Travelonio.com does not constitute and should not be regarded as a recommendation or endorsement of the quality, service level, hotel class or (star) rating of any Accommodation Provider (or its facilities, venue, products or services) made available.Travelonio.com does not accept any responsibility for non-compliance of customers' expectations regarding any information displayed on Travelonio.com.</p>
        <p>The information, software, products and services published on this website may include inaccuracies or errors, including pricing errors. In particular, Travelonio.com does not guarantee the accuracy of, and disclaim all liability for any errors or other inaccuracies relating to the information and description of the accommodation displayed on this website (including, without limitation, the pricing, photographs, list of hotel amenities, general product descriptions, etc.).</p>
        <p>We assume no liability for any submissions (photos/reviews/comments) posted or submitted by you. We have no obligation to post your comments; we reserve the right to determine which comments are published on the website. By uploading photos/images onto our system (for instance in addition to a review) you verify that you own the copyright to the photos/images and that you agree that Travelonio.com may use the uploaded photos/images on its website. By uploading these photos/images the person uploading the picture(s) accepts full juridical and moral responsibility of any and all legal claims that are made by any third parties (including, but not limited to, accommodation owners) due to Travelonio.com publishing and using these photos/images. Travelonio.com does not own or endorse the photos/images that are uploaded. However, we do not accept any liability for the use of your photos and comments by any third party. Travelonio.com cannot be held liable for veracity and validity of all pictures and reviews disclosed on the website. The person who uploaded the photo warrants that the photos/images shall not contain any viruses, Trojan horses or infected files and shall not contain any pornographic, illegal, insulting, offensive or inappropriate material and does not contravene any third party (intellectual property right, copyright or privacy) rights. If the photos/images do not meet the aforementioned criteria, they will not be posted and/or can be removed/deleted by Travelonio.com at any time and without prior notice.</p>
        <p>Travelonio.com is not liable or responsible for the remittance, collection, withholding, or payment of the relevant taxes due on the (Accommodation) price or fee to the relevant tax authorities. Travelonio.com does not act as the merchant of record for any product or service made available on the Platform. Our Accommodation Providers, as vendors, include all applicable taxes in the amount billed and Travelonio.com pays over such amounts directly to the vendors. Travelonio.com is not a co-vendor associated with the vendors with whom we book or reserve your travel arrangements.</p>
        <br>
        <h3>Right to Terminate</h3>
        <p>We may suspend or terminate your right to use our website and terminate these Terms of Service immediately upon written notice to you for any breach of these Terms of Service.</p>
        <br>
        <h3>Severance</h3>
        <p>Any term of these Terms of Service which is wholly or partially void or unenforceable is severed to the extent that it is void or unenforceable. The validity of the remainder of these Terms of Service is not affected.</p>
        <br>
        <h3>Governing Law</h3>
        <p>These Terms of Service are governed by and constructed in accordance with the laws of Kosovo. You irrevocably submit to the exclusive jurisdiction of the courts of Kosovo.</p>`,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {});
}

export function guestsTermsAndConditionsDialogShqip(
  event: Event,
  dialog: MatDialog
): void {
  event.preventDefault();
  event.stopPropagation();
  const dialogRef = dialog.open(CustomDialogComponent, {
    width: '639.72px',
    panelClass: 'custom-dialog',
    data: {
      title: 'Kushtet e Shërbimit',
      template: `
        <p><b>Travelonio.com</b></p>
        <h3>Prezantimi</h3>
        <p>Këto Kushte të Shërbimit rregullojnë përdorimin tuaj të faqes së internetit https://www.travelonio.com  dhe çdo shërbimi përkatës të ofruar nga Behind the Comma Shpk, të inkorporuara sipas ligjeve të Kosovës me numrin e regjistrimit të biznesit 811872242.</p>
        <p>Duke hyrë në www.travelonio.com ju pranoni të respektoni këto Kushte të Shërbimit dhe të pajtoheni me të gjitha ligjet dhe rregulloret në fuqi. Nëse nuk jeni dakord me këto Kushte të Shërbimit, ju ndalohet të përdorni ose të hyni në këtë faqe interneti ose të përdorni ndonjë shërbim tjetër të ofruar nga Behind the Comma Shpk.</p>
        <p>Ne, Behind the Comma Shpk, sigurojmë të drejtën për të rishikuar dhe ndryshuar ndonjë nga këto Kushte të Shërbimit sipas gjykimit tonë. Pasi ta bëjmë këtë, ne do ta përditësojmë këtë faqe. Çdo ndryshim në këto Kushte të Shërbimit do të hyjë në fuqi menjëherë nga data e publikimit.</p>
        <p>Këto Kushte të Shërbimit u përditësuan për herë të fundit më 1 shkurt 2022.</p>
        <br>
        <h3>Përkufizimet</h3>
        <p><b>"Travelonio.com"</b>, "neve", "ne" ose "e jona" do të thotë Travelonio.com, një sistem i rezervimit të akomodimit në internet i operuar nga Behind the Comma Shpk, i inkorporuar sipas ligjeve të Kosovës. Referohet për "ju" janë për ju, klientin tonë.</p>
        <p><b>"Uebsajti"</b> do të thotë uebsajti/faqe interneti (i lëvizshëm) në të cilin Shërbimi i Rezervimit vihet në dispozicion, në pronësi, kontroll, menaxhim, mirëmbajtje dhe/ose strehuar nga Travelonio.com.</p>
        <p><b>"Akomodim"</b> nënkupton produktet dhe shërbimet e ndryshme të udhëtimit që mund të porositen, blihen,sigurohen, paguhen, merren me qira, ofrohen, rezervohen, kombinohen ose konsumohen nga ju nga Ofruesi i Akomodimit.</p>
        <p><b>"Ofruesi i Akomodimit"</b> do të thotë ofruesi profesional i akomodimit dhe çdo produkt ose shërbim tjetër udhëtimi qe ndërlidhet, që herë pas here është i disponueshëm për Rezervim në faqen e internetit (B2B/B2C).</p>
        <p><b>"Shërbimi i Rezervimit"</b> nënkupton blerjen, porosinë, pagesën (e lehtësuar) ose shërbimin e rezervimit në internet siç ofrohet nga travelonio.com në lidhje me produkte dhe shërbime të shumta që herë pas here vihen në dispozicion nga Ofruesit e Akomodimit në faqen e internetit.</p>
        <p><b>"Rezervimi"</b> nënkupton porosinë, blerjen, pagesën, prenotimin ose rezervimin e një akomodimi.</p>
        <br>
        <h3>Fusha dhe natyra e Shërbimit tonë</h3>
        <p>Nëpërmjet travelonio.com, Behind the Comma Shpk, ofron një platformë në internet përmes së cilës Ofruesi i Akomodimit mund të ofrojë produktet dhe shërbimet e tij për porosi, blerje, rezervim, qira, dhe përmes së cilës vizitorët e faqes në internet mund të zbulojnë, kërkojnë, krahasojnë dhe bëjnë një porosi, rezervim, blerje ose pagesë (dmth. Shërbimi i Rezervimit). Duke përdorur Shërbimin e Rezervimit (p.sh. duke bërë një Rezervim përmes Shërbimit të Rezervimit), ju hyni në një marrëdhënie kontraktuale të drejtpërdrejtë (ligjërisht të detyrueshme) me Ofruesin e Akomodimit me të cilin bëni një rezervim.</p>
        <p>Ne veprojmë vetëm si ndërmjetës midis jush dhe Ofruesit të Akomodimit, duke transmetuar detajet përkatëse për Rezervimin tek Ofruesi(t) përkatës të Akomodimit dhe duke ju dërguar një email konfirmimi edhe në emër të Ofruesit të Akomodimit. Travelonio.com nuk (ri) shet, jep me qira, nuk ofron asnjë produkt ose shërbim (udhëtimi).</p>
        <p>Kur ofrojmë shërbimin tonë të rezervimit, informacioni që ne ekspozojmë bazohet në informacionin e dhënë nga Ofruesi i Akomodimit. Megjithëse ne do të përdorim aftësi dhe kujdes të arsyeshëm ndërsa ju ofrojmë shërbimin tonë të rezervimit, ne nuk mund të garantojmë që të gjitha informacionet janë të plota ose të sakta, dhe as nuk mund të mbajmë përgjegjësi për ndonjë gabim (përfshirë gabimet e dukshme dhe tipografike), çdo ndërprerje (qoftë për shkak të ndonjë avarie (të përkohshme dhe/ose të pjesshme), riparimi, përmirësimi ose mirëmbajtjeje të faqes sonë të internetit ose ndryshe), informacione të pasakta, mashtruese ose të pavërteta ose mosdorëzimi i informacionit. Çdo Ofrues i Akomodimit mbahet përgjegjës për saktësinë, plotësinë dhe korrektësinë e informacionit (përfshirë tarifat//çmimet, politikat dhe kushtet dhe disponueshmërinë) të shfaqura në faqen tonë të internetit. Travelonio.com nuk përbën dhe nuk duhet të konsiderohet si një rekomandim ose miratim i cilësisë, nivelit të shërbimit, klasës së hotelit ose (yjeve) të vlerësimit të çdo Ofruesi të Akomodimit (ose objekteve, vendit, produkteve ose shërbimeve të tij) të vënë në dispozicion.</p>
        <p>Shërbimi ynë i Rezervimit është i disponueshëm vetëm për përdorim personal dhe jokomercial. Prandaj, nuk ju lejohet të rishitni, lidhni, përdorni, kopjoni, monitoroni (p.sh. merimangë, gërvishtni), shfaqni, shkarkoni ose riprodhoni ndonjë përmbajtje ose informacion, softuer, rezervime, produkte ose shërbime të disponueshme në këtë faqe interneti për ndonjë qëllim komercial ose konkurrues.</p>
        <br>
        <h3>Çmimet, ne përputhemi me çmimin</h3>
        <p>Çmimet e shfaqura në faqen tonë të internetit siç ofrohen nga Ofruesit e Akomodimit janë shumë konkurruese. Tarifat dhe taksat përkatëse (përfshirë taksat turistike/taksat e qytetit) mund të ngarkohen nga Ofruesi i Akomodimit në rast të mosparaqitjes ose anulimit.</p>
        <p>Të gjitha çmimet në faqen e internetit të Travelonio.com janë për dhomë për të gjithë qëndrimin tuaj, përveç nëse deklarohet ndryshe. Këto çmime mund të ndryshohen nga Ofruesi i Akomodimit. Ne tregojmë çmimin që marrim nga Ofruesi i Akomodimit për dhomën për datat që zgjidhni. Ju lutemi kontrolloni detajet e dhomës për të parë se çfarë përfshihet në çmim dhe çfarë jo.</p>
        <p>Ndonjëherë në faqen tonë të internetit ofrohen çmime më të lira për një qëndrim të caktuar nga Ofruesit e Akomodimit, megjithatë, këto tarifa mund të kenë kufizime dhe kushte të veçanta, për shembull të pa anulueshme dhe të pakthyeshme. Ju lutemi kontrolloni me kujdes kushtet përkatëse të rezervimit dhe detajet për çdo kusht të tillë përpara se të bëni rezervimin tuaj.</p>
        <p>Ne dëshirojmë që ju të paguani çmimin më të ulët të mundshëm për produktin dhe shërbimin tuaj të zgjedhur. Nëse e gjeni akomodimin/hotelin tuaj të zgjedhur të rezervuar përmes faqes sonë të internetit, me të njëjtat kushte rezervimi, me një tarifë më të ulët në internet pasi të keni bërë një rezervim nëpërmjet nesh, ne do të përputhim ndryshimin midis tarifës sonë dhe tarifës më të ulët sipas kushteve dhe kushtet e ndeshjes Ne Çmimi.</p>
        <p>Për të marrë rimbursimin, ju lutemi na dërgoni lidhjen në faqen e internetit me një tarifë më të lirë brenda 24 orëve nga momenti i rezervimit tuaj.</p>
        <p>Konvertuesi i monedhës është vetëm për qëllime informative dhe nuk duhet të mbështetet si i saktë dhe në kohë reale; tarifat aktuale mund të ndryshojnë.</p>
        <p>Gabimet dhe gabimet e dukshme (përfshirë gabimet e printimit) nuk janë të detyrueshme.</p>
        <p>Të gjitha ofertat dhe promovimet speciale janë shënuar si të tilla. Nëse ato nuk janë etiketuar si të tilla, nuk mund të përfitoni asnjë të drejtë në rast të gabimeve ose gabimeve të dukshme.</p>
        <br>
        <h3>Pagesat, kartat e kreditit ose transfertat bankare</h3>
        <p>Disa Ofrues të Akomodimit, nëse janë të zbatueshëm dhe të disponueshëm, ofrojnë mundësinë që Rezervimet të paguhen (plotësisht ose pjesërisht dhe siç kërkohet sipas politikës së pagesave të Ofruesit të Akomodimit) Ofruesit të Akomodimit gjatë procesit të rezervimit me anë të pagesës së sigurt në internet (të gjitha në masën e ofruar dhe të mbështetur nga banka juaj).</p>
        <p>Herë pas here, Travelonio.com lehtëson (nëpërmjet përpunuesve të pagesave nga palët e treta) pagesën e rezervimeve përkatëse (d.m.th. shërbimi i lehtësimit të pagesave) për dhe në emër të Ofruesit të Akomodimit. Pagesa përpunohet në mënyrë të sigurt nga karta juaj e kreditit/debitit ose llogaria bankare në llogarinë bankare të ofruesit të akomodimit përmes një procesori pagesash nga një palë e tretë. Çdo pagesë e lehtësuar nga ne për dhe në emër të, dhe e transferuar te Ofruesi i Akomodimit në çdo rast do të përbëjë një pagesë të (pjesës së) çmimit të rezervimit nga ju të rezervimit përkatës në shlyerjen përfundimtare të këtij çmimi (të pjesshëm) të caktuar dhe të pagueshëm dhe nuk mund të rikuperoni para të tilla të paguara.</p>
        <p>Herë pas here, Travelonio.com mund t'ju ofrojë mundësinë për të kryer pagesa nëpërmjet transfertës bankare. Detajet e bankës do të ndahen gjatë procesit të rezervimit. Rezervime të tilla do të mbahen për 24 orë derisa të dëshmohet se një pagesë është paraqitur ose nëpërmjet mbërritjes së fondeve në llogarinë e caktuar bankare ose nëpërmjet dhënies së dëshmisë së pagesës (d.m.th. detajet e transaksionit bankar) për ekipin tonë të shërbimit të klientit. Dështimi për të siguruar vërtetimin e pagesës brenda 24 orëve nga bërja e Rezervimit do të rezultojë në shpalljen e Rezervimit të pavlefshëm.</p>
        <p>Për tarifa të caktuara (të pakthyeshme) ose oferta speciale, ju lutemi vini re se Ofruesit e Akomodimit mund të kërkojnë që pagesa të bëhet gjatë procesit të Rezervimit. Ju lutemi kontrolloni tërësisht detajet (rezervimin) të produktit ose shërbimit tuaj të zgjedhur për çdo kusht të tillë përpara se të bëni rezervimin tuaj.</p>
        <br>
        <h3>Parapagesë, Anulim dhe Mos-shfaqje</h3>
        <p>Duke bërë një rezervim me një ofrues akomodimi, ju pranoni politikën përkatëse të anulimit dhe mos-shfaqjes së atij Ofruesi të Akomodimit, si dhe me çdo kusht dhe kusht të Ofruesit të Akomodimit që mund të zbatohet shtesë për Akomodimin tuaj, duke përfshirë shërbimet e ushtruara dhe/ose produktet e ofruara nga Ofruesi i Akomodimit. Termat dhe kushtet përkatëse (dorëzimi/blerja/përdorimi/transportuesi) i një Ofruesi të Akomodimit mund të merren me Ofruesin përkatës të Akomodimit. Politika e përgjithshme e anulimit dhe mos-shfaqjes së çdo Ofruesi të Akomodimit vihet në dispozicion në faqen tonë të internetit në faqet e informacionit të Ofruesit të Akomodimit, gjatë procesit të rezervimit dhe në emailin e konfirmimit. Ju lutemi vini re se disa tarifa ose oferta speciale nuk janë të pranueshme për anulim, rimbursim ose ndryshim. Taksa e zbatueshme e qytetit/turizmit mund të tarifohet ende nga Ofruesi i Akomodimit në rast të mosparaqitjes ose anulimit të tarifuar.</p>
        <p>Ju lutemi kontrolloni plotësisht detajet e rezervimit tuaj për çdo kusht të tillë përpara se të bëni rezervimin tuaj. Ju lutemi vini re se Rezervimi i cili kërkon parapagim ose (tërësisht ose pjesërisht) parapagim mund të anulohet (pa një njoftim paraprak për mospagim ose paralajmërim) për aq sa shuma (të mbetura) përkatëse (të mbetura) nuk mund të mblidhet plotësisht në detyrimin ose pagesën përkatëse datë në përputhje me politikën përkatëse të pagesës të Ofruesit të Akomodimit dhe rezervimin. Politikat e anulimit dhe të parapagimit mund të ndryshojnë në varësi të segmentit, produktit ose shërbimit të çdo Akomodimi.</p>
        <p>Nëse dëshironi të rishikoni, ndryshoni ose anuloni rezervimin tuaj, ju lutemi kthehuni te emaili i konfirmimit dhe ndiqni udhëzimet në të. Ju lutemi vini re se mund të tarifoheni për anulimin tuaj sipas politikës së anulimit, (para)pagesës dhe mos-shfaqjes së Ofruesit të Akomodimit ose të mos keni të drejtë për ndonjë ripagim të ndonjë shume (para) të paguar. Ne ju rekomandojmë që të lexoni me kujdes politikën e anulimit, (para)pagesës dhe mosparaqitjes së ofruesit të akomodimit përpara se të bëni rezervimin tuaj dhe mos harroni të bëni pagesa të mëtejshme në kohë siç mund të kërkohet për rezervimin përkatës.</p>
        <p>Në rast të mbërritjes me vonesë në ditën e check-in-it ose nëse arrini ditën tjetër, sigurohuni që ta diskutoni këtë me kohë me Ofruesin e Akomodimit, në mënyrë që ata të dinë se kur të presin që të shmangni anulimin e Akomodimit (Rezervimit) ose pagesën e tarifës së mosparaqitjes. Nëse është e nevojshme, ekipi ynë i mbështetjes së klientit do t'ju ndihmojë me informimin e Ofruesit të Akomodimit. Travelonio.com nuk mban asnjë përgjegjësi për pasojat e mbërritjes tuaj me vonesë ose të ndonjë anulimi ose tarife mos-paraqitjeje nga Ofruesi i Akomodimit.</p>
        <br>
        <h3>Korrespondenca dhe Komunikimi</h3>
        <p>Ndërsa menaxhoni rezervimin tuaj dhe duke kryer një Rezervim, ju pranoni të merrni: (i) një email konfirmimi pasi të keni bërë rezervimin tuaj; (ii) një email që ju kujton për rezervimin tuaj të papërfunduar, nëse nuk e keni përfunduar rezervimin tuaj online; (iii) një email që mund t'ju dërgojmë menjëherë pas qëndrimit tuaj duke ju ftuar të plotësoni formularin tonë të vlerësimit të të ftuarve.</p>
        <p>Travelonio.com nuk mund të mbahet përgjegjës për ndonjë komunikim nga ose me Ofruesin e Akomodimit në ose nëpërmjet sajtit të internetit. Travelonio.com nuk mund të garantojë që çdo kërkesë ose komunikim do të merret/lexohet, respektohet, ekzekutohet ose pranohet nga Ofruesi i Akomodimit.</p>
        <p>Në mënyrë që të plotësoni dhe të siguroni rezervimin tuaj siç duhet, duhet të përdorni adresën tuaj të saktë të emailit. Ne nuk jemi përgjegjës për (dhe nuk kemi asnjë detyrim për të verifikuar) ndonjë adresë emaili të gabuar ose të shkruar gabim ose numër telefoni të pasaktë ose të gabuar (celular).</p>
        <p>Çdo pretendim ose ankesë kundër Travelonio.com ose në lidhje me Shërbimin e Rezervimit duhet të dorëzohet menjëherë, por gjithsesi brenda 30 ditëve pas ditës së planifikuar të përfundimit të rezervimit (p.sh. data e daljes në dorëzim). Çdo kërkesë ose ankesë e paraqitur pas periudhës 30 ditore mund të refuzohet dhe paraqitësi i kërkesës humb të drejtën e tij për çdo kompensim (dëm ose kosto).</p>
        <p>Për shkak të përditësimit të vazhdueshëm dhe rregullimeve të tarifave dhe disponueshmërisë, ne sugjerojmë fuqimisht te fotografoni (screenshot) ekranin kur bëni një rezervim për të mbështetur pozicionin tuaj (nëse është e nevojshme).</p>
        <br>
        <h3>Mohim përgjegjësie</h3>
        <p>Travelonio.com është një platformë online prenotimi akomodimi. Ne bashkëpunojmë me 1000+ Ofrues te Akomodimit, por Travelonio.com nuk mund të perceptohet si një faqe interneti zyrtare e ndonjë hoteli, apartamenti, bujtinash ose ndonjë lloj tjetër akomodimi. Ne nuk pranojmë përgjegjësi për objektet dhe komoditetet e ofruara nga ndonjë hotel, apartament, bujtinë, etj., të cilat mund të jenë përkohësisht të padisponueshme, të anuluara ose të ndryshuara nga pronarët e pronës. Rinovimi, ridizajnimi dhe çdo mirëmbajtje tjetër e bërë nga pronarët e pronave nuk janë nën kontrollin e Travelonio.com.</p>
        <p>Kur ofrojmë shërbimin tonë të rezervimit, informacioni që ne zbulojmë bazohet në informacionin e dhënë nga Ofruesit e Akomodimit. Travelonio.com siguron saktësinë e informacionit që shfaqet në faqen e internetit dhe rezervon të drejtën për të ndryshuar informacionin e shfaqur në çdo kohë dhe pa asnjë njoftim. Megjithëse përdorim aftësi dhe kujdes të arsyeshëm në kryerjen e Shërbimit tonë të Rezervimit, ne nuk do të verifikojmë dhe nuk mund të garantojmë që të gjitha informacionet janë të sakta, të plota  dhe as nuk mund të mbajmë përgjegjësi për ndonjë gabim (përfshirë gabimet e dukshme dhe tipografike). çdo ndërprerje (qoftë për shkak të ndonjë avarie (të përkohshme dhe/ose të pjesshme), riparimi, përmirësimi ose mirëmbajtjeje të faqes sonë të internetit ose ndryshe), informacione të pasakta, mashtruese ose të pavërteta ose mosdhënie të informacionit. Çdo Ofrues i Akomodimit mbetet përgjegjës në çdo kohë për saktësinë, plotësinë dhe korrektësinë e informacionit (përshkrues) (përfshirë tarifat/çmimet, politikat, kushtet dhe disponueshmërinë) të shfaqur në faqen tonë të internetit. Travelonio.com nuk përbën dhe nuk duhet të konsiderohet si një rekomandim ose miratim i cilësisë, nivelit të shërbimit, klasës së hotelit ose vlerësimit (yll) të çdo Ofruesi të Akomodimit (ose objekteve, vendit, produkteve ose shërbimeve të tij) të vëna në dispozicion. Travelonio.com nuk pranon asnjë përgjegjësi për mospërputhjen e pritshmërive të klientëve në lidhje me çdo informacion të shfaqur në Travelonio.com.</p>
        <p>Informacioni, softueri, produktet dhe shërbimet e publikuara në këtë faqe interneti mund të përfshijnë pasaktësi ose gabime, duke përfshirë gabimet në çmim. Në veçanti, Travelonio.com nuk garanton saktësinë dhe nuk heq përgjegjësinë për çdo gabim ose pasaktësi të tjera në lidhje me informacionin dhe përshkrimin e akomodimit të shfaqur në këtë faqe interneti (duke përfshirë, pa kufizim, çmimin, fotografitë, listën e hoteleve, komoditetet, përshkrimet e përgjithshme të produktit, etj.).</p>
        <p>Ne nuk marrim asnjë përgjegjësi për çdo paraqitje (foto / rishikim / koment) të postuar ose dorëzuar nga ju. Ne nuk kemi asnjë detyrim të postojmë komentet tuaja; ne rezervojmë të drejtën për të përcaktuar se cilat komente publikohen në faqen e internetit. Duke ngarkuar foto/imazhe në sistemin tonë (për shembull, përveç një rishikimi) ju verifikoni që zotëroni të drejtën e autorit për fotot/imazhet dhe se jeni dakord që Travelonio.com mund të përdorë fotot/imazhet e ngarkuara në faqen e saj të internetit. Duke ngarkuar këto foto/imazhe, personi që ngarkon foto(at) pranon përgjegjësinë e plotë juridike dhe morale për çdo dhe të gjitha pretendimet ligjore që bëhen nga palët e treta (duke përfshirë, por pa u kufizuar në pronarët e akomodimit) për shkak të publikimit të Travelonio.com dhe duke përdorur këto foto/imazhe. Travelonio.com nuk zotëron ose miraton fotot/imazhet që janë ngarkuar. Megjithatë, ne nuk pranojmë asnjë përgjegjësi për përdorimin e fotove dhe komenteve tuaja nga asnjë palë e tretë. Travelonio.com nuk mund të mbahet përgjegjës për vërtetësinë dhe vlefshmërinë e të gjitha fotove dhe komenteve të shpalosura në faqen e internetit. Personi që ka ngarkuar foton garanton që fotot/imazhet nuk duhet të përmbajnë viruse, kuaj trojanë ose skedarë të infektuar dhe nuk duhet të përmbajnë materiale pornografike, të paligjshme, fyese ose të papërshtatshme dhe nuk bien ndesh me asnjë palë të tretë (e drejta e pronësisë intelektuale, të drejtat e autorit ose privatësisë). Nëse fotot/imazhet nuk plotësojnë kriteret e lartpërmendura, ato nuk do të postohen dhe/ose mund të hiqen/fshihen nga Travelonio.com në çdo kohë dhe pa njoftim paraprak.</p>
        <p>Travelonio.com nuk është përgjegjëse për dërgimin, mbledhjen, mbajtjen në burim ose pagesën e taksave përkatëse për çmimin ose tarifën (Akomodimi) tek autoritetet tatimore përkatëse. Travelonio.com nuk vepron si tregtar i regjistruar për çdo produkt ose shërbim të vënë në dispozicion në Platformë. Ofruesit tanë të akomodimit, si shitës, përfshijnë të gjitha taksat e zbatueshme në shumën e faturuar dhe Travelonio.com paguan mbi shuma të tilla drejtpërdrejt te shitësit. Travelonio.com nuk është një bashkë-shitës i lidhur me shitësit me të cilët ne rezervojmë ose rezervojmë aranzhimet tuaja të udhëtimit.</p>
        <br>
        <h3>E drejta për të përfunduar</h3>
        <p>Ne mund të pezullojmë ose të ndërpresim të drejtën tuaj për të përdorur faqen tonë të internetit dhe t'i përfundojmë këto Kushte të Shërbimit menjëherë pas njoftimit me shkrim për ju për çdo shkelje të këtyre Kushteve të Shërbimit.</p>
        <br>
        <h3>Ndarshmëria</h3>
        <p>Çdo kusht i këtyre Kushteve të Shërbimit, i cili është tërësisht ose pjesërisht i pavlefshëm ose i pazbatueshëm, ndërpritet deri në masën që është i pavlefshëm ose i pazbatueshëm. Vlefshmëria e pjesës së mbetur të këtyre Kushteve të Shërbimit nuk ndikohet.</p>
        <br>
        <h3>Ligji në fuqi</h3>
        <p>Këto Kushte të Shërbimit rregullohen dhe ndërtohen në përputhje me ligjet e Kosovës. Ju në mënyrë të pakthyeshme i nënshtroheni juridiksionit ekskluziv të gjykatave të Kosovës.</p>`,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {});
}

export function policyDialogEnglish(event: Event, dialog: MatDialog): void {
  event.preventDefault();
  event.stopPropagation();
  const dialogRef = dialog.open(CustomDialogComponent, {
    width: '639.72px',
    panelClass: 'custom-dialog',
    data: {
      title: 'Privacy Policy',
      template: `
        <p>Your privacy is important to us. It is Behind the Comma Shpk's policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you, including across our website, www.travelonio.com, and other sites we own and operate.</p>
        <p>Personal information is any information about you which can be used to identify you. This includes information about you as a person (such as name, address, and date of birth), your devices, payment details, and even information about how you use a website or online service.</p>
        <p>In the event our site contains links to third-party sites and services, please be aware that those sites and services have their own privacy policies. After following a link to any third-party content, you should read their posted privacy policy information about how they collect and use personal information. This Privacy Policy does not apply to any of your activities after you leave our site.</p>
        <p>This policy is effective as of 1 February 2022.</p>
        <p>Last updated: 1 February 2022</p>
        <br>
        <h3><b>Information We Collect</b></h3>
        <p>Information we collect falls into one of two categories: “voluntarily provided” information and “automatically collected” information.</p>
        <p>“Voluntarily provided” information refers to any information you knowingly and actively provide us when using or participating in any of our services and promotions.</p>
        <p>“Automatically collected” information refers to any information automatically sent by your devices in the course of accessing our products and services.</p>
        <br>
        <h3><b>Log Data</b></h3>
        <p>When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your device’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details about your visit.</p>
        <p>Additionally, if you encounter certain errors while using the site, we may automatically collect data about the error and the circumstances surrounding its occurrence. This data may include technical details about your device, what you were trying to do when the error happened, and other technical information relating to the problem. You may or may not receive notice of such errors, even in the moment they occur, that they have occurred, or what the nature of the error is.</p>
        <p>Please be aware that while this information may not be personally identifying by itself, it may be possible to combine it with other data to personally identify individual persons.</p>
        <br>
        <h3><b>Device Data</b></h3>
        <p>When you visit our website or interact with our services, we may automatically collect data about your device, such as:</p>
        <ul><li>Device Type</li><li>Operating System</li><li>Geo-location data</li></ul>
        <p>Data we collect can depend on the individual settings of your device and software. We recommend checking the policies of your device manufacturer or software provider to learn what information they make available to us.</p>
        <br>
        <h3><b>Personal Information</b></h3>
        <p>We may ask for personal information — for example, when you use our services (i.e. Make a Reservation), subscribe to our newsletter or when you contact us — which may include one or more of the following:</p>
        <ul><li>Name</li><li>Email</li><li>Phone/mobile number</li><li>Home/mailing address</li></ul>
        <h3><b>Legitimate Reasons for Processing Your Personal Information</b></h3>
        <p>We only collect and use your personal information when we have a legitimate reason for doing so. In which instance, we only collect personal information that is reasonably necessary to provide our services to you.</p>
        <br>
        <h3><b>Collection and Use of Information</b></h3>
        <p>We may collect personal information from you when you do any of the following on our website:</p>
        <ul><li>Register for an account</li><li>Purchase any services (i.e Make a Reservation)</li><li>Enter any of our competitions, contests, sweepstakes, and surveys</li>
        <li>Sign up to receive updates from us via email or social media channels</li><li>Use a mobile device or web browser to access our content</li><li>Contact us via email, social media, or on any similar technologies</li><li>When you mention us on social media</li></ul>
        <p>We may collect, hold, use, and disclose information for the following purposes, and personal information will not be further processed in a manner that is incompatible with these purposes:</p>
        <ul><li>to provide you with our platform's core features and services</li><li>to deliver products and/or services to you</li><li>to contact and communicate with you</li><li>for advertising and marketing, including to send you promotional information about our products and services and information about third parties that we consider may be of interest to you</li>
        <li>for internal record keeping and administrative purposes</li><li>to run competitions, sweepstakes, and/or offer additional benefits to you</li><li>to comply with our legal obligations and resolve any disputes that we may have</li></ul>
        <p>We may combine voluntarily provided and automatically collected personal information with general information or research data we receive from other trusted sources. For example, If you provide us with your location, we may combine this with general information about currency and language to provide you with an enhanced experience of our site and service.</p>
        <br>
        <h3><b>Security of Your Personal Information</b></h3>
        <p>When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.</p>
        <p>Although we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure, and no one can guarantee absolute data security.</p>
        <p>You are responsible for selecting any password and its overall security strength, ensuring the security of your own information within the bounds of our services. For example, ensuring any passwords associated with accessing your personal information and accounts are secure and confidential.</p>
        <br>
        <h3><b>How Long We Keep Your Personal Information</b></h3>
        <p>We keep your personal information only for as long as we need to. This time period may depend on what we are using your information for, in accordance with this privacy policy. For example, if you have provided us with personal information as part of creating an account with us, we may retain this information for the duration your account exists on our system. If your personal information is no longer required for this purpose, we will delete it or make it anonymous by removing all details that identify you.</p>
        <p>However, if necessary, we may retain your personal information for our compliance with a legal, accounting, or reporting obligation or for archiving purposes in the public interest, scientific, or historical research purposes or statistical purposes.</p>
        <h3><b>Disclosure of Personal Information to Third Parties</b></h3>
        <p>We may disclose personal information to:</p>
        <ul><li>a accommodation provider with which Guests have made a Reservation</li><li>a parent, subsidiary, or affiliate of our company</li><li>third-party service providers for the purpose of enabling them to provide their services, including (without limitation) IT service providers, data storage, hosting and server providers, error loggers, debt collectors, maintenance or problem-solving providers, marketing providers and professional advisors.</li>
        <li>our employees, contractors, and/or related entities</li><li>our existing or potential agents or business partners</li><li>sponsors or promoters of any competition, sweepstakes, or promotion we run</li>
        <li>courts, tribunals, and regulatory authorities, in the event you fail to pay for goods or services we have provided to you</li><li>courts, tribunals, regulatory authorities, and law enforcement officers, as required by law, in connection with any actual or prospective legal proceedings, or in order to establish, exercise, or defend our legal rights</li>
        <li>third parties, including agents or sub-contractors, who assist us in providing information, products, services, or direct marketing to you</li><li>third parties to collect and process data</li>
        <li>an entity that buys, or to which we transfer all or substantially all of our assets and business</li></ul>
        <p>Third parties we currently use include:</p>
        <ul><li>MailChimp</li></ul>
        <br>
        <h3><b>Your Rights and Controlling Your Personal Information</b></h3>
        <p><b>Your choice:</b> By providing personal information to us, you understand we will collect, hold, use, and disclose your personal information in accordance with this privacy policy. You do not have to provide personal information to us, however, if you do not, it may affect your use of our website or the products and/or services offered on or through it.</p>
        <p><b>Information from third parties:</b> If we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person’s consent to provide the personal information to us.</p>
        <p><b>Marketing permission:</b> If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by contacting us using the details below.</p>
        <p><b>Access:</b> You may request details of the personal information that we hold about you.</p>
        <p><b>Correction:</b> If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading, or out of date.</p>
        <p><b>Non-discrimination:</b> We will not discriminate against you for exercising any of your rights over your personal information. Unless your personal information is required to provide you with a particular service or offer (for example processing and fulfilling orders), we will not deny you goods or services and/or charge you different prices or rates for goods or services, including through granting discounts or other benefits, or imposing penalties, or provide you with a different level or quality of goods or services.</p>
        <p><b>Notification of data breaches:</b> We will comply with laws applicable to us in respect of any data breach.</p>
        <p><b>Complaints:</b> If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint.</p>
        <p><b>Unsubscribe:</b> To unsubscribe from our email database or opt-out of communications (including marketing communications), please contact us using the details provided in this privacy policy, or opt-out using the opt-out facilities provided in the communication. We may need to request specific information from you to help us confirm your identity.</p>
        <br>
        <h3><b>Use of Cookies</b></h3>
        <p>We use “cookies” to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site. This helps us serve you content based on preferences you have specified.</p>
        <p>Please refer to our Cookie Policy for more information.</p>
        <h3><b>Business Transfers</b></h3>
        <p>If we or our assets are acquired, or in the unlikely event that we go out of business or enter bankruptcy, we would include data, including your personal information, among the assets transferred to any parties who acquire us. You acknowledge that such transfers may occur, and that any parties who acquire us may, to the extent permitted by applicable law, continue to use your personal information according to this policy, which they will be required to assume as it is the basis for any ownership or use rights we have over such information.</p>
        <br>
        <h3><b>Limits of Our Policy</b></h3>
        <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices.</p>
        <br>
        <h3><b>Changes to This Policy</b></h3>
        <p>At our discretion, we may change our privacy policy to reflect updates to our business processes, current acceptable practices, or legislative or regulatory changes. If we decide to change this privacy policy, we will post the changes here at the same link by which you are accessing this privacy policy.</p>
        <p>If the changes are significant, or if required by applicable law, we will contact you (based on your selected preferences for communications from us) and all our registered users with the new details and links to the updated or changed policy.</p>
        <p>If required by law, we will get your permission or give you the opportunity to opt in to or opt out of, as applicable, any new uses of your personal information.</p>
        <br>
        <h3><b>Payment processing details</b></h3>
        <p>We do not collect, store or process bank card details with which payment can be made. In cases where payment processing is performed by third parties the terms and policies of third parties apply.</p>
        <br>
        <h3><b>Contact Us</b></h3>
        <p>For any questions or concerns regarding your privacy, you may contact us using the following details:</p>
        <p>Behind the Comma Shpk</p>
        <a href="mailto:hello@travelonio.com">hello@travelonio.com</a>
        <br>
        <a href="https://www.travelonio.com">www.travelonio.com</a>
          `,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {});
}

export function policyDialogShqip(event: Event, dialog: MatDialog): void {
  event.preventDefault();
  event.stopPropagation();
  const dialogRef = dialog.open(CustomDialogComponent, {
    width: '639.72px',
    panelClass: 'custom-dialog',
    data: {
      title: 'Politika e privatësisë',
      template: `
        <p>Privatësia juaj është e rëndësishme për ne. Është prapa politikës së Comma Shpk që të respektojë privatësinë tuaj dhe të jetë në përputhje me çdo ligj dhe rregullore të zbatueshme në lidhje me çdo informacion personal që mund të mbledhim për ju, duke përfshirë në faqen tonë të internetit, www.travelonio.com, dhe faqet e tjera që zotërojmë dhe operojmë.</p>
        <p>Informacioni personal është çdo informacion rreth jush që mund të përdoret për t'ju identifikuar. Kjo përfshin informacione për ju si person (si emri, adresa dhe data e lindjes), pajisjet tuaja, detajet e pagesës, madje edhe informacioni se si përdorni një uebsajt ose shërbim në internet.</p>
        <p>Në rast se faqja jonë përmban lidhje me faqet dhe shërbimet e palëve të treta, ju lutemi kini parasysh se ato sajte dhe shërbime kanë politikat e tyre të privatësisë. Pasi të keni ndjekur një lidhje me çdo përmbajtje të palëve të treta, duhet të lexoni informacionin e postuar të politikës së privatësisë se si ata mbledhin dhe përdorin informacionin personal. Kjo politikë e privatësisë nuk zbatohet për asnjë nga aktivitetet tuaja pasi të largoheni nga faqja jonë.</p>
        <p>Kjo politikë hyn në fuqi nga 1 shkurt 2022.</p>
        <p>Përditësimi i fundit: 1 shkurt 2022</p>
        <br>
        <h3>Informacioni që mbledhim</h3>
        <p>Informacioni që mbledhim bie në njërën nga dy kategoritë: informacione "të siguruara vullnetarisht" dhe informacion "të mbledhur automatikisht".</p>
        <p>Informacioni "i dhënë vullnetarisht" i referohet çdo informacioni që na jepni me vetëdije dhe në mënyrë aktive kur përdorni ose merrni pjesë në ndonjë nga shërbimet dhe promovimet tona.</p>
        <p>Informacioni "i mbledhur automatikisht" i referohet çdo informacioni të dërguar automatikisht nga pajisjet tuaja gjatë qasjes në produktet dhe shërbimet tona.</p>
        <br>
        <h3>Të dhënat e regjistrit</h3>
        <p>Kur vizitoni faqen tonë të internetit, serverët tanë mund të regjistrojnë automatikisht të dhënat standarde të ofruara nga shfletuesi juaj i internetit. Mund të përfshijë adresën e Protokollit të Internetit (IP) të pajisjes suaj, llojin dhe versionin e shfletuesit tuaj, faqet që vizitoni, kohën dhe datën e vizitës suaj, kohën e kaluar në secilën faqe dhe detaje të tjera në lidhje me vizitën tuaj.</p>
        <p>Për më tepër, nëse hasni gabime të caktuara gjatë përdorimit të sajtit, ne mund të mbledhim automatikisht të dhëna për gabimin dhe rrethanat që lidhen me shfaqjen e tij. Këto të dhëna mund të përfshijnë detaje teknike për pajisjen tuaj, atë që po përpiqeshit të bënit kur ndodhi gabimi dhe informacione të tjera teknike në lidhje me problemin. Ju mund ose nuk mund të merrni njoftim për gabime të tilla, edhe në momentin që ato ndodhin, se ato kanë ndodhur, ose cila është natyra e gabimit.</p>
        <p>Ju lutemi, kini parasysh se megjithëse ky informacion mund të mos jetë personalisht identifikues në vetvete, mund të jetë i mundur kombinimi i tij me të dhëna të tjera për të identifikuar personalisht persona individualë.</p>
        <br>
        <h3>Të dhënat e pajisjes</h3>
        <p>Kur vizitoni faqen tonë të internetit ose ndërveproni me shërbimet tona, ne mund të mbledhim automatikisht të dhëna për pajisjen tuaj, si p.sh.</p>
        <ul><li>Lloji i pajisjes</li><li>Sistemi Operativ</li><li>Të dhënat e gjeo-lokacionit</li></ul>
        <p>Të dhënat që mbledhim mund të varen nga cilësimet individuale të pajisjes dhe softuerit tuaj. Ne ju rekomandojmë të kontrolloni politikat e prodhuesit të pajisjes ose ofruesit të softuerit tuaj për të mësuar se çfarë informacioni na vënë në dispozicion.</p>
        <br>
        <h3>Informata personale</h3>
        <p>Ne mund të kërkojmë informacion personal - për shembull, kur përdorni shërbimet tona (p.sh. bëni një rezervim), pajtohuni në buletinin tonë ose kur na kontaktoni - të cilat mund të përfshijnë një ose më shumë nga sa vijon:</p>
        <ul><li>Emri</li><li>Email</li><li>Numri i telefonit / celularit</li><li>Adresa e shtëpisë/postës</li></ul>
        <br>
        <h3>Arsyet legjitime për përpunimin e informacionit tuaj personal</h3>
        <p>Ne mbledhim dhe përdorim të dhënat tuaja personale vetëm kur kemi një arsye legjitime për ta bërë këtë. Në këtë rast, ne mbledhim vetëm informacione personale që janë të nevojshme në mënyrë të arsyeshme për t'ju ofruar shërbimet tona.</p>
        <br>
        <h3>Mbledhja dhe përdorimi i informacionit</h3>
        <p>Ne mund të mbledhim informacion personal nga ju kur bëni ndonjë nga sa vijon në faqen tonë të internetit:</p>
        <ul><li>Regjistrohu për një llogari</li><li>Blini ndonjë shërbim (p.sh. Bëni një Rezervim)</li><li>Hyni në ndonjë nga garat, lotaritë dhe anketat tona</li><li>Regjistrohuni për të marrë përditësime nga ne përmes emailit ose kanaleve të mediave sociale</li><li>Përdorni një pajisje celulare ose shfletues uebi për të hyrë në përmbajtjen tonë</li><li>Na kontaktoni përmes emailit, mediave sociale ose në ndonjë teknologji të ngjashme</li><li>Kur na përmendni në rrjetet sociale</li></ul>
        <p>Ne mund të mbledhim, mbajmë, përdorim dhe zbulojmë informacione për qëllimet e mëposhtme dhe informacioni personal nuk do të përpunohet më tej në një mënyrë që është e papajtueshme me këto qëllime:</p>
        <ul><li>për t'ju ofruar veçoritë dhe shërbimet kryesore të platformës sonë</li><li>për të ofruar produkte dhe/ose shërbime për ju</li><li>për të kontaktuar dhe komunikuar me ju</li><li>për reklamat dhe marketingun, duke përfshirë dërgimin e informacionit promovues për produktet dhe shërbimet tona dhe informacionin rreth palëve të treta që ne konsiderojmë se mund të jenë me interes për ju</li><li>për mbajtjen e të dhënave të brendshme dhe qëllime administrative</li><li>për të drejtuar gara, lotari dhe/ose për të ofruar përfitime shtesë për ju</li><li>për të përmbushur detyrimet tona ligjore dhe për të zgjidhur çdo mosmarrëveshje që mund të kemi</li></ul>
        <p>Ne mund të kombinojmë informacionin personal të siguruar vullnetarisht dhe të mbledhur automatikisht me informacione të përgjithshme ose të dhëna kërkimore që marrim nga burime të tjera të besueshme. Për shembull, nëse na jepni vendndodhjen tuaj, ne mund ta kombinojmë këtë me informacione të përgjithshme rreth monedhës dhe gjuhës për t'ju ofruar një përvojë të përmirësuar të faqes dhe shërbimit tonë.</p>
        <br>
        <h3>Siguria e Informacionit Tuaj Personal</h3>
        <p>Kur mbledhim dhe përpunojmë informacione personale, dhe ndërkohë që e ruajmë këtë informacion, ne do ta mbrojmë atë brenda mjeteve të pranueshme komerciale për të parandaluar humbjen dhe vjedhjen, si dhe aksesin, zbulimin, kopjimin, përdorimin ose modifikimin e paautorizuar.</p>
        <p>Megjithëse do të bëjmë çmos për të mbrojtur informacionin personal që na jepni, ne këshillojmë që asnjë metodë e transmetimit ose ruajtjes elektronike nuk është 100% e sigurt dhe askush nuk mund të garantojë sigurinë absolute të të dhënave.</p>
        <p>Ju jeni përgjegjës për zgjedhjen e çdo fjalëkalimi dhe fuqinë e tij të përgjithshme të sigurisë, duke siguruar sigurinë e informacionit tuaj brenda kufijve të shërbimeve tona. Për shembull, të siguroheni që çdo fjalëkalim që lidhet me aksesin në informacionin dhe llogaritë tuaja personale të jetë i sigurt dhe konfidencial.</p>
        <br>
        <h3>Sa kohë i ruajmë të dhënat tuaja personale</h3>
        <p>Ne i ruajmë të dhënat tuaja personale vetëm për aq kohë sa na nevojitet. Kjo periudhë kohore mund të varet nga ajo për çfarë po përdorim informacionin tuaj, në përputhje me këtë politikë të privatësisë. Për shembull, nëse na keni dhënë informacion personal si pjesë e krijimit të një llogarie me ne, ne mund ta ruajmë këtë informacion për kohëzgjatjen që llogaria juaj ekziston në sistemin tonë. Nëse informacioni juaj personal nuk kërkohet më për këtë qëllim, ne do t'i fshijmë ose do t'i bëjmë anonime duke hequr të gjitha detajet që ju identifikojnë.</p>
        <p>Megjithatë, nëse është e nevojshme, ne mund të ruajmë informacionin tuaj personal për përputhjen tonë me një detyrim ligjor, kontabël ose raportimi ose për qëllime arkivimi në interes publik, qëllime kërkimore shkencore ose historike ose qëllime statistikore.</p>
        <br>
        <h3>Zbulimi i të dhënave personale palëve të treta</h3>
        <p>Ne mund të zbulojmë informacione personale për:</p>
        <ul><li>një ofrues akomodimi me të cilin Vizitorët kanë bërë një Rezervim</li><li>një mëmë ose filial i kompanisë sonë</li><li>ofruesit e shërbimeve të palëve të treta për t'i mundësuar ata të ofrojnë shërbimet e tyre, duke përfshirë (pa kufizim) ofruesit e shërbimeve të TI-së, ruajtjen e të dhënave, ofruesit e pritjes dhe serverëve, regjistrimet e gabimeve, mbledhësit e borxheve, ofruesit e mirëmbajtjes ose zgjidhjes së problemeve, ofruesit e marketingut dhe profesionistët këshilltarët.</li><li>punonjësit tanë, kontraktorët dhe/ose subjektet e lidhura me to</li><li>agjentët ose partnerët tanë të biznesit ekzistues ose potencial</li><li>sponsorët ose promovuesit e çdo konkursi, lotari ose promovimi që ne bëjmë</li><li>Gjykatat dhe autoritetet rregullatore, në rast se nuk paguani për mallrat ose shërbimet që ju kemi ofruar</li><li>Gjykatat, autoritetet rregullatore dhe oficerët e zbatimit të ligjit, siç kërkohet nga ligji, në lidhje me ndonjë procedurë ligjore aktuale ose të mundshme, ose me qëllim që të vendosim, ushtrojmë ose mbrojmë të drejtat tona ligjore</li><li>palë të treta, duke përfshirë agjentët ose nënkontraktorët, të cilët na ndihmojnë në ofrimin e informacionit, produkteve, shërbimeve ose marketingut të drejtpërdrejtë për ju</li><li>palët e treta për të mbledhur dhe përpunuar të dhëna</li><li>një njësi ekonomike që blen, ose të cilës ne i transferojmë të gjitha ose në thelb të gjitha aktivet dhe biznesin tonë</li></ul>
        <p>Palët e treta që përdorim aktualisht përfshijnë:</p>
        <ul><li>MailChimp</li></ul>
        <br>
        <h3>Të drejtat tuaja dhe kontrolli i informacionit tuaj personal</h3>
        <p><b>Zgjedhja juaj:</b> Duke na dhënë informacion personal, ju e kuptoni që ne do të mbledhim, mbajmë, përdorim dhe zbulojmë informacionin tuaj personal në përputhje me këtë politikë të privatësisë. Ju nuk keni nevojë të na jepni informacion personal, megjithatë, nëse nuk e bëni këtë, mund të ndikojë në përdorimin tuaj të faqes sonë të internetit ose të produkteve dhe/ose shërbimeve të ofruara në ose nëpërmjet tij.</p>
        <p><b>Informacion nga palët e treta:</b> Nëse marrim informacion personal për ju nga një palë e tretë, ne do ta mbrojmë atë siç përcaktohet në këtë politikë të privatësisë. Nëse jeni një palë e tretë që ofron informacione personale për dikë tjetër, ju përfaqësoni dhe garantoni se keni pëlqimin e personit të tillë për të na dhënë informacionin personal.</p>
        <p><b>Leja e marketingut:</b> Nëse më parë keni rënë dakord që ne të përdorim informacionin tuaj personal për qëllime të marketingut të drejtpërdrejtë, mund të ndryshoni mendje në çdo kohë duke na kontaktuar duke përdorur detajet e mëposhtme.</p>
        <p><b>Qasja:</b> Ju mund të kërkoni detaje të informacionit personal që ne mbajmë për ju.</p>
        <p><b>Korrigjim:</b> Nëse besoni se çdo informacion që mbajmë për ju është i pasaktë, i vjetëruar, i paplotë, i parëndësishëm ose mashtrues, ju lutemi na kontaktoni duke përdorur detajet e dhëna në këtë politikë të privatësisë. Ne do të ndërmarrim hapa të arsyeshëm për të korrigjuar çdo informacion që rezulton i pasaktë, i paplotë, mashtrues ose i vjetëruar.</p>
        <p><b>Mosdiskriminimi:</b> Ne nuk do t'ju diskriminojmë për ushtrimin e ndonjë të drejte mbi informacionin tuaj personal. Nëse informacioni juaj personal nuk kërkohet për t'ju ofruar një shërbim ose ofertë të caktuar (për shembull përpunimi dhe përmbushja e porosive), ne nuk do t'ju mohojmë mallrat ose shërbimet dhe/ose nuk do t'ju ngarkojmë çmime ose tarifa të ndryshme për mallrat ose shërbimet, duke përfshirë dhënien e zbritjeve ose përfitime të tjera, ose vendosjen e gjobave, ose t'ju ofrojnë një nivel ose cilësi të ndryshme të mallrave ose shërbimeve.</p>
        <p><b>Njoftimi për shkeljet e të dhënave:</b> Ne do të respektojmë ligjet e zbatueshme për ne në lidhje me çdo shkelje të të dhënave.</p>
        <p><b>Çregjistrohu:</b> Për t'u çregjistruar nga baza e të dhënave tona të postës elektronike ose për të hequr dorë nga komunikimet (përfshirë komunikimet e marketingut), ju lutemi na kontaktoni duke përdorur detajet e dhëna në këtë politikë të privatësisë ose tërhiqeni duke përdorur lehtësitë e tërheqjes së ofruar në komunikim. Mund të na duhet të kërkojmë informacion specifik nga ju për të na ndihmuar të konfirmojmë identitetin tuaj.</p>
        <br>
        <h3>Përdorimi i Cookies</h3>
        <p>Ne përdorim "cookies" për të mbledhur informacion rreth jush dhe aktivitetit tuaj në faqen tonë. Një cookie është një pjesë e vogël e të dhënave që faqja jonë e internetit e ruan në kompjuterin tuaj dhe e akseson sa herë që e vizitoni, në mënyrë që të kuptojmë se si e përdorni faqen tonë. Kjo na ndihmon t'ju ofrojmë përmbajtje bazuar në preferencat që keni specifikuar.</p>
        <p>Ju lutemi referojuni Politikës sonë të Cookie për më shumë informacion.</p>
        <br>
        <h3>Transfertat e biznesit</h3>
        <p>Nëse ne ose asetet tona janë blerë, ose në rast të pamundur që ne të dalim nga biznesi ose të falimentojmë, ne do të përfshijmë të dhëna, duke përfshirë informacionin tuaj personal, midis aseteve të transferuara te çdo palë që na blen. Ju e pranoni se transferime të tilla mund të ndodhin dhe se çdo palë që na blen mundet, në masën e lejuar nga ligji në fuqi, të vazhdojë të përdorë informacionin tuaj personal sipas kësaj politike, të cilën do t'u kërkohet të supozojnë pasi është baza për çdo të drejtat e pronësisë ose përdorimit që kemi mbi një informacion të tillë.</p>
        <br>
        <h3>Kufijtë e politikës sonë</h3>
        <p>Faqja jonë e internetit mund të lidhet me sajte të jashtme që nuk operohen nga ne. Ju lutemi, kini parasysh se ne nuk kemi asnjë kontroll mbi përmbajtjen dhe politikat e atyre faqeve dhe nuk mund të pranojmë përgjegjësi ose përgjegjësi për praktikat e tyre përkatëse të privatësisë.</p>
        <br>
        <h3>Ndryshimet në këtë politikë</h3>
        <p>Sipas gjykimit tonë, ne mund të ndryshojmë politikën tonë të privatësisë për të pasqyruar përditësimet në proceset tona të biznesit, praktikat aktuale të pranueshme ose ndryshimet legjislative ose rregullatore. Nëse vendosim të ndryshojmë këtë politikë të privatësisë, ne do t'i postojmë ndryshimet këtu në të njëjtën lidhje me të cilën ju po i aksesoni këtë politikë të privatësisë.</p>
        <p>Nëse ndryshimet janë të rëndësishme, ose nëse kërkohet nga ligji në fuqi, ne do t'ju kontaktojmë (bazuar në preferencat tuaja të zgjedhura për komunikimet nga ne) dhe të gjithë përdoruesit tanë të regjistruar me detajet e reja dhe lidhjet me politikën e përditësuar ose të ndryshuar.</p>
        <p>Nëse kërkohet nga ligji, ne do të marrim lejen tuaj ose do t'ju japim mundësinë të zgjedhni ose të hiqni dorë nga, sipas rastit, çdo përdorim të ri të informacionit tuaj personal.</p>
        <br>
        <h3>Detajet e përpunimit të pagesës</h3>
        <p>Ne nuk mbledhim, ruajmë ose përpunojmë detajet e kartës bankare me të cilat mund të bëhet pagesa. Në rastet kur procesimi i pagesës kryhet nga palë të treta zbatohen kushtet dhe politikat e palëve të treta.</p>
        <br>
        <h3>Na kontaktoni</h3>
        <p>Për çdo pyetje ose shqetësim në lidhje me privatësinë tuaj, mund të na kontaktoni duke përdorur të dhënat e mëposhtme:</p>
        <br>
        <p>Behind the Comma Shpk</p>
        <a href="mailto:hello@travelonio.com">hello@travelonio.com</a>
        <br>
        <a href="https://www.travelonio.com">www.travelonio.com</a>`,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {});
}

export function openHelpDialogEnglish(event: Event, dialog: MatDialog): void {
  event.preventDefault();
  event.stopPropagation();
  const dialogRef = dialog.open(CustomDialogComponent, {
    width: '639.72px',
    panelClass: 'custom-dialog',
    data: {
      title: 'Help',
      template: `
        <p>Seek help</p>
        <h3><b>Contact our customer service at:</b></h3>
				<p>
					<b>Tel. / Viber / Whatsapp: </b>
					<a href="tel:+38343848492">+ 383 43 84 84 92</a> 
				</p>
				<p>
					<b>Email: </b><a href="mailto:hello@travelonio.com">hello@travelonio.com</a>
				</p>
      `,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {});
}

export function openHelpDialogShqip(event: Event, dialog: MatDialog): void {
  event.preventDefault();
  event.stopPropagation();
  const dialogRef = dialog.open(CustomDialogComponent, {
    width: '639.72px',
    panelClass: 'custom-dialog',
    data: {
      title: 'Keni nevojë për ndihmë?',
      template: `
        <h3><b>Kontaktoni shërbimin tonë të klientit në:</b></h3>
				<p>
					<b>Tel. / Viber / Whatsapp: </b>
					<a href="tel:+38343848492">+ 383 43 84 84 92</a> 
				</p>
				<p>
					<b>Email: </b><a href="mailto:hello@travelonio.com">hello@travelonio.com</a>
				</p>
				`,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {});
}
