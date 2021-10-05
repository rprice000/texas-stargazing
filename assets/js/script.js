"use strict";
//////Begin Park code:

//Selected "#parkInfo" ID element in HTML file:
const parkCards = document.querySelector("#parkCards");

let getParkInfoAJAX = async function (parkCode) {
  try {
    let res = await fetch(
      "https://developer.nps.gov/api/v1/parks?parkCode=" +
        parkCode +
        "&api_key=NhMMcVpoxczuVKYo1KbNel9W5AVBX0Miv2OK7vff"
    );

    //Json response from the API call:
    let resJSON = await res.json();

    if (res.ok === false) {
      console.log("API not working");
      throw new Error(`${res.status} (${res.statusText})`);
    }

    //Console log the responses to see data coming back for testing and trounble shooting purposes.
    // console.log(res, resJSON);

    //Return JSON data:
    return resJSON;
  } catch (err) {
    // alert (err);
  }
};

// Fun part, getting the indivdual park code that will populate each park for the parkCardsEl on the index.html page!:
async function BuildAParkCard(parkCode) {
  try {
    let parkInfo = await getParkInfoAJAX(parkCode);

    //Grabs just the parkInfo data that we need:
    let parkInfoData = parkInfo.data[0];

    if (parkInfoData === undefined) {
      throw new Error("We don't have any park data");
    }

    //Create the object we need for the HTML card data:
    let parkInfoDataForCard = {
      parkFullName: parkInfoData.fullName,
      parkImage: parkInfoData.images[1].url,
      parkURL: parkInfoData.url,
      parkAddress: parkInfoData.addresses[1],
      parkDescription: parkInfoData.description,
      parkLat: parkInfoData.latitude,
      parkLong: parkInfoData.longitude,
    };

    let cardHTML = ParkCardTemplate(
      parkInfoDataForCard,
      "Parks for stargazing"
    );

    //Add HTML to the DOM:
    parkCards.insertAdjacentHTML("beforeend", cardHTML);
  } catch (err) {
    //alert(err)
  }
}

//Create the HTML card template to be inserted into the HTML element:
function ParkCardTemplate(obj, parkID) {
  let htmlOut = `
<div id="parkInfo${parkID}" class="parkInfoCard">
    <div>
        <img src="${obj.parkImage}">
    </div>
    <a href="${obj.parkURL}" class="parkInfoCard__TitleLink">${obj.parkFullName}</a>
    <p class="parkInfoCard__Description">
        ${obj.parkDescription}
    </p>
    <div class="parkInfoCard__AddressBlock">
        <div>Mailing Address:</div>
        <div>${obj.parkFullName}</div>
        <div>${obj.parkAddress.line1}</div>
        <div>${obj.parkAddress.city}, ${obj.parkAddress.stateCode} ${obj.parkAddress.postalCode}</div>

    </div>
</div>
`;

  return htmlOut;
}

//These commands tell it to build the cards on the page:

BuildAParkCard("bibe");

BuildAParkCard("gumo");

///End of Park Code

////////////////////////////////////////////////////////////////
