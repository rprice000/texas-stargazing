"use strict";
//Selected "#parkInfo" ID element in HTML file:
const parkContainer = document.querySelector("#parkInfoBigBend");

//Constant for fetching Big Bend Park API:
const showPark = async function () {
  try {
    const res = await fetch(
      "https://developer.nps.gov/api/v1/parks?parkCode=bibe&api_key=NhMMcVpoxczuVKYo1KbNel9W5AVBX0Miv2OK7vff"
    );
    //json response
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    //Logged the response and data coming back for testing and trouble shooting pruposes.
    console.log(res, data);

    //new variable for data sorting and grabbing items from the arrays:
    let { parkInfoBigBend } = data.data;
    parkInfoBigBend = {
      fullname: data.data[0].fullName,
      image: data.data[0].images[5].url,
      url: data.data[0].url,
      address: data.data[0].addresses[1],
      description: data.data[0].description,
    };
    console.log(parkInfoBigBend);

    //Rendering the above information:
    const markUp = `
    <div><img src="${parkInfoBigBend.image}"><h2>${parkInfoBigBend.fullname}</h2>

    <p>${parkInfoBigBend.description}</p>
    </div>`;

    //Insert parkInfoBigBend elements into parkContainer above.
    parkContainer.insertAdjacentHTML("afterbegin", markUp);
  } catch (err) {
    alert(err);
  }
};

showPark();
