const weatherform = document.querySelector("form");
const input = document.querySelector("#weathersearch");

const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");

//errormsg.textContent = "plz error";

weatherform.addEventListener("submit", e => {
  e.preventDefault();
  const value = input.value;
  msg1.textContent = "Loading...";
  msg2.textContent = "";
  fetch("/weather?address=" + encodeURIComponent(value)).then(Response => {
    Response.json().then(data => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forcast;
      }
    });
  });
});
