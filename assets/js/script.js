"use strict";
//////Begin Park code:

//Selected "#parkInfo" ID element in HTML file:
const parkContainer = document.querySelector("#parkInfoBigBend");
const parkContainerTwo = document.querySelector("#parkInfoTwo");
const parkContainerThree = document.querySelector("#parkInfoThree");

//First API call to National Park Service for Big Bend:
const showParkOne = async function () {
  try {
    let res = await fetch(
      "https://developer.nps.gov/api/v1/parks?parkCode=bibe&api_key=NhMMcVpoxczuVKYo1KbNel9W5AVBX0Miv2OK7vff"
    );
    //json response
    //Switched from const to Let because it needs to be a variable.
    let data = await res.json();

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

    <p>${parkInfoBigBend.description}</p>
    <p><a href="${parkInfoBigBend.url}">${parkInfoBigBend.url}</p>`;

    //Insert parkInfoBigBend elements into parkContainer above.
    parkContainer.insertAdjacentHTML("afterbegin", markUp);
  } catch (err) {
    alert(err);
  }
};

//Second API call to NPS site for Guadalupe Mountains National Park
const showParkTwo = async function () {
  try {
    const res = await fetch(
      "https://developer.nps.gov/api/v1/parks?parkCode=gumo&api_key=NhMMcVpoxczuVKYo1KbNel9W5AVBX0Miv2OK7vff"
    );
    //json response
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    //Logged the response and data coming back for testing and trouble shooting pruposes.
    console.log(res, data);

    //new variable for data sorting and grabbing items from the arrays:
    let { parkInfoGumo } = data.data;
    parkInfoGumo = {
      fullname: data.data[0].fullName,
      image: data.data[0].images[4].url,
      url: data.data[0].url,
      address: data.data[0].addresses[1],
      description: data.data[0].description,
    };
    console.log(parkInfoGumo);

    //Rendering the above information:
    const markUp2 = `
    <img src="${parkInfoGumo.image}"><h2>${parkInfoGumo.fullname}</h2>

    <p>${parkInfoGumo.description}</p>
    <p><a href="${parkInfoGumo.url}">${parkInfoGumo.url}</p>`;

    //Insert parkInfoBigBend elements into parkContainer above.
    parkContainerTwo.insertAdjacentHTML("afterbegin", markUp2);
  } catch (err) {
    alert(err);
  }
};

//Third API call to NPS site for Capulin Volcano National Monument
const showParkThree = async function () {
  try {
    const res = await fetch(
      "https://developer.nps.gov/api/v1/parks?parkCode=cavo&api_key=NhMMcVpoxczuVKYo1KbNel9W5AVBX0Miv2OK7vff"
    );
    //json response
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    //Logged the response and data coming back for testing and trouble shooting pruposes.
    console.log(res, data);

    //new variable for data sorting and grabbing items from the arrays:
    let { parkInfoCavo } = data.data;
    parkInfoCavo = {
      fullname: data.data[0].fullName,
      image: data.data[0].images[1].url,
      url: data.data[0].url,
      address: data.data[0].addresses[0],
      description: data.data[0].description,
    };
    console.log(parkInfoCavo);

    //Rendering the above information to the div elements on the page:
    const markUp3 = `
    <img src="${parkInfoCavo.image}"><h2>${parkInfoCavo.fullname}</h2>

    <p>${parkInfoCavo.description}</p>
    <br>
    <p><a href="${parkInfoCavo.url}">${parkInfoCavo.url}</p>
    <p>${parkInfoCavo.address}</p>`;

    //Insert parkInfoBigBend elements into parkContainer above.
    parkContainerThree.insertAdjacentHTML("afterbegin", markUp3);
  } catch (err) {
    alert(err);
  }
};

//Call the above functions to show the parks:
showParkOne();
showParkTwo();
showParkThree();

///End of Park Code

////////////////////////////////////////////////////////////////
