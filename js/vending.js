/* ========== init ========== */
let totalFunds = 0;
let totalAmount = 0;
let changes = 0;

/* ========== set items ========== */
const itemsList = ["Original_Cola", "Violet_Cola", "Yellow_Cola", "Cool_Cola", "Green_Cola", "Orange_Cola"];

/* items name */
const itemsName = {
    original: "Original_Cola",
    violet: "Violet_Cola",
    yellow: "Yellow_Cola",
    cool: "Cool_Cola",
    green: "Green_Cola",
    orange: "Orange_Cola",
};

/* items select count */
const itemsCount = new Map([
    ["Original_Cola", 0],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 0],
    ["Cool_Cola", 0],
    ["Green_Cola", 0],
    ["Orange_Cola", 0],
]);

/* items price */
const itemsPrice = new Map([
    ["Original_Cola", 1000],
    ["Violet_Cola", 1000],
    ["Yellow_Cola", 1000],
    ["Cool_Cola", 1000],
    ["Green_Cola", 1000],
    ["Orange_Cola", 1000],
]);

/* items stock */
const itemsStock = new Map([
    ["Original_Cola", 100],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 100],
    ["Cool_Cola", 100],
    ["Green_Cola", 100],
    ["Orange_Cola", 100],
]);

/* ========== ========== ========== ========== ========== */

/* button */
const changesBtn = document.querySelector('.changes-box>input[type="button"]');
const insertBtn = document.querySelector('.insert>input[type="button"]');
const returnBtn = document.querySelector(".get-items-btn");

/* input */
const insertInput = document.querySelector('.insert>input[type="text"]');

/* output */
const changesOutput = document.querySelector(".changes>span");
const insertOutput = document.querySelector(".funds>div>span");
const totlaAmountOutput = document.querySelector(".total>span");

/* list */
const pickList = document.querySelector(".selection");
const returnList = document.querySelector(".return>ul");

/* ========== ========== ========== ========== ========== */

/* ========== make vending menu ========== */
const vending = document.querySelector(".items-box");

function setVendingItems() {
    itemsList.forEach((element) => {
        const createItems = document.createElement("button");
        const itemName = Object.keys(itemsName).find((key) => itemsName[key] === element);
        createItems.setAttribute("type", "button");

        /* sold out */
        if (itemsStock.get(element) === 0) {
            createItems.setAttribute("disabled", true);
        }

        /* item HTML */
        createItems.innerHTML = `
            <img src="images/${itemName}.png" alt=${element}>
            <p class="name">${element}</p>
            <p class="price">${itemsPrice.get(element)}</p>
        `;

        vending.appendChild(createItems);
    });
}

setVendingItems();

const itemsListbtns = document.querySelectorAll(".items-box button");

/* ========== reset ========== */
function reset() {
    totalFunds = 0;
    totalAmount = 0;
    changes = 0;
    displayOutput();
    resetItemsCount();
}

function resetItemsCount() {
    itemsList.forEach((item) => {
        itemsCount.set(item, 0);
    });
}

/* ========== setter ========== */
function setFunds(insertMoney) {
    totalFunds += parseInt(insertMoney);
}

function setTotalAmount(itemPrice) {
    totalAmount += itemPrice;
}

function setChanges() {
    changes = totalFunds - totalAmount;
}

/* getter */
function getFunds() {
    insertOutput.innerText = `${totalFunds}`;
}

function getTotalAmount() {
    totlaAmountOutput.innerText = `${totalAmount}`;
}

function getChanges() {
    changesOutput.innerText = `${changes}`;
}

/* ========== calculation ========== */
function calculation(insertMoney, itemPrice) {
    setFunds(insertMoney);
    setTotalAmount(itemPrice);
    setChanges();
}

function paymentCalculation() {
    totalFunds = changes;
    console.log(totalFunds, changes);
}

/* ========== display output ========== */
function displayOutput() {
    getFunds();
    getTotalAmount();
    getChanges();
}

/* ========== execute function ========== */
/* insert money */
function insertMoney() {
    insertBtn.addEventListener("click", () => {
        if (checkInsertInput()) {
            calculation(insertInput.value, 0);
            displayOutput();

            insertInput.value = "";
            displayOutput();
        }
    });
}

insertMoney();
