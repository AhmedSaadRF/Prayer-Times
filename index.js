let cities = [
  {
    ar: "كفر الشيخ",
    en: "Kafr ash Shaykh",
  },
  {
    ar: "القاهرة",
    en: "Al Qāhirah",
  },
  {
    ar: "المنيا",
    en: "Al Minyā",
  },
  {
    ar: "الإسكندرية",
    en: "Alexandria",
  },
  {
    ar: "الدقهلية",
    en: "Al Dakahlīyah",
  },
  {
    ar: "البحر الاحمر",
    en: "Al Baḩr al Aḩmar",
  },
  {
    ar: "البحيرة",
    en: "Al Buhayrah",
  },
  {
    ar: "الفيوم",
    en: "Al Fayyūm",
  },
  {
    ar: "الغربية",
    en: "Al Gharbīyah",
  },
  {
    ar: "الاسماعيلية",
    en: "Al Ismā'īlīyah",
  },
  {
    ar: "الجيزة",
    en: "Al Jīzah",
  },
  {
    ar: "المنوفية",
    en: "Al Minūfīyah",
  },
  {
    ar: "القليوبية",
    en: "Al Qalyūbīyah",
  },
  {
    ar: "الاقصر",
    en: "Al Uqşur",
  },
  {
    ar: "الوادى الجديد",
    en: "Al Wādī al Jadīd",
  },
  {
    ar: "سيوة",
    en: "As Suways",
  },
  {
    ar: "الشرقية",
    en: "Al Sharqīyah",
  },
  {
    ar: "اسوان",
    en: "Aswān",
  },
  {
    ar: "اسيوط",
    en: "Asyūţ",
  },
  {
    ar: "بني سويف",
    en: "Banī Suwayf",
  },
  {
    ar: "بورسعيد",
    en: "Bur Sa’īd",
  },
  {
    ar: "دمياط",
    en: "Dimyāţ",
  },
  {
    ar: "جنوب سيناء",
    en: "Janūb Sīnā’",
  },
  {
    ar: "مطروح",
    en: "Matrūḩ",
  },
  {
    ar: "قنا",
    en: "Qinā",
  },
  {
    ar: "سوهاج",
    en: "Sūhāj",
  },
  {
    ar: "شمال سيناء",
    en: "Shamāl Sīnā’",
  },
];

function getPrayerTimingsOfCity(cityName) {
  let params = {
    country: "EG",
    city: cityName,
  };
  axios
    .get("https://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      let data = response.data.data.timings;
      fillPrayerTimes("fajr", data.Fajr);
      fillPrayerTimes("sunrise", data.Sunrise);
      fillPrayerTimes("dhuhr", data.Dhuhr);
      fillPrayerTimes("asr", data.Asr);
      fillPrayerTimes("maghrib", data.Maghrib);
      fillPrayerTimes("isha", data.Isha);
      let readableDate = response.data.data.date.readable;
      let weekDay = response.data.data.date.hijri.weekday.ar;
      const date = weekDay + " " + readableDate;
      document.getElementById("date").innerHTML = date;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getPrayerTimingsOfCity("Kafr ash Shaykh");

function fillPrayerTimes(id, time) {
  document.getElementById(id).innerHTML = time;
}
// =============================================== //

cities.forEach((city) => {
  const content = `
    <option value="${city.ar}">${city.ar}</option>
  `;
  document.getElementById("citiesSelect").innerHTML += content;
});

document.getElementById("citiesSelect").addEventListener("change", function () {
  let cityName = "";
  for (let city of cities) {
    if (city.ar == this.value) {
      cityName = city.en;
    }
  }
  getPrayerTimingsOfCity(cityName);
  document.getElementById("cityName").innerHTML = this.value;
});
