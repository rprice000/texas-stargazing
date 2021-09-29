"use strict";
//Selected "#parkInfo" ID element in HTML file:
const parkContainer = document.querySelector("#parkInfo");

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
    let { parkInfo } = data.data;
    parkInfo = {
      fullname: data.data[0].fullName,
      image: data.data[0].images[5].url,
      url: data.data[0].url,
      address: data.data[0].addresses[1],
      description: data.data[0].description,
    };
    console.log(parkInfo);
    //Rendering the above information:
    const markUp = `
    <div><img src="${parkInfo.image}"><h2>${parkInfo.fullname}</h2>

    <p>${parkInfo.description}</p>
    </div>`;
    //Insert parkInfo elements into parkContainer above.
    parkContainer.insertAdjacentHTML("afterbegin", markUp);
  } catch (err) {
    alert(err);
  }
};

showPark();

////////////////////////////////////////////////////////////////
// const bigBendDesc = document.querySelector("app");

// var getBigBendInfo = function () {
//   //Format the National Park Service API:
//   let bigBendApi =
//     "https://developer.nps.gov/api/v1/parks?parkCode=bibe&api_key=NhMMcVpoxczuVKYo1KbNel9W5AVBX0Miv2OK7vff";

//   //Fetch request to Big Bend URL:
//   fetch(bigBendApi).then(function (response) {
//     response.json().then(function (data) {
//       console.log(data.data[0].description);
//     });
//   });
// };

// fetch("");

// //Calls the API
// getBigBendInfo();

/////////////////////////////////////////////////////////////////

//Creates intro display:

// //This fetch Request works:
// fetch(
//   "https://developer.nps.gov/api/v1/parks?parkCode=bibe&api_key=NhMMcVpoxczuVKYo1KbNel9W5AVBX0Miv2OK7vff"
// )
//   .then((response) => response.json())
//   .then((data) => console.log(data.data[0].description));
//Get the page element

// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=NhMMcVpoxczuVKYo1KbNel9W5AVBX0Miv2OK7vff

// developer.nps.gov / api / v1 /
// /activities/parks;

//parks to pull for: Big Bend, Gaudalupe, Padre Island, Big Thicket,
