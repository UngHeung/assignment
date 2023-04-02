/* ===== init ===== */

let wallet = 25000;
let slotMoney = 0;
let change = 0;
let totalPrice = 0;
let totalCount = 0;
let totalPayment = 0;

/* 아이템 이미지 불러오기용 */
const itemsCode = new Map([
    ["Original_Cola", "original"],
    ["Violet_Cola", "violet"],
    ["Yellow_Cola", "yellow"],
    ["Cool_Cola", "cool"],
    ["Green_Cola", "green"],
    ["Orange_Cola", "orange"],
]);

/* 아이템별 가격 */
const itemsPrice = new Map([
    ["Original_Cola", 1000],
    ["Violet_Cola", 1000],
    ["Yellow_Cola", 1000],
    ["Cool_Cola", 1000],
    ["Green_Cola", 1000],
    ["Orange_Cola", 1000],
]);

/* 아이템 재고 */
const itemsStock = new Map([
    ["Original_Cola", 10],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 10],
    ["Cool_Cola", 10],
    ["Green_Cola", 10],
    ["Orange_Cola", 10],
]);

/* 선택 아이템 개수 */
const itemsCount = new Map([
    ["Original_Cola", 0],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 0],
    ["Cool_Cola", 0],
    ["Green_Cola", 0],
    ["Orange_Cola", 0],
]);

/* 구매 아이템 개수 */
const getCount = new Map([
    ["Original_Cola", 0],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 0],
    ["Cool_Cola", 0],
    ["Green_Cola", 0],
    ["Orange_Cola", 0],
]);

/* 상품 목록 */
const itemsList = ["Original_Cola", "Violet_Cola", "Yellow_Cola", "Cool_Cola", "Green_Cola", "Orange_Cola"];

/* ===== setter ===== */
function setSlotMoney(money) {
    slotMoney = money;
}

function setTotalPrice(price) {
    totalPrice = price;
}

function setTotalCount(count) {
    totalCount = count;
}

/* ===== getter ===== */

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

function getTotalCount() {
    return totalCount;
}

function getTotalPayment() {
    return totalPayment;
}

/* ===== display information ===== */
const slotChangeDisplay = document.getElementById("change_display");
const totalPriceDisplay = document.getElementById("total_price");
const myWalletDisplay = document.getElementById("my_wallet");

function displayChange() {
    slotChangeDisplay.innerText = "";
    slotChangeDisplay.insertAdjacentText("beforeend", `${change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
}

function displayTotalPriceDisplay() {
    totalPriceDisplay.innerText = "";
    totalPriceDisplay.insertAdjacentText("beforeend", `${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
}

function displayMyWallet() {
    myWalletDisplay.insertAdjacentText("beforeend", `${wallet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
}

displayChange();
displayTotalPriceDisplay();
displayMyWallet();

/* ===== calculation ===== */
function calChange() {
    change = slotMoney - totalPrice;
}

function calTotalPayment() {
    totalPayment += totalPrice;
}

function additionValue(type, value) {
    if (type == "slotMoney") {
        return slotMoney + value;
    } else if (type == "totalPrice") {
        return totalPrice + value;
    }
}

function subtractionValue(type, value) {
    if (type == "slotMoney") {
        slotMoney -= value;
    } else if (type == "totalPrice") {
        totalPrice -= value;
    }
}

function remainSlotMoney() {
    slotMoney = change;
}

/* ===== function ===== */
/* 메뉴 목록 생성 */
const menuList = document.querySelector(".items-list");

function makeMenuList() {
    itemsList.forEach((itemName) => {
        const item = document.createElement("li");
        const button = document.createElement("button");
        const itemCode = itemsCode.get(itemName);

        button.setAttribute("type", "button");
        button.setAttribute("value", `${itemName}`); // 버튼 클릭 시 가져오기 위한 value
        button.setAttribute("class", `in-stock ${itemName}`); // instock은 재고 있음, soldout은 재고 없음

        // 첫 목록 생성시 재고 없으면 instock 대신 soldout, disabled로 비활성화
        if (!checkStock("makeList", itemName)) {
            button.setAttribute("class", `soldout ${itemName}`);
            button.setAttribute("disabled", "");
        }

        button.insertAdjacentHTML("beforeend", `<img src="images/${itemCode}.png" alt="${itemName.replace("_", " ")} image" class="item-img">`);
        button.insertAdjacentHTML("beforeend", `<strong class="item-name">${itemName}</strong>`);
        button.insertAdjacentHTML("beforeend", `<span class="item-price">${itemsPrice.get(itemName)}원</span>`);

        item.appendChild(button);
        menuList.appendChild(item);
    });
}

makeMenuList();

/* 입금 */
const insertInput = document.getElementById("insert_input"); // 입금 input
const insertButton = document.getElementById("insert_button"); // 입금 button

function slotInsertButton() {
    insertButton.addEventListener("click", () => {
        const money = parseInt(insertInput.value);
        insertInput.value = "";

        if (checkSlotInsert(money)) {
            setSlotMoney(additionValue("slotMoney", money)); // 입금된 돈을 slotMoney에 합산
            calChange(); // 입금된 돈에서 선택된 상품의 총액을 뺀 나머지를 계산
            displayChange(); // 잔액 표시
        }
    });
}

slotInsertButton();

/* 거스름돈 */
const changeButton = document.getElementById("change_button"); // 거스름돈 button

function slotChangeButton() {
    changeButton.addEventListener("click", () => {
        if (checkTotalCount("change")) {
            if (checkChange()) {
                resetChange(); // 입금된 돈을 초기화
                calChange();
                displayChange();
            }
        }
    });
}

slotChangeButton();

/* 선택된 아이템 목록 */
const selectList = document.querySelector(".select-list");

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

        /* 목록 아이템 삭제 */
        selectButton.addEventListener("click", () => {
            if (checkCount("remove", itemName)) {
                selectList.removeChild(selectItem);
                countAndStockCal("delete", itemName);
            } else {
                countAndStockCal("delete", itemName);
                displaySelectItemCount(itemName);
            }
            deleteItemCal(itemName);
            calChange();
            displayChange();

            totalCount--;
        });
    }
}

/* ===== validation check ===== */
/* 아이템 재고 확인 */
function checkStock(type, itemName) {
    if (itemsStock.get(itemName) == 0) {
        if (type != "makeList") {
            alert(`${itemName}의 재고가 부족합니다.`);
        }

        return false;
    }

    return true;
}

/* 입력된 값이 천원 단위인지 확인 */
function checkSlotInsert(money) {
    if (money % 1000 != 0) {
        alert("1,000원 단위로만 입금 가능합니다.");
        return false;
    }

    return true;
}

/* 거스름돈이 있는지 확인 */
function checkChange() {
    if (change == 0) {
        alert("거스름돈이 없습니다.");
        return false;
    }

    alert(`${change}원이 반환되었습니다.`);
    return true;
}

/* 선택된 물건이 있는지 확인 */
function checkTotalCount(type) {
    if (type == "get") {
        // 구매할 때 선택된 물건이 있는지 확인
        if (totalCount == 0) {
            alert("선택된 상품이 없습니다.");
            return false;
        }
    } else if (type == "change") {
        // 거스름돈을 반환할 때 선택된 물건이 있는지 확인
        if (totalCount > 0) {
            alert("선택된 상품이 있습니다.");
            return false;
        }
    }

    return true;
}

/* ===== reset ===== */
function resetChange() {
    slotMoney = 0;
    calChange();
}
