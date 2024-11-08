let darkMode = localStorage.getItem("darkMode");
const darkSwitch = document.getElementById("darkSwitch");

function enableDarkmode() {
  document.body.classList.add("darkMode");
  localStorage.setItem("darkMode", "active");

  darkSwitch.classList.add("pushIn");

  setTimeout( () => {
    darkSwitch.classList.remove("pushIn");
  }, 700);
 
}

function disableDarkmode() {
  document.body.classList.remove("darkMode");
  localStorage.setItem("darkMode", null);

  darkSwitch.classList.add("pushOut");

  setTimeout( () => {
    darkSwitch.classList.remove("pushOut");
  }, 700)
}

if (darkMode === "active") enableDarkmode();

darkSwitch.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  darkMode !== "active" ? enableDarkmode() : disableDarkmode();
});
