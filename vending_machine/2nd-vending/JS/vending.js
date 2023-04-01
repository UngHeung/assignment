/* ========== init ========== */
/* interaction information */
let wallet = 25000;
let slotMoney = 0;
let change = 0;
let totalPrice = 0;

/* items code */
const itemsCode = new Map([
    ["Original_Cola", "original"],
    ["Violet_Cola", "violet"],
    ["Yellow_Cola", "yellow"],
    ["Cool_Cola", "cool"],
    ["Green_Cola", "green"],
    ["Orange_Cola", "orange"],
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
    ["Original_Cola", 10],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 10],
    ["Cool_Cola", 10],
    ["Green_Cola", 10],
    ["Orange_Cola", 10],
]);

/* items count */
const itemsCount = new Map([
    ["Original_Cola", 0],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 0],
    ["Cool_Cola", 0],
    ["Green_Cola", 0],
    ["Orange_Cola", 0],
]);

/* items list */
const itemList = ["Original_Cola", "Violet_Cola", "Yellow_Cola", "Cool_Cola", "Green_Cola", "Orange_Cola"];

/* make menu list */
const menuList = document.querySelector(".items-list");

function makeMenuList() {
    itemList.forEach((element) => {
        const item = document.createElement("li");
        const button = document.createElement("button");
        const itemCode = itemsCode.get(element);

        button.setAttribute("type", "button");
        button.setAttribute("value", `${element}`);
        button.setAttribute("class", "in-stock");

        // stock check
        if (itemsStock.get(element) == 0) {
            button.setAttribute("class", "soldout");
            button.setAttribute("disabled", "");
        }

        button.insertAdjacentHTML("beforeend", `<img src="images/${itemCode}.png" alt="${element.replace("_", " ")} image" class="item-img">`);
        button.insertAdjacentHTML("beforeend", `<strong class="item-name">${element}</strong>`);
        button.insertAdjacentHTML("beforeend", `<span class="item-price">${itemsPrice.get(element)}원</span>`);

        item.appendChild(button);
        menuList.appendChild(item);
    });
}

makeMenuList();

/* ========== reset ========== */
function reset() {
    itemList.forEach((item) => {
        itemsCount.set(item, 0);
    });

    slotMoney = 0;
    change = 0;
    totalPrice = 0;
}

reset();

/* ========== setter, getter ========== */
function setSlotMoney(money) {
    slotMoney += money;
}

function setTotalPrice(price) {
    totalPrice += price;
}

function getWallet() {
    return wallet;
}

function getSlotMoney() {
    return slotMoney;
}

function getChange() {
    return change;
}

function getTotalPrice() {
    return totalPrice;
}

/* ========== calculation ========== */
function selectItemCal(itemName) {
    setTotalPrice(itemsPrice.get(itemName));
}

function deleteItemCal(itemName) {
    setTotalPrice(itemsPrice.get(itemName) * -1);
}

function countAndStockCal(type, itemName) {
    if (type == "add") {
        itemsCount.set(itemName, itemsCount.get(itemName) + 1);
        itemsStock.set(itemName, itemsStock.get(itemName) - 1);
    } else if (type == "delete") {
        itemsCount.set(itemName, itemsCount.get(itemName) - 1);
        itemsStock.set(itemName, itemsStock.get(itemName) + 1);
    }
}

function changeCal() {
    change = slotMoney - totalPrice;
}

/* ========== display ========== */
const slotChangeDisplay = document.getElementById("change_display");
const totalPriceDisplay = document.getElementById("total_price");
const myWalletDisplay = document.getElementById("my_wallet");

function displayChange() {
    slotChangeDisplay.innerText = `${getChange()}`;
}

function displaySelectItemCount(itemName) {
    if (itemsCount.get(itemName) != 0) {
        const selectItemCount = document.querySelector(`.${itemName}-count`);
        selectItemCount.innerText = `${itemsCount.get(itemName)}`;
    }
}

function displayTotalPrice() {
    totalPriceDisplay.innerText = `${totalPrice}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMyWallet() {
    myWalletDisplay.innerText = `${wallet}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

displayTotalPrice();
displayMyWallet();

/* ========== function ========== */
const menuItem = document.querySelectorAll(".in-stock");

const slotInsertInput = document.getElementById("insert_input");
const slotChangeButton = document.getElementById("change_button");
const slotInsertButton = document.getElementById("insert_button");

const selectList = document.querySelector(".select-list");

/* select menu button */
function selectMenuButton() {
    menuItem.forEach((item) => {
        item.addEventListener("click", () => {
            const itemName = item.value;

            if (checkStock(itemName)) {
                addSelectList(itemName);

                countAndStockCal("add", itemName);

                console.log(itemsCount.get(itemName), itemsStock.get(itemName));

                selectItemCal(itemName);
                changeCal();
                displayChange();
                displaySelectItemCount(itemName);
                displayTotalPrice();
            }
        });
    });
}

selectMenuButton();

function slotButtonEvent() {
    slotInsertButton.addEventListener("click", () => {
        const money = parseInt(slotInsertInput.value);
        slotInsertInput.value = "";
        console.log(typeof money);

        if (checkSlotInsert(money)) {
            setSlotMoney(money);
            changeCal();
            displayChange();
        }
    });

    slotChangeButton.addEventListener("click", () => {
        console.log(100);
    });
}

slotButtonEvent();

/* add select list */
function addSelectList(itemName) {
    const selectItem = document.createElement("li");
    const selectButton = document.createElement("button");

    if (checkCount("add", itemName)) {
        selectButton.setAttribute("type", "button");
        selectButton.setAttribute("value", `${itemName}`);

        selectButton.insertAdjacentHTML("beforeend", `<img src="images/${itemsCode.get(itemName)}.png" alt="Original Cola Image" class="select-img">`);
        selectButton.insertAdjacentHTML("beforeend", `<strong class="item-name">${itemName}</strong>`);
        selectButton.insertAdjacentHTML("beforeend", `<span class="${itemName}-count">${itemsCount.get(itemName) + 1}</span>`);

        selectItem.appendChild(selectButton);
        selectList.appendChild(selectItem);

        /* select item remove */
        selectButton.addEventListener("click", () => {
            if (checkCount("remove", itemName)) {
                selectList.removeChild(selectItem);
                countAndStockCal("delete", itemName);
            } else {
                countAndStockCal("delete", itemName);
                displaySelectItemCount(itemName);
            }
            deleteItemCal(itemName);
            changeCal();
            displayChange();
            displayTotalPrice();
        });
    }
}

/* ========== validate check ========== */
/* check stock */
function checkStock(itemName) {
    if (itemsStock.get(itemName) != 0) {
        return true;
    }

    alert(`${itemName}의 재고가 부족합니다.`);
    return false;
}

/* check count */
function checkCount(type, itemName) {
    if (type == "add") {
        if (itemsCount.get(itemName) == 0) {
            console.log(true);
            return true;
        }
    } else if (type == "remove") {
        if (itemsCount.get(itemName) == 1) {
            return true;
        }
    }

    return false;
}

/* check slot insert */
function checkSlotInsert(money) {
    if (money % 1000 == 0) {
        return true;
    }

    alert("1,000원 단위로만 입금 가능합니다.");
    return false;
}

/* check checkPayment */
function checkPayment() {
    if (change < 0) {
        alert(`${change * -1}원이 부족합니다.`);
        return false;
    }

    return true;
}
