"use strict";
//modal

const modalButton = document.querySelector("#modalButton");
const modalBackground = document.querySelector("#modalBackground");
const modal = document.querySelector(".modal");

modalButton.addEventListener("click", () => {
  modal.classList.add("is-active");
});

modalBackground.addEventListener("click", () => {
  modal.classList.remove("is-active");
});

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
    console.log(res, resJSON);

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
      parkImage: parkInfoData.images[4].url,
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
  <div id="parkInfo${parkID}" class="column">
  <div class="card">
<div class="card-image">
<figure class="image is-4by3 card-image">
      <img src="${obj.parkImage}" alt="National Park Stargazing Spots">
      </figure>
</div>
<div class="card-content parkInfoCard" id="card-content-one">
  <div class="media" id="media-one">
    <div class="media-content" id="media-content-one">
    <p><a href="${obj.parkURL}" class="parkInfoCard__TitleLink title is-4 ">${obj.parkFullName}</a>
    </div>
  </div>
  <div class="content parkInfoCard__Description">
  <p>${obj.parkDescription}
  <br>
  <a href="${obj.parkURL}">Link to Park Website</a></p>
      <div class="parkInfoCard__AddressBlock">
          <div>Mailing Address:</div>
          <div>${obj.parkFullName}</div>
         <div>${obj.parkAddress.line1}</div>
          <div>${obj.parkAddress.city}, ${obj.parkAddress.stateCode} ${obj.parkAddress.postalCode}</div>
     </div>
  </div>
</div>`;

  return htmlOut;
}

//These commands tell it to build the cards on the page:

BuildAParkCard("bibe");

BuildAParkCard("gumo");

BuildAParkCard("bith");

///End of Park Code

////////////////////////////////////////////////////////////////

//Start of Note-Feature code
function store() {
  //Our variables for the page elements.
  var date = document.getElementById("Date").value;
  var park = document.getElementById("ParkName").value;
  var yourNotes = document.getElementById("YourNotes").value;

  //The object that will store the data.
  let notes = {
    date: date,
    park: park,
    yourNotes: yourNotes,
  };

  //Convert the object to a string and place it in Local Storage:
  window.localStorage.setItem(park, JSON.stringify(notes));
  //converting object to string
}

function retrieveNotes() {
  //retrieves items in the localStorage for display:
  var parkNameForm = document.getElementById("retrieveParkName").value; //Gets the Park Name from user
  console.log("Retrieved Notes");
  var records = JSON.parse(localStorage.getItem(parkNameForm)); //searches for Park Name in localStorage

  //Places the HTML on the page:
  document.getElementById("displayNotes").innerHTML = `

  <p><h4>Date: ${records.date}  </h4>
  <br>
    <h4>ParkName: ${records.park}</h4>
    <br>
    <h4>Your Notes: </h4>
    ${records.yourNotes}</p>
    `;
}

function removeItem() {
  //deletes item from localStorage
  var parkName = document.getElementById("removeparkName").value; //gets parkName from user
  localStorage.removeItem(parkName); //passes parkName to the removeItem method
  console.log("Removed List items");
}

function clearStorage() {
  //clears the entire localStorage
  localStorage.clear();
  console.log("Cleared all Notes");
}

window.onload = function () {
  //ensures the page is loaded before functions are executed.
  document.getElementById("notesForm").onsubmit = store;
  document.getElementById("clearButton").onclick = clearStorage;
  document.getElementById("removeButton").onclick = removeItem;
  document.getElementById("retrieveButton").onclick = retrieveNotes;
};
