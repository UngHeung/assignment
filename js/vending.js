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
