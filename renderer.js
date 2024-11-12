"use strict";
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const odooUrl = document.getElementById("odooUrl").value;
    addOdooUrl(odooUrl);
    window.electronAPI.openOdoo(odooUrl);
});

server_list_template();
function server_list_template() {
    const ul = document.createElement("ul");
    for (const url of getOdooUrls()) {
        const a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("role", "button");
        a.onclick = () => openOdoo(url);
        a.textContent = url;
        const li = document.createElement("li");
        li.appendChild(a);
        ul.appendChild(li);
    }
    document.querySelector("#server_list").appendChild(ul);
}

/**
 * @param {string} odooUrl
 */
function openOdoo(odooUrl) {
    window.electronAPI.openOdoo(odooUrl);
}

/**
 * Add an odoo url to the local storage
 * @param {string} odooUrl
 */
function addOdooUrl(odooUrl) {
    const existingUrls = getOdooUrls();
    const odooUrls = existingUrls ?
          new Set([odooUrl, ...existingUrls]) :
          new Set([odooUrl]);
    localStorage.setItem("odooUrls", JSON.stringify([...odooUrls]));
}

/**
 * @returns {[string]}
 */
function getOdooUrls() {
    return JSON.parse(localStorage.getItem("odooUrls"));
}
