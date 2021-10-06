// define today's date

d = Date.now();

const n = new Date(d) - 18000000;

// URL for Big Bend - hard coded
const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/1%20Panther%20Junction%20Big%20Bend%20National%20Park%2C%20TX%2079834/today?unitGroup=us&key=GV95TV8AQBAEB4TB8G9UMEQEM&include=days&elements=datetime,moonphase,sunrise,sunset`;
// additional addresses for future expansion
const urlAll = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`+"Address"+`/today?unitGroup=us&key=GV95TV8AQBAEB4TB8G9UMEQEM&include=days&elements=datetime,moonphase,sunrise,sunset`;
const bigThicketAddy = "FM%20%20420%20Kountze%20TX%2077625";
const guadalupeMtnsAddy = "400%20Pine%20Canyon%20SaltFlat%20TX%2079847";
const enchantedRockAddy = "16710%20Ranch%20Rd.%20965%20Fredericksburg%20TX%2078624";
const southLlanoAddy = "1927%20Park%20Road%2073%20Junction%20TX%2076849";
const copperBreaksAddy = "777%20State%20Hwy%20Park%20Rd%2062%20Quanah%20TX%2079252";


// fetch our info from the API
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    // get date
    console.log(data);
    console.log(data.days[0].moonphase);
    console.log(data.days[0].sunrise);
    console.log(data.resolvedAddress);  

    const todaysDate = new Date(n);
    let moonphase = data.days[0].moonphase;
    let currentSunrise = data.days[0].sunrise;
    let currentSunset = data.days[0].sunset;
    let currentAddress= data.resolvedAddress;

    console.log(typeof moonphase);

    // Cases to select corresponding image
    var imageHolder = "";
    if (moonphase === 0.5) {
      imageHolder = "<img src='./assets/images/moon-phases-master/img/ful.jpg'/>";
    } else if (moonphase === 0) {
      imageHolder = "<img src='./assets/images/moon-phases-master/img/new.jpg'/>";
    } else if (moonphase >= 0.49 && moonphase <= 0.75) {
      imageHolder =
        "<img src='./assets/images/moon-phases-master/img/wng.jpg'/>";
    } else if (moonphase >= 0.25 && moonphase <= 0.49) {
      imageHolder =
        "<img src='./assets/images/moon-phases-master/img/wxg.jpg' />";
    } else if (moonphase >= 0.75 && moonphase <= 1) {
      imageHolder =
        "<img src='./assets/images/moon-phases-master/img/wnc.jpg' />";
    } else if (moonphase >= 0.01 && moonphase <= 0.24) {
      imageHolder =
        "<img src='./assets/images/moon-phases-master/img/wxc.jpg' />";
    } else if (moonphase === 0.25) {
      imageHolder =
        "<img src='./assets/images/moon-phases-master/img/fqt.jpg' />";
    } else if (moonphase === 0.75) {
      imageHolder =
        "<img src='./assets/images/moon-phases-master/img/tqt.jpg' />";
    }

    // reformat date

    const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

   document.getElementById("addy").innerHTML = currentAddress;
    document.getElementById("date").innerHTML =
      longEnUSFormatter.format(todaysDate);
   document.getElementById("moon-pix").innerHTML = imageHolder;
    // provide sunrise and sunset times
    document.getElementById("sunrise").innerHTML =
      "Current Sunrise Time: " + currentSunrise;
    document.getElementById("sunset").innerHTML =
      "Current Sunset Time: " + currentSunset;
  });
  

