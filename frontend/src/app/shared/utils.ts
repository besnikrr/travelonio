export function float(value: number): string {
  return parseFloat(String(value)).toFixed(2);
}
export function nightsCalculator(checkin: string, checkout: string): number {
  const startDate = checkin.split('-');
  const endDate = checkout.split('-');
  const nights = Math.abs(
    new Date(+endDate[2], +endDate[1] - 1, +endDate[0]).getTime() -
      new Date(+startDate[2], +startDate[1] - 1, +startDate[0]).getTime()
  );
  return Math.ceil(nights / (1000 * 60 * 60 * 24));
}

export function subtractDaysFromDate(dateString, days) {
  var dateParts = dateString.split('-');
  var day = parseInt(dateParts[0]);
  var month = parseInt(dateParts[1]) - 1; // January is 0
  var year = parseInt(dateParts[2]);

  var date = new Date(year, month, day);
  date.setDate(date.getDate() - days);

  var resultDay = date.getDate();
  var resultMonth = date.getMonth() + 1; // January is 0
  var resultYear = date.getFullYear();

  // Format the result with leading zeros if necessary
  var formattedDay = resultDay.toString().padStart(2, '0');
  var formattedMonth = resultMonth.toString().padStart(2, '0');

  return formattedDay + '-' + formattedMonth + '-' + resultYear;
}
