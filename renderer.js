"use strict";
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    console.log("wololo");
    event.preventDefault();
    const odooUrl = document.getElementById("odooUrl").value;
    window.electronAPI.openOdoo(odooUrl);
});
