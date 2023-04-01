/* ========== init ========== */
/* interaction information */
let 소지금 = 25000;
let 입금액 = 0;
let 잔액 = 0;
let 총금액 = 0;

/* items name */
const itemsName = new Map([
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
    ["Original_Cola", 100],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 100],
    ["Cool_Cola", 100],
    ["Green_Cola", 100],
    ["Orange_Cola", 100],
]);

/* items list */
const itemList = ["Original_Cola", "Violet_Cola", "Yellow_Cola", "Cool_Cola", "Green_Cola", "Orange_Cola"];

/* make menu list */
const menuList = document.querySelector(".items-list");

function makeMenuList() {
    itemList.forEach((element) => {
        const item = document.createElement("li");
        const button = document.createElement("button");
        const itemName = itemsName.get(element);

        // 1, 2번째 방법용
        button.setAttribute("type", "button");
        button.setAttribute("value", `${element}`);

        // 재고 확인
        if (itemsStock.get(element) == 0) {
            button.setAttribute("class", "soldout");
            button.setAttribute("disabled", "");
        }

        // 1번째 방법 insertAdjacentHTML로 버튼에 나눠서 추가하기
        button.insertAdjacentHTML("beforeend", `<img src="images/${itemName}.png" alt="${element.replace("_", " ")} image" class="item-img">`);
        button.insertAdjacentHTML("beforeend", `<strong class="item-name">${element}</strong>`);
        button.insertAdjacentHTML("beforeend", `<span class="item-price">${itemsPrice.get(element)}원</span>`);

        // 2번째 방법 insertAdjacentHTML로 버튼 안에 한번에 추가하기
        // button.insertAdjacentHTML(
        //     "afterbegin",
        //     `
        //     <img src="images/${itemName}.png" alt="${element.replace("_", " ")} image" class="item-img">
        //     <strong class="item-name">${element}</strong>
        //     <span class="item-price">${itemsPrice.get(element)}원</span>
        //     `
        // );

        // 3번째 방법 innerHTML 사용하기
        // item.innerHTML = `
        //     <button type="button" value="${element}">
        //     <img src="images/${itemName}.png" alt="${element.replace("_", " ")} image" class="item-img">
        //     <strong class="item-name">${element}</strong>
        //     <span class="item-price">${itemsPrice.get(element)}</span>
        // `;

        item.appendChild(button);
        menuList.appendChild(item);
    });
}

makeMenuList();

/* ========== reset ========== */
function reset() {
    /* items select count */
    const itemsCount = new Map([
        ["Original_Cola", 0],
        ["Violet_Cola", 0],
        ["Yellow_Cola", 0],
        ["Cool_Cola", 0],
        ["Green_Cola", 0],
        ["Orange_Cola", 0],
    ]);

    입금액 = 0;
    잔액 = 0;
    총금액 = 0;
}

reset();
