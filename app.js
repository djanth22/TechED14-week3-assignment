console.log("log test");
console.log("hello there");

// cookie values

let cookieCount = 1;
let cookiesPerSecond = 0;
const cookie = document.getElementById(`cookieImage`);
const countContainer = document.getElementById(`cookie-count`);

// function to fetch API data
async function upgrades() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const json = await response.json();
}

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
