console.log("log test");
console.log("hello there");

// cookie values
// let initialValue = 0
let buttonclass = 0;
let increaseValue = 0;
let cookiesPerSecond = 1;
let cookieCount = 0 + cookiesPerSecond;

const cookie = document.getElementById(`cookieImage`);
const countContainer = document.getElementById(`cookie-count`);
let perSecondContainer = document.getElementById(`cookies-per-second`);

resetProgress();

// function to update cookie count
function updateCookieCount() {
  let count = 1 + cookieCount++;
  countContainer.innerHTML = ``;
  countContainer.append(count);
}

cookie.addEventListener("click", updateCookieCount);

// reset function
const reset = document.getElementById(`reset`);
function resetProgress() {
  let reset = 0;
  countContainer.innerHTML = ``;
  countContainer.append(reset);
  cookieCount = 0;
  perSecondContainer.innerHTML = ``;
  perSecondContainer.append(reset);
  cookiesPerSecond = 1;
}
reset.addEventListener("click", resetProgress);

// function to fetch API data
async function upgrades() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const json = await response.json();
  shopUpgrades = json;
  renderUpgrades();
}

let shopUpgrades = [];

upgrades();

const upgradeContainer = document.getElementById(`shop-upgrades`);

function renderUpgrades() {
  shopUpgrades.forEach(function (a) {
    const shopNames = document.createElement("p");
    const shopCost = document.createElement("p");
    const increase = document.createElement("p");
    const button = document.createElement("button");

    shopNames.textContent = a.name;
    shopNames.classList.add(`upgrade-name`);
    shopCost.textContent = "cost " + a.cost;
    shopCost.classList.add(`upgrade-cost`);
    increase.textContent = "increases by " + a.increase;
    increase.classList.add(`upgrade-increase`);
    button.textContent = "buy";
    button.classList.add(`buy-button`);
    button.setAttribute(`id`, buttonclass++);

    upgradeContainer.appendChild(shopNames);
    upgradeContainer.appendChild(shopCost);
    upgradeContainer.appendChild(increase);
    upgradeContainer.appendChild(button);

    function buyButtons() {
      let cost = a.cost;
      let increaseValue = a.increase;
      if (cookieCount >= cost) {
        countContainer.innerHTML = "";
        countContainer.append(cookieCount - cost);
        perSecondContainer.innerHTML = "";
        perSecondContainer.append(cookiesPerSecond + increaseValue);
        cookiesPerSecond = cookiesPerSecond + increaseValue;
        cookieCount = cookieCount - cost;
      } else {
        reveal();
      }
    }
    button.addEventListener("click", buyButtons);
  });
}

// updating cookies per second
function autoCookies() {
  let CPS = (cookieCount += cookiesPerSecond);
  countContainer.innerHTML = "";
  countContainer.append(CPS - cookiesPerSecond);
  perSecondContainer.innerHTML = "";
  perSecondContainer.append(cookiesPerSecond);
}

// save function

function save() {
  localStorage.setItem("cookies", cookieCount - cookiesPerSecond);
  localStorage.setItem("cookies per second", cookiesPerSecond);
}

// set interval

setInterval(autoCookies, 1000);
setInterval(save, 1000);

// load function

function load() {
  cookieCount = JSON.parse(localStorage.getItem("cookies"));
  cookiesPerSecond = JSON.parse(localStorage.getItem("cookies per second"));
}

setTimeout(load, 1000);

function reveal() {
  const message = document.getElementById(`message`);
  message.style.visibility = "visible";
  setTimeout(hide, 5000);
}

function hide() {
  const message = document.getElementById(`message`);
  message.style.visibility = "hidden";
}
