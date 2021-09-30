"use strict";
//////Begin Park code:
//Selected "#parkInfo" ID element in HTML file:
const parkContainer = document.querySelector("#parkInfoBigBend");
const parkContainerTwo = document.querySelector("#parkInfoTwo");

const showParkOne = async function () {
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
    <img src="${parkInfoBigBend.image}"><h2>${parkInfoBigBend.fullname}</h2>

    <p>${parkInfoBigBend.description}</p>`;

    //Insert parkInfoBigBend elements into parkContainer above.
    parkContainer.insertAdjacentHTML("afterbegin", markUp);
  } catch (err) {
    alert(err);
  }
};

////Second API call for second park:

const showParkTwo = async function () {
  try {
    const res = await fetch(
      "https://developer.nps.gov/api/v1/parks?parkCode=abli&api_key=NhMMcVpoxczuVKYo1KbNel9W5AVBX0Miv2OK7vff"
    );
    //json response
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    //Logged the response and data coming back for testing and trouble shooting pruposes.
    console.log(res, data);

    //new variable for data sorting and grabbing items from the arrays:
    let { parkInfoAbe } = data.data;
    parkInfoAbe = {
      fullname: data.data[0].fullName,
      image: data.data[0].images[1].url,
      url: data.data[0].url,
      address: data.data[0].addresses[1],
      description: data.data[0].description,
    };
    console.log(parkInfoAbe);

    //Rendering the above information:
    const markUp2 = `
    <img src="${parkInfoAbe.image}"><h2>${parkInfoAbe.fullname}</h2>

    <p>${parkInfoAbe.description}</p>`;

    //Insert parkInfoBigBend elements into parkContainer above.
    parkContainerTwo.insertAdjacentHTML("afterbegin", markUp2);
  } catch (err) {
    alert(err);
  }
};

//Call the above functions to show the parks:
showParkOne();
showParkTwo();

///End of Park Code

////////////////////////////////////////////////////////////////
