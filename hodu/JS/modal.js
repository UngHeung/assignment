const inputBtn = document.querySelector(".input-submit");
const closeBtn = document.querySelector(".ok-button");
const modal = document.querySelector(".modal-back");

function modalEvent() {
    inputBtn.addEventListener("click", () => {
        modal.setAttribute("style", "display: flex;");
    });

    closeBtn.addEventListener("click", () => {
        modal.setAttribute("style", "display: none;");
    });
}

modalEvent();
