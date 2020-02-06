const div = document.querySelector(".div-list");
const all = document.querySelector("#show-all");
const bronxButton = document.querySelector("#bronx");
const brooklynButton = document.querySelector("#brooklyn");
const manhattanButton = document.querySelector("#manhattan");
const queensButton = document.querySelector("#queens");
const statenIslandButton = document.querySelector("#staten-island");

let aptArr = [];

getApt = async () => {
  try {
    const result = axios.get("https://api.myjson.com/bins/2sadq?pretty=1");
    const { data: apartments } = await result;
    apartments.apartments.forEach(apartment => {
      aptArr.push(apartment);
    });
    aptArr.forEach(function(e, i) {
      div.innerHTML += `<a href="http://maps.google.com?q=${aptArr[i].address}" target="_blank" class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between flex-row flex-wrap">
      <p>${aptArr[i].description}</p>
        <p class="ml-auto">${aptArr[i].price}</p>
        <p class="break">${aptArr[i].address}</p>
        <p class="break">Bedrooms: ${aptArr[i].bedrooms} / ${aptArr[i].neighborhood}</p>
        </div>
        </a>`;
    });
  } catch {
    alert("Error while getting apartments");
  }
};
window.onload = () => all.focus();
getApt();

all.onclick = () => {
  filterCity();
};
bronxButton.onclick = () => {
  filterCity();
};
brooklynButton.onclick = () => {
  filterCity();
};
manhattanButton.onclick = () => {
  filterCity();
};
queensButton.onclick = () => {
  filterCity();
};
statenIslandButton.onclick = () => {
  filterCity();
};

filterCity = () => {
  let getCity = event.target.value;
  let tempArr = [];
  if (getCity === undefined || getCity === null || getCity == "") {
    return writeApt(aptArr);
  }
  aptArr.map(value => {
    if (value.city == getCity) {
      tempArr.push(value);
    }
  });
  writeApt(tempArr);
};

writeApt = arr => {
  div.innerHTML = "";
  arr.forEach(function(e, i) {
    div.innerHTML += `<a href="http://maps.google.com?q=${arr[i].address}" target="_blank" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between flex-row flex-wrap">
    <p>${arr[i].description}</p>
      <p class="ml-auto">${arr[i].price}</p>
      <p class="break">${arr[i].address}</p>
      <p class="break">Bedrooms: ${arr[i].bedrooms} / ${arr[i].neighborhood}</p>
      </div>
      </a>`;
  });
};
