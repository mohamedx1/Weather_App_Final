let searchInput = document.getElementById("searchInput");

const succsess = async (positiion) => {
  const latitude = positiion.coords.latitude;
  const longitude = positiion.coords.longitude;
  let city = `${latitude},${longitude}`;
  let finalData = await getData(city);
  console.log(finalData);
  displayData(finalData);
};
const error = () => {
  document.getElementById("city").innerHTML = "search for your location!";
};

navigator.geolocation.getCurrentPosition(succsess, error);

async function getData(city) {
  let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=307faa7dc572449795f115150242102&q=${city}&days=3&aqi=no&alerts=no`;
  // await console.log(apiData);
  let apiData = await fetch(apiUrl);
  let finalData = await apiData.json();
  console.log(finalData);
  return finalData;
}
async function search() {
  searchValue = searchInput.value;
  if (searchValue.length > 3) {
    let finalData = await getData(searchValue);
    displayData(finalData);
    console.log(finalData)
  }
}
document.getElementById("searchInput").addEventListener("input", search);
function getDayName(dateStr, locale) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
}

function displayData (finalData) {
  console.log(finalData);
  let cityName = finalData.location.name;
  let deg = finalData.current.temp_c;
  let todayStats = finalData.current.condition.text;
  let todayStatsICon = finalData.current.condition.icon;
  let day1 = finalData.forecast.forecastday[0];
  let day2 = finalData.forecast.forecastday[1];
  let day3 = finalData.forecast.forecastday[2];
  // let day4 = finalData.forecast.forecastday[3];

  let todayDate = day1.date;
  let dayTowDAte = day2.date;
  let dayThreeDate = day3.date;
  // let dayFourDate = day4.date;
  let today = getDayName(todayDate);
  let dayTow = getDayName(dayTowDAte);
  let dayThree = getDayName(dayThreeDate);
  // let dayFour = getDayName(dayFourDate);
  document.getElementById("city").innerHTML = cityName;
  document.getElementById("todayDegree").innerHTML = `${deg}&deg;`;
  document.getElementById("todayStats").innerHTML = todayStats;
  document.getElementById("todayIconStats").src = `https:${todayStatsICon}`;
  document.getElementById("todayDate").innerHTML = todayDate;
  document.getElementById("today").innerHTML = today;
  document.getElementById("dayTow").innerHTML = dayTow;
  document.getElementById("dayThree").innerHTML = dayThree;
  // document.getElementById("dayFour").innerHTML = dayFour;
  document.getElementById(
    "dayTowDegree"
  ).innerHTML = `${day2.day.avgtemp_c}&deg;`;
  document.getElementById(
    "dayThreeDegree"
  ).innerHTML = `${day3.day.avgtemp_c}&deg;`;
  // document.getElementById(
  //   "dayFourDegree"
  // ).innerHTML = `${day4.day.avgtemp_c}&deg;`;
  document.getElementById("towDayStats").innerHTML = day2.day.condition.text;
  document.getElementById("dayTowImg").src = `https:${day2.day.condition.icon}`;
  document.getElementById("threeDayStats").innerHTML = day3.day.condition.text;
  document.getElementById("dayThreeImg").src = `https:${day3.day.condition.icon}`;
  // document.getElementById("fourDayStats").innerHTML = day4.day.condition.text;
  // document.getElementById(   "dayFourImg" ).src = `https:${day4.day.condition.icon}`;
}

// https://github.com/mohamedx1/Weather_App.git
