package backend.utils

import backend.mongo.Booking

object EmailTemplates {

  def emailConfirmationTemplate(baseUrl: String, link: String, language: String): String = {
    language match {
      case "Albanian" =>
        s"""<div style="text-align: center;">
           |    <img width="200px" src="$baseUrl/assets/homePage/logo.png">
           |<h2>Konfirmo adresën tënde email</h2>
           |<p style="text-align:center;">Konfirmo adresën tënde email në mënyrë që të mund të hysh gjithmonë në llogarinë tënde dhe të marrësh informacione të rëndësishme nga ne</p>
           |<a href=$link"><button style="background-color: #673ab7; color: #ffffff; border: 0; width: 180px; height: 50px; border-radius: 25px;">Konfirmo Email</button></a>
           |<p style="text-align:center;">Ekipi juaj i Travelonio!<br><br>
           |Kontakt: <br>
           |hello@travelonio.com<br>
           |Tel: +383 43 84 84 92<br>
           |www.travelonio.com
           |</p>
           |</div>
           |""".stripMargin
      case "English" =>
        s"""<div style="text-align: center;">
           |    <img width="200px" src="$baseUrl/assets/homePage/logo.png">
           |<h2>Confirm your email address</h2>
           |<p style="text-align:center;">Confirm your email address so you can always access your account and get important information from us</p>
           |<a href=$link"><button style="background-color: #673ab7; color: #ffffff; border: 0; width: 180px; height: 50px; border-radius: 25px;">Confirm Email</button></a>
           |<p style="text-align:center;">Your travelonio team!<br><br>
           |Contact: <br>
           |hello@travelonio.com<br>
           |Tel: +383 43 84 84 92<br>
           |www.travelonio.com
           |</p>
           |</div>
           |""".stripMargin
    }

  }

  def emailResetPasswordTemplate(baseUrl: String, link: String): String =
    s"""<div style="text-align: center;">
       |    <img width="200px" src="$baseUrl/assets/homePage/logo.png">
       |<h2>Reset password link</h2>
       |<p style="text-align:center;">Click the button below to reset your password</p>
       |<a href=$link><button style="background-color: #673ab7; color: #ffffff; border: 0; width: 180px; height: 50px; border-radius: 25px;">Reset password</button></a>
       |<p style="text-align:center;">Your travelonio team!<br><br>
       |Contact: <br>
       |hello@travelonio.com<br>
       |Tel: +383 43 84 84 92<br>
       |www.travelonio.com
       |</p>
       |</div>
       |""".stripMargin

  def emailUserInviteTemplate(link: String): String =
    s"Please confirm your email by clicking here: $link"

  def emailUserBookedRoomTemplate(baseUrl: String, booking: List[Booking]): String =
    s"""<div>
       |  <div style="text-align: center">
       |    <img width="200px" src="$baseUrl/assets/homePage/logo.png" />
       |  </div>
       |  <div style="text-align: left">
       |    <p style="font-size: 22px">
       |      Hello ${booking.head.propertyFrozenData.user.name + " " + booking.head.propertyFrozenData.user.lastname} <br />
       |      Thank you for choosing Travelonio to find the right place for your trip. We are at your service to take care of your accommodation.<br /><br />
       |    </p>
       |    <div
       |      style="
       |      background-color: #E4E9FF;
       |      padding: 16px;
       |      margin: 8px;
       |      border-radius: 22px;
       |      color: #671BB5
       |    "
       |    >
       |      <p style="font-size: 28px">
       |        This is the confirmation of your reservation in the ${booking.head.propertyFrozenData.property.name}, for ${booking.head.startDate.toString} to ${booking.head.endDate.toString}. (If the user has made the payment through the platform) We have accepted your payment of xxx euros, and below you can find the details of your reservation:
       |      </p>
       |      <ul style="font-size: 22px">
       |        <li>
       |          Reservation number: ${booking.map(_._id.toString).mkString(", ")}
       |        </li>
       |        <li>
       |          Host Name: ${booking.head.propertyFrozenData.property.name}
       |        </li>
       |        <li>
       |          Name and surname: ${booking.head.propertyFrozenData.user.name} + ${booking.head.propertyFrozenData.user.lastname}
       |        </li>
       |        <li>Phone number / email address (optional): ${booking.head.propertyFrozenData.user.phone} / ${booking.head.propertyFrozenData.user.email}</li>
       |        <li>Date of arrival: ${booking.head.startDate.toString}</li>
       |        <li>Completion date: ${booking.head.endDate.toString}</li>
       |        <li>Special requirements (if available):</li>
       |        <li>Important information: (hotel rules, included in the price (parking, food, WiFi, payment details)</li>
       |        <li>Booking cancellation policies:</li>
       |      </ul>
       |    </div>
       |    <br />
       |    <p style="font-size: 22px">
       |      We remind you that the check-in time is at ${booking.head.startDate}, and the check-out is at ${booking.head.endDate}<br>
       |      Please do not hesitate to contact us if you have any questions, or changes you wish to make.
       |    </p>
       |    <br>
       |    <p style="font-size: 22px">We wish you a pleasant trip!</p>
       |    <p style="font-size: 22px">
       |      All the best,<br />
       |      Travelonio
       |    </p>
       |  </div>
       |</div>
       |""".stripMargin

  def emailOwnerBookedRoomTemplate(
      baseUrl: String,
      booking: List[Booking],
      propertyOwnerName: String,
      language: String
  ): String = {
    language match {
      case "Albanian" =>
        s"""<div>
           |  <div style="text-align: center">
           |    <img width="200px" src="$baseUrl/assets/homePage/logo.png" />
           |  </div>
           |  <div style="text-align: left">
           |    <p style="font-size: 22px">
           |      Të dashur ${propertyOwnerName} <br />
           |      Një rezervim i ri u regjistrua nga Travelonio.com<br /><br />
           |
           |      Detajet më poshtë:
           |
           |      ${booking.head.propertyFrozenData.user.name + " " + booking.head.propertyFrozenData.user.lastname} <br />
           |    </p>
           |    <div
           |      style="
           |      background-color: #E4E9FF;
           |      padding: 16px;
           |      margin: 8px;
           |      border-radius: 22px;
           |      color: #671BB5
           |    "
           |    >
           |      <p style="font-size: 28px">
           |        Ky është konfirmimi i rezervimit tuaj në ${booking.head.propertyFrozenData.property.name}, për periudhën nga ${booking.head.startDate.toString} deri më ${booking.head.endDate.toString}. (Nëse përdoruesi ka bërë pagesën përmes platformës) Kemi pranuar pagesën tuaj prej xxx euro, dhe më poshtë mund të gjeni detajet e rezervimit tuaj:
           |      </p>
           |      <ul style="font-size: 22px">
           |        <li>
           |          Numër rezervimi: ${booking.map(_._id.toString).mkString(", ")}
           |        </li>
           |        <li>
           |          Emri i mikpritësit: ${booking.head.propertyFrozenData.property.name}
           |        </li>
           |        <li>
           |          Emri dhe mbiemri: ${booking.head.propertyFrozenData.user.name} + ${booking.head.propertyFrozenData.user.lastname}
           |        </li>
           |        <li>Numri i telefonit / adresa e emailit (opsionale): ${booking.head.propertyFrozenData.user.phone} / ${booking.head.propertyFrozenData.user.email}</li>
           |        <li>Data e mbërritjes: ${booking.head.startDate.toString}</li>
           |        <li>Data e përfundimit: ${booking.head.endDate.toString}</li>
           |        <li>Kërkesa speciale (nëse disponohen):</li>
           |        <li>Informacion i rëndësishëm: (rregullat e hotelit, përfshirë në çmim (parking, ushqim, WiFi, detajet e pagesës)</li>
           |        <li>Politikat e anullimit të rezervimit:</li>
           |      </ul>
           |    </div>
           |    <br />
           |    <p style="font-size: 22px">
           |      Ju kujtojmë që ora e regjistrimit është në ${booking.head.startDate}, dhe ora e daljes është në ${booking.head.endDate}<br>
           |      Ju lutemi mos hezitoni të na kontaktoni nëse keni ndonjë pyetje, ose ndonjë ndryshim që dëshironi të bëni.
           |    </p>
           |    <br>
           |    <p style="font-size: 22px">Ju urojmë një udhëtim të këndshëm!</p>
           |    <p style="font-size: 22px">
           |      Të gjitha të mirat,<br />
           |      Travelonio
           |    </p>
           |  </div>
           |</div>
           |""".stripMargin
      case "English" =>
        s"""<div>
           |  <div style="text-align: center">
           |    <img width="200px" src="$baseUrl/assets/homePage/logo.png" />
           |  </div>
           |  <div style="text-align: left">
           |    <p style="font-size: 22px">
           |      Dear ${propertyOwnerName} <br />
           |      A new booking registered from Travelonio.com<br /><br />
           |
           |      Details below:
           |
           |      ${booking.head.propertyFrozenData.user.name + " " + booking.head.propertyFrozenData.user.lastname} <br />
           |    </p>
           |    <div
           |      style="
           |      background-color: #E4E9FF;
           |      padding: 16px;
           |      margin: 8px;
           |      border-radius: 22px;
           |      color: #671BB5
           |    "
           |    >
           |      <p style="font-size: 28px">
           |        This is the confirmation of your reservation in the ${booking.head.propertyFrozenData.property.name}, for ${booking.head.startDate.toString} to ${booking.head.endDate.toString}. (If the user has made the payment through the platform) We have accepted your payment of xxx euros, and below you can find the details of your reservation:
           |      </p>
           |      <ul style="font-size: 22px">
           |        <li>
           |          Reservation number: ${booking.map(_._id.toString).mkString(", ")}
           |        </li>
           |        <li>
           |          Host Name: ${booking.head.propertyFrozenData.property.name}
           |        </li>
           |        <li>
           |          Name and surname: ${booking.head.propertyFrozenData.user.name} + ${booking.head.propertyFrozenData.user.lastname}
           |        </li>
           |        <li>Phone number / email address (optional): ${booking.head.propertyFrozenData.user.phone} / ${booking.head.propertyFrozenData.user.email}</li>
           |        <li>Date of arrival: ${booking.head.startDate.toString}</li>
           |        <li>Completion date: ${booking.head.endDate.toString}</li>
           |        <li>Special requirements (if available):</li>
           |        <li>Important information: (hotel rules, included in the price (parking, food, WiFi, payment details)</li>
           |        <li>Booking cancellation policies:</li>
           |      </ul>
           |    </div>
           |    <br />
           |    <p style="font-size: 22px">
           |      We remind you that the check-in time is at ${booking.head.startDate}, and the check-out is at ${booking.head.endDate}<br>
           |      Please do not hesitate to contact us if you have any questions, or changes you wish to make.
           |    </p>
           |    <br>
           |    <p style="font-size: 22px">We wish you a pleasant trip!</p>
           |    <p style="font-size: 22px">
           |      All the best,<br />
           |      Travelonio
           |    </p>
           |  </div>
           |</div>
           |""".stripMargin
    }

  }

  def emailPropertyRegistrationEmail(
      baseUrl: String,
      startBookingDate: String,
      userNameAndLastName: String,
      language: String
  ): String = {
    language match {
      case "Albanian" =>
        s"""<div>
           |  <div style="text-align: center">
           |    <img width="200px" src="$baseUrl/assets/homePage/logo.png" />
           |  </div>
           |  <h1 style="text-align: center; color: #ff5705; font-size: 40px">Mirë se vini në Travelonio</h1>
           |  <div style="text-align: left">
           |    <p style="font-size: 22px">
           |      Përshëndetje $userNameAndLastName,<br />
           |      Mirë se vini në platformën dixhitale të Travelonio!<br /><br />
           |      Ju keni përfunduar me sukses të gjitha hapësirat e regjistrimit; tani, klientët e platformës sonë do të jenë në gjendje të zgjedhin pronën tuaj dhe të bëjnë rezervimet e tyre për akomodim.<br /><br />
           |    </p>
           |    <div
           |      style="
           |      background-color: #e4e9ff;
           |      padding: 16px;
           |      margin: 8px;
           |      border-radius: 22px;
           |      color: #671bb5
           |    "
           |    >
           |      <p style="font-size: 32px">
           |        Ju sigurojmë se keni bërë zgjedhjen e duhur duke vendosur të pranoni rezervime nga ne, sepse:
           |      </p>
           |      <ol style="font-size: 22px">
           |        <li>
           |          Ne jemi platforma lokale e parë për turistët për të bërë rezervime në internet përmes telefonit celular, kompjuterit ose duke telefonuar qendrën tonë të shërbimit për konsumatorët.
           |        </li>
           |        <li>
           |          Shërbimi ynë për konsumatorët ju ndihmon në çdo vështirësi që mund të hasni, dhe jo vetëm. Me shërbimin për konsumatorët, ju mund të komunikoni përmes numrit të telefonit +383 43 84 84 92 dhe adresës sonë të emailit hello@travelonio.com, si dhe me ndihmën e funksionit "Chat" që shfaqet në ekran kur vizitoni faqen tonë.
           |        </li>
           |        <li>
           |          Turistët mund të lënë vlerësimet e tyre për qëndrimin dhe përvojat në objektet që ju ofroni, duke ju mundësuar të fitoni një reflektim të mirë vetes tek të gjithë vizitorët e tjerë.
           |        </li>
           |      </ol>
           |    </div>
           |    <br />
           |    <p style="font-size: 22px">
           |      Ju kujtojmë që do të merrni rezervime nga turistët që nga data $startBookingDate që keni vendosur gjatë regjistrimit.
           |    </p>
           |    <p style="font-size: 22px">Ju urojmë fat të mirë!</p>
           |    <br />
           |    <p style="font-size: 22px">
           |      Të gjitha të mirat,<br />
           |      Ekipi i Travelonio
           |    </p>
           |  </div>
           |</div>
           |""".stripMargin
      case "English" =>
        s"""<div>
           |  <div style="text-align: center">
           |    <img width="200px" src="$baseUrl/assets/homePage/logo.png" />
           |  </div>
           |  <h1 style="text-align: center; color: #ff5705; font-size: 40px">Welcome to Travelonio</h1>
           |  <div style="text-align: left">
           |    <p style="font-size: 22px">
           |      Dear $userNameAndLastName,<br />
           |      Welcome to the Travelonio digital platform!<br /><br />
           |      You have successfully completed all the registration steps; now, our
           |      platform clients will be able to choose your property and make their
           |      reservations for accommodation.<br /><br />
           |    </p>
           |    <div
           |      style="
           |      background-color: #e4e9ff;
           |      padding: 16px;
           |      margin: 8px;
           |      border-radius: 22px;
           |      color: #671bb5
           |    "
           |    >
           |      <p style="font-size: 32px">
           |        We assure you that you have made the right choice by deciding to accept
           |        reservations from us because:
           |      </p>
           |      <ol style="font-size: 22px">
           |        <li>
           |          We are the first local platform for tourists to make online reservations
           |          via mobile phone, computer, or by calling our customer service center.
           |        </li>
           |        <li>
           |          Our customer service helps you in any difficulties you may encounter,
           |          and not only. With the customer service, you can communicate through the
           |          phone number +383 43 84 84 92 and our email address
           |          hello@travelonio.com, as well as with the help of the "Chat" function
           |          that appears on the screen when you visit our site.
           |        </li>
           |        <li>
           |          Tourists can leave their reviews for their stay and experiences in the
           |          facilities you offer, thus enabling you to gain a good reflection of
           |          yourself to all other visitors.
           |        </li>
           |      </ol>
           |    </div>
           |    <br />
           |    <p style="font-size: 22px">
           |      We remind you that you will receive reservations from tourists from the date
           |      $startBookingDate that you have placed during registration.
           |    </p>
           |    <p style="font-size: 22px">We wish you best of luck!</p>
           |    <br />
           |    <p style="font-size: 22px">
           |      All the best,<br />
           |      The Travelonio team
           |    </p>
           |  </div>
           |</div>
           |""".stripMargin
    }

  }
}
