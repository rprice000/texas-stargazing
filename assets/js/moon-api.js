// define today's date

d = Date.now();

const n = new Date(d) - 18000000;

// format date for API to EPOCH
dt = (n / 1000) | 0;

const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/1%20Panther%20Junction%20Big%20Bend%20National%20Park%2C%20TX%2079834/today?unitGroup=us&key=GV95TV8AQBAEB4TB8G9UMEQEM&include=days&elements=datetime,moonphase,sunrise,sunset`;

// fetch our info from the API
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    // get date
    console.log(data);
    console.log(data.days[0].moonphase);
    console.log(data.days[0].sunrise);
    const todaysDate = new Date(n);
    let moonphase = data.days[0].moonphase;
    let currentSunrise = data.days[0].sunrise;
    let currentSunset = data.days[0].sunset;

    console.log (typeof moonphase);
    // reformat date

    const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    document.getElementById("date").innerHTML =
      longEnUSFormatter.format(todaysDate);

    // document.getElementById("location").innerHTML ="Big Bend National Park";

    // Cases to select corresponding image

    if (moonphase === 0.5) {
      document.getElementById("moon-pix").innerHTML =
        "<img src='assets/images/moon-phases-master/img/ful.jpg' />";
    } else if (moonphase === 0) {
      document.getElementById("moon-pix").innerHTML =
        "<img src='assets/images/moon-phases-master/img/new.jpg />";
    } else if (moonphase >= 0.49 && moonphase <= 0.75) {
      document.getElementById("moon-pix").innerHTML =
        "<img src='assets/images/moon-phases-master/img/wng.jpg' />";
    } else if (moonphase >= 0.25 && moonphase <= 0.49) {
      document.getElementById("moon-pix").innerHTML =
        "<img src='assets/images/moon-phases-master/img/wxg.jpg' />";
    } else if (moonphase >= 0.75 && moonphase <= 0.99) {
      document.getElementById("moon-pix").innerHTML =
        "<img src='assets/images/moon-phases-master/img/wnc.jpg' />";
    } else if (moonphase >= 0.01 && moonphase <= 0.24) {
      document.getElementById("moon-pix").innerHTML =
        "<img src='assets/images/moon-phases-master/img/wxc.jpg' />";
    } else if (moonphase === 0.25) {
      document.getElementById("moon-pix").innerHTML =
        "<img src='assets/images/moon-phases-master/img/fqt.jpg' />";
    } else if (moonphase === 0.75) {
      document.getElementById("moon-pix").innerHTML =
        "<img src='assets/images/moon-phases-master/img/tqt.jpg' />";
    }

    // provide phase and illumination
    document.getElementById("sunrise").innerHTML =
      "Current Sunrise Time: " + currentSunrise;
    document.getElementById("sunset").innerHTML =
      "Current Sunset Time: " + currentSunset;
  });
  

