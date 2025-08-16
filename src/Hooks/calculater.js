//  reset input value

export function resetInputValue(el, max, min) {
  el.addEventListener("input", function () {
    let value = this.value.replace(/[^0-9]/g, "");
    if (value !== "") {
      let num = parseInt(value);
      if (num > max) num = max;
      if (num < min) num = min;
      value = num;
    }
    this.value = value;
  });
}

export function calculatorAge(year, month, day) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();
  //  new value
  let yearValue = currentYear - year;
  let monthValue = currentMonth - month;
  let dayValue = currentDay - day;

  if (dayValue < 0) {
    monthValue--;
    const previousMonthDate = new Date(currentYear, currentMonth - 1, 0);
    dayValue += previousMonthDate.getDate();
  }

  if (monthValue < 0) {
    yearValue--;
    monthValue += 12;
  }
  return `${yearValue} years & ${monthValue} month & ${dayValue} days`;
}
