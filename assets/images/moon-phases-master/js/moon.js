// const fetch = require("node-fetch")

d = Date.now()
console.log(d)

const n = new Date(d) - 18000000

// format date to be unserstood by API
dt = n/1000|0

const url = `https://api.farmsense.net/v1/moonphases/?d=${dt}`

// fetch our info from the API
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  // get date
  const todaysDate = new Date(n)
  
  // format date according to 'February 21, 2020' kind of formatting
  const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
    });
  
    document.getElementById("date").innerHTML = longEnUSFormatter.format(todaysDate)
  
  // select right image
  switch(data[0]["Phase"]) {
    case "Full Moon":
      document.getElementById("pic").innerHTML = "<img src='./img/ful.jpg' />"
      break;
    case "New Moon":
      document.getElementById("pic").innerHTML = "<img src='./img/new.jpg' />"
      break;
    case "Waning Gibbous":
      document.getElementById("pic").innerHTML = "<img src='./img/wng.jpg' />"
      break;
    case "Waxing Gibbous":
      document.getElementById("pic").innerHTML = "<img src='./img/wxg.jpg' />"
      break;
    case "Waning Crescent":
      document.getElementById("pic").innerHTML = "<img src='./img/wnc.jpg' />"
      break;
    case "Waxing Crescent":
      document.getElementById("pic").innerHTML = "<img src='./img/wxc.jpg' />"
      break;
    case "First Quarter":
      document.getElementById("pic").innerHTML = "<img src='./img/fqt.jpg' />"
      break;
    case "Third Quarter":
      document.getElementById("pic").innerHTML = "<img src='./img/tqt.jpg' />"
      break;
    default:
      break;
  }

  // provide phase and illumination
  document.getElementById("phase").innerHTML = "Phase: " + data[0]["Phase"]
  document.getElementById("illumination").innerHTML = "Illumination: " + data[0]["Illumination"].toFixed(2)*100 + "%"
  
})
.catch(function(error) {
  console.log(error);
});
