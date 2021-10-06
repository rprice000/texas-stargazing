// define today's date

d = Date.now();

const n = new Date(d) - 18000000;

// format date for API to EPOCH
dt = (n / 1000) | 0;

const url = `http://api.farmsense.net/v1/moonphases/?d[]=1350526582&d[]=1350363600&d[]=1350277200`

// fetch our info from the API
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    // get date
    const todaysDate = new Date(n);

    // reformat date
    const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    document.getElementById("date").innerHTML =
      longEnUSFormatter.format(todaysDate);

    // Cases to select corresponding image
    switch (data[0]["Phase"]) {
      case "Full Moon":
        document.getElementById("moon-pix").innerHTML =
          "<img src='assets/images/moon-phases-master/img/ful.jpg' />"
        break;
      case "New Moon":
        document.getElementById("moon-pix").innerHTML =
          "<img src='assets/images/moon-phases-master/img/new.jpg />"
        break;
      case "Waning Gibbous":
        document.getElementById("moon-pix").innerHTML =
          "<img src='assets/images/moon-phases-master/img/wng.jpg' />";
        break;
      case "Waxing Gibbous":
        document.getElementById("moon-pix").innerHTML =
          "<img src='assets/images/moon-phases-master/img/wxg.jpg' />";
        break;
      case "Waning Crescent":
        document.getElementById("moon-pix").innerHTML =
          "<img src='assets/images/moon-phases-master/img/wnc.jpg' />";
        break;
      case "Waxing Crescent":
        document.getElementById("moon-pix").innerHTML =
          "<img src='assets/images/moon-phases-master/img/wxc.jpg' />";
        break;
      case "First Quarter":
        document.getElementById("moon-pix").innerHTML =
          "<img src='assets/images/moon-phases-master/img/fqt.jpg' />";
        break;
      case "Third Quarter":
        document.getElementById("moon-pix").innerHTML =
          "<img src='assets/images/moon-phases-master/img/tqt.jpg' />";
        break;
      default:
        break;
    }

    // provide phase and illumination
    document.getElementById("moon-phase").innerHTML = "Current Phase: " + data[0]["Phase"];
    document.getElementById("moon-illumination").innerHTML =
      "Current Illumination: " + data[0]["Illumination"].toFixed(2) * 100 + "%";
  })
  .catch(function (error) {
    console.log(error);
  });
