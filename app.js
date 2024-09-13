console.log("log test");
console.log("hello there");

// cookie values

let cookiesPerSecond = 0;
let cookieCount = 1 + cookiesPerSecond;

const cookie = document.getElementById(`cookieImage`);
const countContainer = document.getElementById(`cookie-count`);

// function to update cookie count
function updateCookieCount() {
  let count = cookieCount++;
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
  cookieCount = 1;
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
console.log(shopUpgrades);

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

    upgradeContainer.appendChild(shopNames);
    upgradeContainer.appendChild(shopCost);
    upgradeContainer.appendChild(increase);
    upgradeContainer.appendChild(button);
  });
}

renderUpgrades();

// event listener for buttons

// updating cookies per second

// set interval for cookies per second

if (cookiesPerSecond > 0) {
  setInterval(updateCookieCount, 1000);
}
